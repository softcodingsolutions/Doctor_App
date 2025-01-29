import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { IoPersonSharp, IoCloseOutline } from "react-icons/io5";
function CustomerAllUsers() {
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");
  const [type, setType] = useState("");
  const [created_at, setCreatedAt] = useState("");

  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users?user_id=${main_id}`).then((res) => {
      setGetCustomers(res.data?.users);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetAllUsers();
    localStorage.removeItem("userId");
    localStorage.removeItem("doctor_id");
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatType = (type) => {
    if (type === true) {
      return (
        <div className=" rounded  text-[#e78f3d]">
          Follow Up
        </div>
      );
    } else if (type === false) {
      return (
        <div className=" rounded  text-[#00bad1]">
          New Case
        </div>
      );
    }
  };

  const convertDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = `${String(dateObj.getDate()).padStart(
      2,
      "0"
    )}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${dateObj.getFullYear()}`;
    return formattedDate;
  };

  const handleDiagnosis = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`../user-diagnosis/treatment/medicine`);
  };

  const handleInventory = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(`/admin/patients/customer-details/progress-questions`);
  };

  const filteredData = getCustomers.filter(
    (user) =>
      user.case_number.includes(searchTerm) ||
      user.phone_number.includes(searchTerm) ||
      user.email.includes(searchTerm) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <InsideLoader />;
  }

  const columns = [
    { accessorKey: "case_number", header: "Case No.", size: 10 },
    { accessorKey: "first_name", header: "Patient Name" },
    { accessorKey: "personal_detail.age", header: "Age", size: 10 },
    { accessorKey: "personal_detail.weight", header: "Weight", size: 10 },
    { accessorKey: "phone_number", header: "Phone Number" },
    {
      accessorKey: "follow_up",
      header: "Type",
      Cell: ({ row }) => {
        const date = row.original.follow_up;
        return formatType(date);
      },
      size: 10,
    },
    {
      accessorKey: "created_at",
      header: " Created At",
      Cell: ({ row }) => {
        const date = row.original.created_at;
        return convertDate(date);
      },
      size: 10,
    },
    {
      header: "Actions",
      Cell: ({ row }) => {
        const val = row.original;
        return (
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleDiagnosis(val.id, val.case_number)}
              className="font-medium p-1 text-green-600 bg-white border text-sm ml-1 border-gray-300 rounded-md hover:bg-green-600 hover:text-white"
            >
              Diagnosis
            </button>
            <button
              className="font-medium p-1 text-white bg-green-600 border border-gray-300 text-sm rounded-md hover:text-green-600 hover:bg-white"
              onClick={() => handleInventory(val.id, val.case_number)}
            >
              View Patient
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <button
          className="border border-gray-300 lg:w-[15%] mt-10 bg-green-600 rounded-md text-lg text-white hover:scale-105"
          onClick={() => navigate("../../new-user/general-details")}
        >
          Create New Patient
        </button>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={filteredData}
        initialState={{
          showColumnFilters: true,
          showGlobalFilter: true,
          density: "compact",
        }}
        muiTableBodyCellProps={{
          sx: { padding: "16px" }, 
        }}
        enablePagination={false}
        enableDensityToggle={false}
        renderTopToolbarCustomActions={() => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
            }}
          >
            <IoPersonSharp size={25} />
            <label className="text-lg font-bold tracking-wide">
              Patient List
            </label>
          </div>
        )}
      />
    </Box>
  );
}

export default CustomerAllUsers;
