import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

export default function BillHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [userDetails, setUserDetails] = useState({});
  const [packageDetail, setPackageDetail] = useState({});
  const [bills, setBills] = useState([]);

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(`/api/v1/bills?case_number=${debouncedSearchTerm}`)
        .then((res) => {
          console.log(res, "BILL HISTORY");
          setUserDetails(res.data.user);
          setPackageDetail(res.data.user.personal_detail.package);
          setBills(res.data.bills);
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [debouncedSearchTerm]);

  const formatPackageDuration = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const from = new Date(fromDate).toLocaleDateString(undefined, options);
      const to = new Date(toDate).toLocaleDateString(undefined, options);

      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      const diffTime = Math.abs(toDateObj - fromDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return `${from} - ${to} (${diffDays} days)`;
    }
    return "";
  };

  return (
    <div className="w-full p-5 bg-gray-100">
      <div className="rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="flex flex-col px-4 py-6 space-y-4">
          <div className="text-2xl font-semibold text-center mb-4">
            Bill History
          </div>
          <div className="flex gap-5 p-2 w-full mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
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
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                </div>
                <div>
                  Case Number:{" "}
                  <span className="font-medium">{userDetails.case_number}</span>
                </div>
              </div>
              <div className="text-lg font-bold mb-4">
                <div>
                  Package Name:{" "}
                  <span className="font-medium">
                    {packageDetail.package_name}
                  </span>
                </div>
                <div>
                  Package Duration:{" "}
                  <span className="font-medium">
                    {formatPackageDuration(
                      packageDetail.from_date,
                      packageDetail.to_date
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {bills.map((bill, index) => (
                <div key={bill.id} className="mb-4">
                  <div className="p-4 border-b">
                    <div className="font-semibold">Bill ID: {bill.id}</div>
                    <div>Total Price: {bill.total_price}</div>
                    <div>Created At: {new Date(bill.created_at).toLocaleString()}</div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 overflow-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Medicine Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bill.bill_items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                            {item.medicine_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
