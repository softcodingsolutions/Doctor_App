import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { IoPersonSharp, IoCloseOutline } from "react-icons/io5";
import { GiCaduceus } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { Outlet, useOutletContext } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { get } from "lodash";
function CustomerAllUsers() {
  const navigate = useNavigate();
  const [toggleSidebar, admin, showSidebar] = useOutletContext();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");
  const [type, setType] = useState("");
  const [created_at, setCreatedAt] = useState("");

  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users?user_id=${main_id}`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient"
      );
      // Add `full_name` and `doctor_full_name` to each user object
      const formattedPatients = patients.map((user) => ({
        ...user,
        full_name: `${user.first_name} ${user.last_name}`,
      }));

      setGetCustomers(formattedPatients);

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
      return <div className=" rounded  text-[#e78f3d]">Old Case</div>;
    } else if (type === false) {
      return <div className=" rounded  text-[#00bad1]">New Case</div>;
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

  // const filteredData = getCustomers.filter((user) => {
  //   const firstName = user.first_name?.toLowerCase() || "";
  //   const lastName = user.last_name?.toLowerCase() || "";
  //   const fullName = `${firstName} ${lastName}`;
  //   const caseNumber = user.case_number || "";
  //   const phoneNumber = user.phone_number || "";
  //   const email = user.email?.toLowerCase() || "";
  //   const typeText = user.follow_up ? "old case" : "new case";

  //   return (
  //     caseNumber.includes(searchTerm) ||
  //     phoneNumber.includes(searchTerm) ||
  //     email.includes(searchTerm.toLowerCase()) ||
  //     fullName.includes(searchTerm.toLowerCase()) ||
  //     typeText.includes(searchTerm.toLowerCase())
  //   );
  // });

  if (loading) {
    return <InsideLoader />;
  }

  const columns = [
    { accessorKey: "case_number", header: "Case No.", size: 10 },
    {
      accessorKey: "full_name",
      header: "Patient Name",
      Cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
      size: 10,
    },
    { accessorKey: "personal_detail.age", header: "Age", size: 10 },
    { accessorKey: "personal_detail.weight", header: "Weight", size: 10 },
    { accessorKey: "phone_number", header: "Contact No", size: 10 },
    // {
    //   accessorKey: "follow_up",
    //   header: "Type",
    //   Cell: ({ row }) => {
    //     const date = row.original.follow_up;
    //     return formatType(date);
    //   },
    //   size: 10,
    // },
    {
      accessorFn: (row) => (row.follow_up ? "Old Case" : "New Case"),
      id: "type",
      header: "Type",
      Cell: ({ cell }) => {
        return (
          <div
            className={`rounded text-sm ${
              cell.getValue() === "Old Case"
                ? "text-[#e78f3d]"
                : "text-[#00bad1]"
            }`}
          >
            {cell.getValue()}
          </div>
        );
      },
      filterFn: "equals",
      filterSelectOptions: [
        { text: "Old Case", value: "Old Case" },
        { text: "New Case", value: "New Case" },
      ],
      filterVariant: "select",
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
          <div className="flex  gap-1">
            <Tooltip title="Diagnosis" arrow placement="top">
              <button
                onClick={() => handleDiagnosis(val.id, val.case_number)}
                className="font-medium p-1 w-fit  text-green-600 bg-white border text-sm ml-1 border-gray-300 rounded-md hover:bg-green-600 hover:text-white"
              >
                <GiCaduceus size={20} />
              </button>
            </Tooltip>
            <Tooltip title="View Patient Details" arrow placement="top">
              <button
                className="font-medium p-1 w-fit text-white bg-green-600 border border-gray-300 text-sm rounded-md hover:text-green-600 hover:bg-white"
                onClick={() => handleInventory(val.id, val.case_number)}
              >
                <FaEye size={20} />
              </button>
            </Tooltip>
          </div>
        );
      },
      size: 10,
    },
  ];

  return (
    <div className="w-full ">
      <div className="flex justify-between w-full">
        <div className="flex gap-1">
          {/* <div className="mt-2">
            <IoPersonSharp size={35} className="text-green-600" />{" "}
          </div> */}
          <div className="flex  flex-col">
            <label className="flex justify-start text-xl font-bold ">
              Patient List
            </label>
            <span className="text-md text-gray-600 ">
              View and manage all patient records
            </span>
          </div>
        </div>
        <button
          className="flex gap-1 border border-gray-300  py-2  px-3 h-10 bg-green-600 rounded-md text-sm text-white hover:scale-105"
          onClick={() => navigate("../../new-user/general-details")}
        >
          <IoPersonSharp size={20} />
          Create Patient
        </button>
      </div>

      {/* <MaterialReactTable
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
      /> */}
      <div className={`${showSidebar ? "w-full" : "w-full"} overflow-y-auto `}>
        <MaterialReactTable
          columns={columns}
          data={getCustomers.filter((user) => {
            // console.log(user, "USER");
            const fullName = user.full_name;
            const typeText = user.follow_up ? "old case" : "new case";
            return (
              user.case_number.includes(searchTerm) ||
              user.phone_number.includes(searchTerm) ||
              user.email.includes(searchTerm) ||
              fullName.includes(searchTerm.toLowerCase()) ||
              typeText.includes(searchTerm.toLowerCase())
            );
          })}
          initialState={{
            showColumnFilters: true,
            showGlobalFilter: true,
            density: "compact",
          }}
          enablePagination={false}
          enableDensityToggle={false}
          muiTableContainerProps={{
            sx: {
              maxHeight: "calc(100vh - 250px)", // Makes only data scrollable
              overflowY: "auto",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 101, // Ensures header stays above data
              borderBottom: "2px solid #ddd",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: "1px solid #ddd", // Optional: Improves row separation
            },
          }}
          // renderTopToolbarCustomActions={() => (
          //   <div
          //     style={{
          //       display: "flex",
          //       gap: 1,
          //     }}
          //   >
          //     <IoPersonSharp size={20} />
          //     <label className="text-md font-bold tracking-wide">
          //       Patient List
          //     </label>
          //   </div>
          // )}
        />
      </div>
    </div>
  );
}

export default CustomerAllUsers;
