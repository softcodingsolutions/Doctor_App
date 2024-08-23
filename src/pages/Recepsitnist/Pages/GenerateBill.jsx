import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "@mui/joy/Button";
import { FormLabel, Option, Select } from "@mui/joy";
import { Payment } from "@mui/icons-material";

export default function GenerateBill() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [id, setId] = useState(0);
  const [userDetails, setUser] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [packageDetail, setPackageDetail] = useState({});
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");
  const [remaining, setRemaining] = useState("");
  const [totalQuantities, setTotalQuantities] = useState([]);
  const [method, setMethod] = useState("Online");
  const resetForm = () => {
    setSearchTerm("");
    setId(0);
    setUser({});
    setMedicines([]);
    setPackageDetail({});
    setPrice("");
    setPay("");
    setRemaining("");
    setTotalQuantities([]);
  };

  const handleBill = () => {
    const billItems = medicines.map((med, index) => ({
      medicine_name: med.medicine_name,
      quantity: totalQuantities[index] || 0,
    }));

    const formData = {
      bill: {
        total_price: price,
        user_id: id,
        bill_items: JSON.stringify(billItems),
        remaining_payment: remaining,
        paid_payment: pay,
        payment_method: method
      },
    };

    console.log("Form Data to be sent:", formData);

    axios
      .post(`/api/v1/bills`, formData)
      .then((res) => {
        console.log("Bill created successfully", res);
        alert("Bill created successfully");
        resetForm();
      })
      .catch((err) => {
        console.log("Error creating bill", err);
        alert("Error creating bill");
      });
  };

  const handlePrice = (e) => {
    const totalPrice = e.target.value;
    setPrice(totalPrice);
    setRemaining(totalPrice - pay);
  };

  const handlePay = (e) => {
    const paidAmount = e.target.value;
    setPay(paidAmount);
    setRemaining(price - paidAmount);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleMethod = (e) => {
    setMethod(e.target.value);
  };

  const handleTotalMedicine = (index, value) => {
    setTotalQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Number(value);
      return newQuantities;
    });
  };

  const formatDosage = (dosage) => {
    return dosage || "No dosage info";
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(
          `/api/v2/users/search?case_number=${debouncedSearchTerm}&phone_number=${debouncedSearchTerm}`
        )
        .then((res) => {
          const userId = res?.data?.user?.id;
          setId(userId);
          return axios.get(
            `/api/v1/appointments/user_appointments_count/${userId}`
          );
        })
        .then((res) => {
          console.log("Appointments Count:", res?.data?.appointments_count);
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/v2/users/search?id=${id}`)
        .then((res) => {
          const user = res?.data?.user;
          console.log(res, "MEDICINE ");
          setUser(user);
          setPackageDetail(user?.user_packages?.[0]);
          setMedicines(
            user?.treatment_packages?.[0]?.treatment_package?.medicines || []
          );
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  }, [id]);

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-2">
          <button
            onClick={context[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="w-full p-5 bg-gray-100">
          <div className="rounded-lg bg-white shadow-lg overflow-hidden">
            <div className="flex flex-col px-4 py-6 space-y-2">
              <div className="text-2xl font-semibold text-center">
                Generate Bill
              </div>

              <div className="flex gap-5 w-full py-3">
                <input
                  type="text"
                  onKeyDown={handleKeyDown}
                  placeholder="Search case number or phone number"
                  className="py-2 px-4 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <div className="flex gap-48">
                  <div className="text-lg font-bold mb-4">
                    <div>
                      Patient Name:{" "}
                      <span className="font-medium">
                        {userDetails?.first_name} {userDetails?.last_name}
                      </span>
                    </div>
                    <div>
                      Case Number:{" "}
                      <span className="font-medium">
                        {userDetails?.case_number}
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-4">
                    <div>
                      Package Name:{" "}
                      <span className="font-medium">
                        {packageDetail?.package_name ?? "No Package Assigned"}
                      </span>
                    </div>
                    <div>
                      Package Duration:{" "}
                      <span className="font-medium">
                        {packageDetail?.no_of_days} Days
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Medicine Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Medicine Intake
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Assigned Medicine
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Total Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          With Milk
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medicines.map((med, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium ">
                            {med.medicine_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base ">
                            {formatDosage(med.dosage)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base ">
                            {med.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base ">
                            <input
                              type="number"
                              className="border border-blue-gray-400 rounded-md p-2"
                              min={0}
                              onChange={(e) =>
                                handleTotalMedicine(index, e.target.value)
                              }
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base ">
                            {med.with_milk ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-5 py-3">
                  <div className=" flex">
                    <label className="block text-sm font-medium text-gray-700">
                      Total Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={handlePrice}
                      className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex">
                    <label className="block text-sm font-medium text-gray-700">
                      Paid Amount
                    </label>
                    <input
                      type="number"
                      value={pay}
                      onChange={handlePay}
                      className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-5 py-3">
                  <div className="flex">
                    <label className="block text-sm font-medium text-gray-700">
                      Remaining Amount
                    </label>
                    <input
                      type="number"
                      value={remaining}
                      readOnly
                      className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                    />
                  </div>
                  <div className="md:flex  justify-between">
                    <label className="text-sm text-end mr-2">
                      Payment Method:
                    </label>
                    <select
                      placeholder="Select Method"
                      onChange={handleMethod}
                      required
                      value={method}
                      className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="Online">Online</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-5 py-3">
                  <Button
                    onClick={handleBill}
                    className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Generate Bill
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
