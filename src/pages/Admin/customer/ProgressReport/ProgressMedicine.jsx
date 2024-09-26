import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "@mui/joy/Button";

const ProgressMedicine = () => {
  const context = useOutletContext();
  const caseNumber = localStorage.getItem("caseNumber");
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

  const handleData = () => {
    axios
      .get(`/api/v2/users/search?search_query=${caseNumber}`)
      .then((res) => {
        console.log(res, "search term");
        setMedicines(
          res?.data?.user[0]?.treatment_packages?.[0]?.treatment_package
            ?.medicines
        );
        console.log(
          res?.data?.user[0]?.treatment_packages?.[0]?.treatment_package
            ?.medicines,
          "MED"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="flex w-full">
      <div className="rounded-lg  overflow-hidden w-full">
        <div className="text-lg font-semibold text-center ">Medicine</div>
        <div className="w-full mt-2">
          {medicines?.length > 0 ? (
            <div className="  rounded-lg overflow-hidden">
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
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      With Milk
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
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
                          {med.quantity}
                        </td>

                        <td className="px-3 py-4 text-sm whitespace-nowrap  ">
                          {med.with_milk ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h2>""</h2>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <label className="text-center flex justify-center  px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
              No medicines assigned.
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressMedicine;
