import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../InsideLoader";
import { MaterialReactTable } from "material-react-table";
import { IoPersonSharp } from "react-icons/io5";
import { Outlet, useOutletContext } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

function RecepAllUsers() {
  const [toggleSidebar, admin, showSidebar] = useOutletContext();
  const navigate = useNavigate();
  const [getCustomers, setGetCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  const handleGetAllUsers = () => {
    axios.get(`/api/v1/users`).then((res) => {
      const patients = res.data?.users?.filter(
        (user) => user.role === "patient"
      );

      // Add `full_name` and `doctor_full_name` to each user object
      const formattedPatients = patients.map((user) => ({
        ...user,
        full_name: `${user.first_name} ${user.last_name}`,
        doctor_full_name: user.doctor
          ? `${user.doctor.first_name} ${user.doctor.last_name}`
          : "N/A",
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

  const convertDate = (date) => {
    const dateObj = new Date(date);
    return `${String(dateObj.getDate()).padStart(2, "0")}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${dateObj.getFullYear()}`;
  };

  const handleRedirect = (val, caseNumber) => {
    localStorage.setItem("userId", val);
    localStorage.setItem("caseNumber", caseNumber);
    navigate(
      role === "receptionist"
        ? "/receptionist/patients/recp-customer-details/progress-questions"
        : "/admin/patients/customer-details/progress-questions"
    );
  };
  // const handleCheckboxChange = (userId, checked) => {
  //   const formdata = new FormData();
  //   formdata.append("user_id", userId);
  //   setLoading(true);

  //   axios
  //     .put(`/api/v1/users/indoor_activity_accessibility`, formdata)
  //     .then((res) => {
  //       console.log("Updated user indoor access:", res);
  //       setLoading(false);
  //       handleGetAllUsers(); // Refresh data after update
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };
  const formatType = (type) => {
    if (type === true) {
      return <div className=" rounded text-sm text-[#e78f3d]">Old Case</div>;
    } else if (type === false) {
      return <div className=" rounded text-sm text-[#00bad1]">New Case</div>;
    }
  };

  const handleCheckboxChange = (e) => {
    const formdata = new FormData();
    formdata.append("user_id", e.target.value);
    setLoading(true);
    axios
      .put(`/api/v1/users/indoor_activity_accessibility`, formdata)
      .then((res) => {
        console.log(res, "DATA RESPONSe");
        setLoading(false);
        handleGetAllUsers();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const columns = [
    {
      id: "select",
      header: "",
      Cell: ({ row }) => (
        <input
          value={row.original.id} // Ensure correct user ID is passed
          checked={row.original.indoor_activity_access} // Fix: Use row.original
          onChange={(e) => handleCheckboxChange(e)}
          type="checkbox"
          className="size-4"
        />
      ),
      size: 10,
    },
    { accessorKey: "case_number", header: "Case No.", size: 10 },
    {
      accessorKey: "full_name",
      header: "Patient Name",
      Cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
      size: 10,
    },

    // { accessorKey: "personal_detail.age", header: "Age", size: 10 },
    {
      accessorKey: "doctor_full_name",
      header: "Doctor ",
      Cell: ({ row }) =>
        `${row.original.doctor?.first_name} ${row.original.doctor?.last_name}`,
      size: 10,
    },
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
      header: "Created At",
      Cell: ({ row }) => convertDate(row.original.created_at),
      size: 10,
    },
    {
      id: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Tooltip title="View Patient Details">
          <button
            className="p-2 text-white bg-green-600 border border-gray-300 text-sm rounded-md hover:text-green-600 hover:bg-white"
            onClick={() =>
              handleRedirect(row.original.id, row.original.case_number)
            }
          >
            <FaEye size={20} />
          </button>
        </Tooltip>
      ),
      size: 10,
    },
  ];

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="">
      <div className="flex justify-between ">
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
      <div className={`w-full overflow-y-auto mt-5`}>
        <MaterialReactTable
          columns={columns}
          enablePagination={false}
          enableDensityToggle={false}
          // data={getCustomers.filter(
          //   (user) =>
          //     user.case_number.includes(searchTerm) ||
          //     user.phone_number.includes(searchTerm) ||
          //     user.email.includes(searchTerm) ||
          //     user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          //     user.indoor_activity_access ||
          //     user.follow_up
          // )}
          data={getCustomers.filter((user) => {
            const fullName = user.full_name.toLowerCase();
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
          muiTableBodyRowProps={() => ({
            sx: {
              backgroundColor: "white", // Default row background
              "&:hover": {
                backgroundColor: "#EFF6FF", // Hover background
                cursor: "pointer",
              },
            },
          })}
          muiTableContainerProps={{
            sx: {
              maxHeight: "calc(100vh - 220px)", // Makes only data scrollable
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
          renderTopToolbarCustomActions={() => (
            <div
              style={{
                display: "flex",
                gap: 2,
              }}
            >
              <input
                type="checkbox"
                checked
                className="w-4 h-4 mt-1 border border-gray-800"
              />
              <div>- Indoor activity accessibility</div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default RecepAllUsers;
