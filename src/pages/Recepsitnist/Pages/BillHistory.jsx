import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "@mui/joy/Button";
import { useLocation } from "react-router-dom";

export default function BillHistory(props) {
  const location = useLocation();
  const { caseNumber } = location.state || {};
  const context = useOutletContext();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [packageDetail, setPackageDetail] = useState({});
  const [bills, setBills] = useState([]);
  const [editBillId, setEditBillId] = useState(null); 
  const [editableValues, setEditableValues] = useState({
    paid_payment: "",
    remaining_payment: "",
  });

  useEffect(() => {
    if (caseNumber) {
      axios
        .get(`/api/v1/bills?case_number=${caseNumber}`)
        .then((res) => {
          setUserDetails(res.data?.user);
          setPackageDetail(res.data?.user?.user_packages?.[0]);
          setBills(res.data?.bills);
        })
        .catch((err) => {
          console.log(err);
          alert("USER NOT FOUND");
        });
    }
  }, [caseNumber]);

  const handleEdit = (bill) => {
    setEditBillId(bill.id);
    setEditableValues({
      paid_payment: bill.paid_payment,
      remaining_payment: bill.remaining_payment,
    });
  };

  const handlePaidAmountChange = (e, total_price) => {
    const paid_payment = e.target.value;
    const remaining_payment = total_price - paid_payment;

    setEditableValues({
      paid_payment,
      remaining_payment,
    });
  };

  const handleSave = (billId) => {
    const updatedBills = bills.map((bill) =>
      bill.id === billId
        ? {
            ...bill,
            paid_payment: editableValues.paid_payment,
            remaining_payment: editableValues.remaining_payment,
          }
        : bill
    );
    setBills(updatedBills);
    setEditBillId(null);

    axios
      .put(`/api/v1/bills/${billId}`, {
        paid_payment: editableValues.paid_payment,
        remaining_payment: editableValues.remaining_payment,
      })
      .then((res) => {
        console.log("Bill updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update the bill");
      });
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
        <div className="w-full p-5 bg-gray-100">
          <div className="rounded-lg bg-white shadow-lg overflow-hidden">
            <div className="flex flex-col px-4 py-6 space-y-4">
              <div className="text-2xl font-semibold text-center mb-4">
                Bill History
              </div>
              <div className="w-full">
                <div className="flex gap-48">
                  <div className="text-lg font-bold mb-4">
                    <div>
                      Patient Name:{" "}
                      <span className="font-medium">
                        {userDetails.first_name} {userDetails?.last_name}
                      </span>
                    </div>
                    <div>
                      Case Number:{" "}
                      <span className="font-medium">
                        {userDetails?.case_number}
                      </span>
                    </div>
                    <div>
                      Doctor Name:{" "}
                      <span className="font-medium">
                        {userDetails?.doctor?.first_name}{" "}
                        {userDetails?.doctor?.last_name}
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-4">
                    <div>
                      Package Name:{" "}
                      <span className="font-medium">
                        {packageDetail?.package_name ??
                          "Will be given by doctor"}
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
                  {bills.map((bill) => (
                    <div key={bill.id} className="mb-4 border border-gray-400 rounded-lg">
                      <div className="p-4 flex justify-between ">
                        <div>
                          <div className="font-semibold">
                            Bill ID: {bill.id}
                          </div>
                          <div>
                            Total Price: {bill.total_price}
                          </div>
                          <div>
                            Paid Price:{" "}
                            {editBillId === bill.id ? (
                              <input
                                type="number"
                                value={editableValues.paid_payment}
                                onChange={(e) =>
                                  handlePaidAmountChange(e, bill.total_price)
                                }
                                className="py-1 px-2 border rounded"
                              />
                            ) : (
                              bill.paid_payment
                            )}
                          </div>
                          <div>
                            Remaining Price:{" "}
                            {editBillId === bill.id ? (
                              <input
                                type="number"
                                value={editableValues.remaining_payment}
                                onChange={(e) =>
                                  setEditableValues({
                                    ...editableValues,
                                    remaining_payment: e.target.value,
                                  })
                                }
                                className="py-1 px-2 border rounded"
                                readOnly
                              />
                            ) : (
                              bill.remaining_payment
                            )}
                          </div>
                          <div>
                            Created At:{" "}
                            {new Date(bill.created_at).toLocaleString()}
                          </div>
                          <div>
                            Payment Method:{" "}
                            {bill.payment_method}
                          </div>
                        </div>
                        <div>
                          {editBillId === bill.id ? (
                            <Button
                              variant="solid"
                              color="success"
                              onClick={() => handleSave(bill.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="solid"
                              color="primary"
                              onClick={() => handleEdit(bill)}
                            >
                              Edit
                            </Button>
                          )}
                        </div>
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
                            <tr
                              key={itemIndex}
                              className="hover:bg-gray-50"
                            >
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
      </div>
    </div>
  );
}
