import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { Box, Select, MenuItem } from "@mui/material";

const UserInquiry = () => {
  const context = useOutletContext();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const doctor_id = localStorage.getItem("main_id");

  const fetchData = () => {
    axios
      .get(`/api/v1/leads?doctor_id=${doctor_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((detail) => {
    const date = new Date(detail.created_at);
    return (
      date.getMonth() + 1 === parseInt(month) &&
      date.getFullYear() === parseInt(year)
    );
  });

  const columns = [
    { accessorKey: "name", header: "User Name", size: 200 },
    { accessorKey: "phone", header: "Phone Number", size: 150 },
    { accessorKey: "age", header: "Age", size: 100 },
    { accessorKey: "health_issue", header: "Health Issue", size: 250 },
  ];

  return (
    <Box className="flex  flex-col w-full font-sans bg-white">
      <Box className="w-full flex justify-between items-center mb-4">
        <Box className="flex gap-2">
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-black  rounded-md"
            size="small"
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-black p-1 rounded-md"
            size="small"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={currentYear - i}>
                {currentYear - i}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={filteredData}
        initialState={{
          showColumnFilters: true,
          showGlobalFilter: true,
          density: "comfortable",
        }}
        muiTableProps={{
          sx: { borderRadius: "10px", boxShadow: "none" },
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
            <AiOutlineFileSearch size={30} />
            <label className="text-lg font-bold tracking-wide">Inquiry</label>
          </div>
        )}
      />
    </Box>
  );
};

export default UserInquiry;
