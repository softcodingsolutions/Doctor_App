import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "@mui/joy/Button";
import InsideLoader from "../../InsideLoader";

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
  const [errors, setErrors] = useState({});
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
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
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!price) {
      newErrors.price = "Total Price is required.";
    }

    if (!pay) {
      newErrors.pay = "Paid Amount is required.";
    } else if (Number(pay) > Number(price)) {
      newErrors.pay = "Paid Amount cannot be more than Total Price.";
    }

    if (!method) {
      newErrors.method = "Payment Method is required.";
    }

    if (medicines.length > 0) {
      medicines.forEach((med, index) => {
        if (!totalQuantities[index] || totalQuantities[index] <= 0) {
          newErrors[
            `totalQuantities_${index}`
          ] = `Total quantity for ${med.medicine_name} is required.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBill = () => {
    if (validateForm()) {
      const billItems = medicines.map((med, index) => ({
        medicine_name: med.medicine_name,
        quantity: totalQuantities[index] || 0,
      }));

      const formData = {
        bill: {
          total_price: price,
          user_id: id,
          bill_items: JSON.stringify(billItems),
          remaining_payment: remaining.toString(),
          paid_payment: pay,
          payment_method: method,
        },
      };

      console.log("Form Data to be sent:", formData);

      axios
        .post(`/api/v1/bills`, formData)
        .then((res) => {
          console.log("Bill created successfully", res);
          alert("Bill created successfully");
          resetForm();
          setSearchTerm("");
        })
        .catch((err) => {
          console.log("Error creating bill", err);
          alert("Error creating bill");
        });
    }
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setLoader(true);
    if (value) {
      axios
        .get(`/api/v2/users/search?search_query=${value}`)
        .then((res) => {
          console.log(res, "search term");
          const userId = res?.data?.user?.id;
          setGetParticularCustomer(res.data.user);
          setError("");
          setSearchTerm("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setGetParticularCustomer([]);
      setPackageDetail({});
      setUser({});
      setMedicines([]);
      setSearchTerm("");
    }
  };

  const handleUserSelect = (user) => {
    setSearchTerm("");
    console.log(user, "SELECTED USER");
    setLoader(false);
    setUser(user);
    setPackageDetail(user?.treatment_packages[0]?.treatment_package);
    setMedicines(
      user?.treatment_packages?.[0]?.treatment_package?.medicines || []
    );
    setId(user.id);
    setGetParticularCustomer([]);
  };
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
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

        <div className="rounded-lg w-full bg-white shadow-lg overflow-hidden h-[95vh]">
          <div className="flex flex-col px-4 py-6 space-y-2">
            <div className="text-xl font-semibold text-center">
              Generate Bill
            </div>
            <div className="flex gap-5 w-full py-3">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by First name or Last name or Phone number"
                onChange={(e) => handleSearch(e.target.value)}
                className={`py-2 px-4 rounded-md border ${
                  errors.searchTerm ? "border-red-500" : "border-gray-300"
                } w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              {error && <div className="text-red-500">{error}</div>}
              {getParticularCustomer?.length > 0 ? (
                <div className="space-y-1 ">
                  {getParticularCustomer.map((user) => (
                    <div
                      key={user.id}
                      className="border p-2 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => handleUserSelect(user)}
                    >
                      <div>
                        <div className="font-semibold">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-gray-500">
                          Phone: {user.phone_number}
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {user.follow_up ? "Follow Up" : "New Case"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-48">
                  <div className="text-md font-bold mb-4">
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
                  <div className="text-md font-bold mb-4">
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
              )}
            </div>
            <div className="w-full">
              {medicines.length > 0 && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Medicine Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Medicine Intake
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Assigned Medicine
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Total Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          With Milk
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medicines.length > 0 ? (
                        medicines.map((med, index) => (
                          <tr key={med.id}>
                            <td className="px-3 py-4 text-sm whitespace-nowrap  font-medium text-gray-900">
                              {med.medicine_name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap  ">
                              {formatDosage(med?.dosage)}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap  ">
                              {med.is_assigned ? "Yes" : "No"}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap  ">
                              <input
                                type="number"
                                className={`border rounded-md p-2 ${
                                  errors[`totalQuantities_${index}`]
                                    ? "border-red-500"
                                    : "border-blue-gray-400"
                                }`}
                                min={0}
                                onChange={(e) =>
                                  handleTotalMedicine(index, e.target.value)
                                }
                              />
                              {errors[`totalQuantities_${index}`] && (
                                <p className="text-red-500 text-sm">
                                  {errors[`totalQuantities_${index}`]}
                                </p>
                              )}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap  ">
                              {med.with_milk ? "Yes" : "No"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900"
                          >
                            No medicines assigned.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {medicines.length > 0 && (
              <div className="flex gap-5 py-3">
                <div className=" flex">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={handlePrice}
                    className={`mt-1 block w-full py-2 px-4 rounded-md shadow-sm ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>
                <div className="flex">
                  <label className="block text-sm font-medium text-gray-700">
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    value={pay}
                    onChange={handlePay}
                    className={`mt-1 block w-full py-2 px-4 rounded-md shadow-sm ${
                      errors.pay ? "border-red-500" : "border-gray-300"
                    } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.pay && (
                    <p className="text-red-500 text-sm">{errors.pay}</p>
                  )}
                </div>
              </div>
            )}
            {medicines.length > 0 && (
              <div className="flex justify-start ">
                <label className="text-sm text-start mr-1">
                  Payment Method:
                </label>
                <select
                  placeholder="Select Method"
                  onChange={handleMethod}
                  required
                  value={method}
                  className={`mt-1 block w-full py-2 px-4 rounded-md shadow-sm ${
                    errors.method ? "border-red-500" : "border-gray-300"
                  } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.method && (
                  <p className="text-red-500 text-sm">{errors.method}</p>
                )}
              </div>
            )}
            <div className="w-full flex justify-center items-center mt-4">
              {medicines.length > 0 && (
                <Button
                  onClick={handleBill}
                  variant="solid"
                  size="md"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Generate Bill
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
