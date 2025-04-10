import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "@mui/joy/Button";
import { useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";
import { CiEdit } from "react-icons/ci";
// import icons_slime from "../../../assets/images/icons_slime_converted.webp";

export default function GenerateBill() {
  const location = useLocation();
  const [editBillId, setEditBillId] = useState(null);
  const [editableValues, setEditableValues] = useState({
    paid_payment: "",
    remaining_payment: "",
  });

  const userId = location.state?.user_id;
  const context = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [id, setId] = useState(0);
  const [userDetails, setUser] = useState({});
  const [bills, setBills] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [packageDetail, setPackageDetail] = useState({});
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");
  const [remaining, setRemaining] = useState("");
  const [totalQuantities, setTotalQuantities] = useState([]);
  const [method, setMethod] = useState("Online");
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [errors, setErrors] = useState({});
  const [getParticularCustomer, setGetParticularCustomer] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterDate, setFilterDate] = useState("");
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

  // Pdf Section
  // const handleDownload = (bill) => {
  //   const doc = new jsPDF();

  //   const fullName = `${userDetails?.first_name || ""} ${
  //     userDetails?.last_name || ""
  //   }`;

  //   // Title
  //   doc.setFontSize(18);
  //   doc.text("Patient Bill Summary", 14, 20);

  //   // Patient Details
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${fullName}`, 14, 30);
  //   doc.text(`Case Number: ${userDetails?.case_number || "N/A"}`, 14, 36);
  //   doc.text(`Phone: ${userDetails?.phone_number || "N/A"}`, 14, 42);
  //   doc.text(`Bill ID: ${bill.id}`, 14, 48);
  //   doc.text(
  //     `Created At: ${new Date(bill.created_at).toLocaleString("en-GB")}`,
  //     14,
  //     54
  //   );

  //   // Table Header
  //   autoTable(doc, {
  //     startY: 60,
  //     head: [["#", "Medicine Name", "Quantity"]],
  //     body: bill.bill_items.map((item, index) => [
  //       index + 1,
  //       item.medicine_name,
  //       item.quantity,
  //     ]),
  //     styles: {
  //       fontSize: 10,
  //     },
  //     headStyles: {
  //       fillColor: [100, 149, 237], // Cornflower Blue
  //     },
  //   });

  //   const finalY = doc.lastAutoTable.finalY + 10;

  //   // Payment Summary
  //   doc.text(`Total Price: Rs. ${bill.total_price} `, 14, finalY);
  //   doc.text(`Paid: Rs. ${bill.paid_payment}`, 14, finalY + 6);
  //   doc.text(`Remaining: Rs. ${bill.remaining_payment}`, 14, finalY + 12);
  //   doc.text(`Payment Method: ${bill.payment_method}`, 14, finalY + 18);

  //   // Save the PDF
  //   doc.save(`Bill_${bill.id}.pdf`);
  // };
  const handleDownload = (bill) => {
    const doc = new jsPDF();
    const fullName = `${userDetails?.first_name || ""} ${
      userDetails?.last_name || ""
    }`;

    // Add Header Icon
    // const imageProps = doc.getImageProperties(icons_slime);
    // const imageRatio = imageProps.width / imageProps.height;
    // const imgHeight = 20;
    // const imgWidth = imgHeight * imageRatio;
    // doc.addImage(icons_slime, "WEBP", 150, 10, 40, 20);

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Patient Bill Summary", 14, 20);

    // Divider Line
    doc.setLineWidth(0.5);
    doc.line(14, 24, 195, 24);

    // Patient Details
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(`Name: ${fullName}`, 14, 30);
    doc.text(`Case Number: ${userDetails?.case_number || "N/A"}`, 14, 36);
    doc.text(`Phone: ${userDetails?.phone_number || "N/A"}`, 14, 42);
    doc.text(`Bill ID: ${bill.id}`, 14, 48);
    doc.text(
      `Created At: ${new Date(bill.created_at).toLocaleString("en-GB")}`,
      14,
      54
    );

    // Table
    autoTable(doc, {
      startY: 60,
      head: [["#", "Medicine Name", "Quantity"]],
      body: bill.bill_items.map((item, index) => [
        index + 1,
        item.medicine_name,
        item.quantity,
      ]),
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [15, 76, 129], // Deep blue
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // Payment Summary Section
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Total Price: Rs.${bill.total_price}`, 14, finalY);
    doc.text(`Paid: Rs.${bill.paid_payment}`, 14, finalY + 6);
    doc.text(`Remaining: Rs.${bill.remaining_payment}`, 14, finalY + 12);
    doc.text(`Payment Method: ${bill.payment_method}`, 14, finalY + 18);

    // Footer Line
    doc.setLineWidth(0.3);
    doc.line(14, finalY + 24, 195, finalY + 24);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for choosing our service!", 14, finalY + 30);

    doc.save(`Bill_${bill.id}.pdf`);
  };

  // const handleEdit = (bill) => {
  //   setEditBillId(bill.id);
  //   setEditableValues({
  //     paid_payment: bill.paid_payment,
  //     remaining_payment: bill.remaining_payment,
  //   });
  // };
  const handleEdit = (bill) => {
    setEditBillId(bill.id);
    setEditableValues({
      paid_payment: bill.paid_payment,
      remaining_payment: bill.total_price - bill.paid_payment,
    });
  };

  const handleSave = (billId) => {
    const updatedBills = bills.map((bill) =>
      bill.id === billId
        ? {
            ...bill,
            paid_payment: editableValues.paid_payment,
            remaining_payment: editableValues.remaining_payment,
            created_at: new Date().toISOString(),
          }
        : bill
    );
    setBills(updatedBills);
    setEditBillId(null);

    axios
      .put(`/api/v1/bills/${billId}`, {
        paid_payment: editableValues.paid_payment,
        remaining_payment: editableValues.remaining_payment,
        created_at: new Date().toISOString(),
      })
      .then((res) => {
        // console.log("Bill updated successfully");
      })
      .catch((err) => {
        // console.log(err);
        // alert("Failed to update the bill");
      });
  };

  const handlePaidAmountChange = (e, total) => {
    const paid = parseFloat(e.target.value) || 0;
    const remaining = Math.max(total - paid, 0);
    setEditableValues({
      paid_payment: paid,
      remaining_payment: remaining,
    });
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

      // console.log("Form Data to be sent:", formData);

      axios
        .post(`/api/v1/bills`, formData)
        .then((res) => {
          // console.log("Bill created successfully", res);
          // alert("Bill created successfully");
          resetForm();
          setSearchTerm("");
          navigate("");
          setBills("");
          selectedBillId("");
        })
        .catch((err) => {
          // console.log("Error creating bill", err);
          // alert("Error creating bill");
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

  useEffect(() => {
    if (userDetails?.case_number) {
      axios
        .get(`/api/v1/bills?case_number=${userDetails?.case_number}`)
        .then((res) => {
          setBills(res.data?.bills);
          setUserDetails(res.data?.user);
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [userDetails?.case_number]);

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
          // console.log(res, "search term");
          const userId = res?.data?.user?.id;
          setGetParticularCustomer(res.data.user);
          setError("");
        })
        .catch((err) => {
          // console.log(err);
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
    // console.log(user, "SELECTED USER");
    setLoader(false);
    setUser(user);
    setPackageDetail(user?.treatment_packages[0]?.treatment_package);
    setMedicines(
      user?.treatment_packages?.[0]?.treatment_package?.medicines || []
    );
    setId(user.id);
    setGetParticularCustomer([]);
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/v2/users/search?search_query=${userId}`)
        .then((res) => {
          // console.log(res?.data?.user[0], "Ds");
          setUser(res?.data?.user[0]);
          setPackageDetail(
            res?.data?.user[0]?.treatment_packages[0]?.treatment_package
          );
          setMedicines(
            res?.data?.user[0]?.treatment_packages?.[0]?.treatment_package
              ?.medicines || []
          );
          setId(res?.data?.user[0]?.id);
        })
        .catch((err) => {
          // console.log("Error fetching user by ID:", err);
        });
    }
  }, [userId]);

  const filteredBills = filterDate
    ? bills.filter((bill) => {
        const billDate = new Date(bill.created_at).toDateString();
        const selectedDate = filterDate.toDateString();
        return billDate === selectedDate;
      })
    : bills;

  return (
    <div className="flex flex-col  p-3  flex-grow overflow-auto bg-white content-start max-h-full">
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <div className="mt-2">
            <TfiWrite size={30} className="text-green-600" />{" "}
          </div>
          <div className="flex  flex-col">
            <label className="flex justify-start text-xl font-bold ">
              Generate Bill
            </label>
            <span className="text-md text-gray-600 ">
              Review, Edit & Download Bills
            </span>
          </div>
        </div>
        <div className="mt-2 relative flex items-center pr-2 w-[30rem]">
          <IoSearchOutline className="absolute left-2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by First name or Last name or Phone number"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {getParticularCustomer?.length > 0 || medicines?.length > 0 ? (
        <>
          <div className="p-2">
            {error && <div className="text-red-500">{error}</div>}
            {getParticularCustomer?.length > 0 ? (
              // Selection Section
              <ul className="mt-1 border border-gray-200 rounded-md max-h-96 overflow-y-auto divide-y divide-gray-100">
                {getParticularCustomer.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div>
                      <div className="font-medium">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Phone: {user.phone_number}
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {user.follow_up ? "Old Case" : "New Case"}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                {/* Patient/Package Details */}
                {userDetails?.first_name && (
                  <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <div className="text-md font-bold mb-4 flex-1">
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
                    <div className="text-md font-bold mb-4 flex-1">
                      <div>
                        Treatment Name:{" "}
                        <span className="font-medium">
                          {packageDetail?.package_name ?? "No Package Assigned"}
                        </span>
                      </div>
                      <div>
                        Treatment Duration:{" "}
                        <span className="font-medium">
                          {packageDetail?.no_of_days} Days
                        </span>
                      </div>
                      <div>
                        Treatment Assigned At:{" "}
                        <span className="font-medium">
                          {packageDetail?.updated_at
                            ?.slice(0, 10)
                            ?.split("-")
                            ?.reverse()
                            ?.join("-")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Medicine Item Section */}
          {medicines.length > 0 && (
            <table className="bg-white border  overflow-auto w-full  rounded-md border-gray-300 text-sm text-left mt-4">
              <thead className="sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
                <tr>
                  <th className="border-b-2 p-3">Medicine Name</th>
                  <th className="border-b-2 p-3">Medicine Intake</th>
                  <th className="border-b-2 p-3">Assigned Medicine</th>
                  <th className="border-b-2 p-3">Total Quantity</th>
                  <th className="border-b-2 p-3">With Milk</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicines.length > 0 ? (
                  medicines.map((med, index) => (
                    <tr key={med.id} className="map hover:bg-gray-200">
                      <td className="border-b-1 p-3">{med.medicine_name}</td>
                      <td className="border-b-1 p-3">
                        {formatDosage(med?.dosage)}
                      </td>
                      <td className="border-b-1 p-3">
                        {med.is_assigned ? "Yes" : "No"}
                      </td>
                      <td className="border-b-1 p-3">
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
                      <td className="border-b-1 p-3">
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
          )}
          {/* Price Section */}
          {medicines.length > 0 && (
            <div className="flex flex-col gap-4 p-4">
              {/* Row: Total Price, Paid Amount, Payment Method */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Total Price */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="totalPrice"
                    className="font-medium text-sm text-[#06AED4] mb-2"
                  >
                    Total Price
                  </label>
                  <input
                    type="number"
                    id="totalPrice"
                    value={price}
                    onChange={handlePrice}
                    placeholder="Total Price"
                    className="rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  />
                </div>

                {/* Paid Amount */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="paidAmount"
                    className="font-medium text-sm text-[#06AED4] mb-2"
                  >
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    id="paidAmount"
                    value={pay}
                    onChange={handlePay}
                    placeholder="Paid Amount"
                    className="rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  />
                </div>

                {/* Payment Method */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="paymentMethod"
                    className="font-medium text-sm text-[#06AED4] mb-2"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={method}
                    onChange={handleMethod}
                    className="rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Cash</option>
                  </select>
                </div>
              </div>

              {/* Remaining Amount */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="remainingAmount"
                  className="font-medium text-sm text-[#06AED4] mb-2"
                >
                  Remaining Amount
                </label>
                <input
                  type="number"
                  id="remainingAmount"
                  value={remaining}
                  readOnly
                  className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                />
              </div>
            </div>
          )}
          {/* Bill Generate Button */}
          <div className="flex justify-center w-full">
            {medicines.length > 0 && (
              <button
                onClick={handleBill}
                variant="solid"
                className="flex justify-center w-[20rem] items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-md transition-colors duration-200"
              >
                Generate Bill
              </button>
            )}
          </div>

          {/* Bill History Section */}
          {bills.length > 0 ? (
            <div className="mt-10">
              <div className="flex justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Bill History
                  </h2>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex items-center h-10 datepicker-z-50">
                    <CiCalendar className="absolute left-3 text-black z-10" />
                    <DatePicker
                      selected={filterDate}
                      onChange={(date) => setFilterDate(date)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Select date"
                      className=" text-sm p-2.5 pl-10 pr-3 border rounded-md focus:outline-none bg-white"
                    />
                  </div>
                  {filterDate && (
                    <Tooltip title="Clear Filter">
                      <button
                        onClick={() => setFilterDate("")}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#9FD7EA] text-[#06AED4] hover:bg-[#06AED4] hover:text-white transition duration-200"
                      >
                        <span className="text-lg leading-none">&times;</span>
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
              {/* Bill history Table */}
              <table className="bg-white border  overflow-auto w-full  rounded-md border-gray-300 text-sm  mt-5 text-left">
                <thead className="sticky top-0 z-0 text-[#71717A] font-medium border-b-2 bg-white">
                  <tr>
                    <th className="border-b-2 p-3">Date</th>
                    {/* <th className="border-b-2 p-3">
                  Bill No
                </th> */}
                    <th className="border-b-2 p-3">Total Amount</th>
                    <th className="border-b-2 p-3">Paid</th>
                    <th className="border-b-2 p-3">Remaining</th>
                    <th className="border-b-2 p-3">Method</th>
                    <th className="border-b-2 p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill) => (
                      <tr key={bill.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(bill.created_at).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>

                        {/* Total Amount - not editable */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{bill.total_price}
                        </td>

                        {/* Paid - editable */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">
                          {editBillId === bill.id ? (
                            <input
                              type="number"
                              value={editableValues.paid_payment}
                              onChange={(e) =>
                                handlePaidAmountChange(e, bill.total_price)
                              }
                              className="py-1 px-2 border rounded w-24"
                            />
                          ) : (
                            <>₹{bill.paid_payment}</>
                          )}
                        </td>

                        {/* Remaining - calculated or editable */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500">
                          {editBillId === bill.id ? (
                            <input
                              type="number"
                              value={editableValues.remaining_payment}
                              readOnly
                              className="py-1 px-2 border rounded w-24 bg-gray-100"
                            />
                          ) : (
                            <>₹{bill.remaining_payment}</>
                          )}
                        </td>

                        {/* Payment Method - not editable here */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {bill.payment_method}
                        </td>

                        {/* Actions */}
                        <td className="flex px-4 gap-4 py-4 whitespace-nowrap text-sm">
                          {editBillId === bill.id ? (
                            <>
                              <button
                                onClick={() => handleSave(bill.id)}
                                className="text-green-600 bg-green-100 px-3 py-1 rounded hover:bg-green-200"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditBillId(null)}
                                className="text-gray-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <Tooltip title="Edit">
                                <button
                                  onClick={() => handleEdit(bill)}
                                  className="text-[#FBBF24] bg-[#FFF4D6] text-sm p-1.5 rounded-full"
                                >
                                  <CiEdit size={20} />
                                </button>
                              </Tooltip>
                              <Tooltip title="View">
                                <button
                                  onClick={() => setSelectedBillId(bill.id)}
                                  className="text-[#40ADBF] bg-[#CBFBF9] text-sm p-1.5 rounded-full"
                                >
                                  <FaEye size={17} />
                                </button>
                              </Tooltip>
                              <Tooltip title="Download">
                                <button
                                  onClick={() => handleDownload(bill)}
                                  className="text-[#8069DE] bg-[#EEE9FF] text-sm p-1.5 rounded-full"
                                >
                                  <RiDownloadCloud2Line size={17} />
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center px-6 py-4 text-gray-500 text-sm"
                      >
                        No bill history available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div> </div>
          )}

          {selectedBillId && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setSelectedBillId(null)} // Click on backdrop closes modal
            >
              <div
                className="bg-white rounded-xl w-full max-w-5xl max-h-[93vh] overflow-y-auto border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 rounded-t-xl">
                  <h2 className="text-lg font-semibold">Bill Information</h2>
                  <button
                    className="text-2xl hover:text-red-300"
                    onClick={() => setSelectedBillId(null)}
                  >
                    &times;
                  </button>
                </div>

                {/* Content */}
                <div className="pl-8 pr-8  pb-5 space-y-8">
                  {(() => {
                    const selectedBill = bills.find(
                      (bill) => bill.id === selectedBillId
                    );
                    if (!selectedBill)
                      return <div className="text-center">Bill not found</div>;

                    return (
                      <>
                        {/* Patient Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700">
                          <div>
                            <strong>Name:</strong>{" "}
                            {userDetails?.first_name || "N/A"}{" "}
                            {userDetails?.last_name || ""}
                          </div>
                          <div>
                            <strong>Case Number:</strong>{" "}
                            {userDetails?.case_number}
                          </div>
                          <div>
                            <strong>Phone:</strong>{" "}
                            {userDetails?.phone_number || "N/A"}
                          </div>
                        </div>

                        {/* Bill Items */}
                        <section>
                          <h3 className="text-md font-bold text-blue-600 mb-2">
                            Bill ID: {selectedBill.id}
                          </h3>
                          <div className="overflow-x-auto">
                            <div className="max-h-64 overflow-y-auto">
                              <table className="w-full border text-sm rounded">
                                <thead className="bg-blue-100 text-blue-900 sticky top-0 z-10">
                                  <tr>
                                    <th className="py-2 px-4 text-left">#</th>
                                    <th className="py-2 px-4 text-left">
                                      Medicine Name
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                      Quantity
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedBill.bill_items.map(
                                    (item, index) => (
                                      <tr
                                        key={index}
                                        className="border-t hover:bg-gray-50"
                                      >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">
                                          {item.medicine_name}
                                        </td>
                                        <td className="p-3">{item.quantity}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </section>

                        {/* Summary */}
                        <section>
                          <h3 className="text-md font-bold text-blue-600 mb-2">
                            Payment Summary
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                            <div className="space-y-1">
                              <div>
                                <strong>Total Price:</strong> ₹
                                {selectedBill.total_price}
                              </div>
                              <div>
                                <strong>Paid:</strong>{" "}
                                {editBillId === selectedBill.id ? (
                                  <input
                                    type="number"
                                    value={editableValues.paid_payment}
                                    onChange={(e) =>
                                      handlePaidAmountChange(
                                        e,
                                        selectedBill.total_price
                                      )
                                    }
                                    className="py-1 px-2 border rounded"
                                  />
                                ) : (
                                  <>₹{selectedBill.paid_payment}</>
                                )}
                              </div>
                              <div>
                                <strong>Remaining:</strong>{" "}
                                {editBillId === selectedBill.id ? (
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
                                  <>₹{selectedBill.remaining_payment}</>
                                )}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div>
                                <strong>Payment Method:</strong>{" "}
                                {selectedBill.payment_method}
                              </div>
                              <div>
                                <strong>Created At:</strong>{" "}
                                {new Date(
                                  selectedBill.created_at
                                ).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </div>
                            </div>
                            <div className="space-y-1 flex justify-end w-full">
                              <div>
                                {editBillId === selectedBill.id ? (
                                  <Button
                                    variant="solid"
                                    color="success"
                                    onClick={() => handleSave(selectedBill.id)}
                                  >
                                    Save
                                  </Button>
                                ) : (
                                  <Button
                                    variant="solid"
                                    color="primary"
                                    onClick={() => handleEdit(selectedBill)}
                                  >
                                    Edit
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex  justify-center w-full ">
          <h1 className="flex justify-center mt-72  text-center w-full h-full text-gray-600">
            Search Patient to Manage Bills
          </h1>
        </div>
      )}
    </div>
  );
}
