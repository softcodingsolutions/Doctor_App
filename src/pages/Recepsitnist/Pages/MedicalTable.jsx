// import { useState } from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import { MdOutlineEdit } from "react-icons/md";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Tooltip from "@mui/material/Tooltip";

// export default function MedicalTable({ data, refreshData }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editedMachineName, setEditedMachineName] = useState("");
//   const [editedQuantity, setEditedQuantity] = useState("");
//   const [editedBrief, setEditedBrief] = useState("");

//   const handleRemove = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`/api/v1/medicines/${id}`)
//           .then((res) => {
//             console.log(res);
//             refreshData();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your medicine has been deleted.",
//               icon: "success",
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//             alert(err.response?.data?.message + "!");
//           });
//       }
//     });
//   };

//   const handleEdit = (item) => {
//     setEditingId(item.id);
//     setEditedMachineName(item.medicine_name);
//     setEditedQuantity(item.medicine_quantity);
//     setEditedBrief(item.medicine_content);
//   };

//   const handleSave = (id) => {
//     const updatedItem = {
//       medicine_name: editedMachineName,
//       medicine_quantity: editedQuantity,
//       medicine_content: editedBrief,
//     };

//     axios
//       .put(`/api/v1/medicines/${id}`, updatedItem)
//       .then((res) => {
//         console.log(res);
//         refreshData();
//         setEditingId(null);
//       })
//       .catch((err) => {
//         console.log(err);
//         alert(err.response?.data?.message + "!");
//       });
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedMachineName("");
//     setEditedQuantity("");
//     setEditedBrief("");
//   };

//   return (
//     <table className="w-full  rounded-md border-gray-300 text-sm text-left ">
//       <thead className="sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
//         <tr>
//           <th className="border-b-2 p-3">Medicine Name</th>
//           <th className="border-b-2 p-3">Content</th>
//           <th className="border-b-2 p-3">Quantity</th>

//           <th className="border-b-2 p-3">Action</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-300">
//         {data.map((item, index) => (
//           <tr key={index} className="hover:bg-gray-100">
//             {editingId === item.id ? (
//               <>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <input
//                     type="text"
//                     value={editedMachineName}
//                     onChange={(e) => setEditedMachineName(e.target.value)}
//                     className="border-2 rounded-md p-2"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <input
//                     type="text"
//                     value={editedBrief}
//                     onChange={(e) => setEditedBrief(e.target.value)}
//                     className="border-2 rounded-md p-2"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <input
//                     type="number"
//                     value={editedQuantity}
//                     onChange={(e) => setEditedQuantity(e.target.value)}
//                     className="border-2 rounded-md p-2"
//                     min="0"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <button
//                     onClick={() => handleSave(item.id)}
//                     className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </>
//             ) : (
//               <>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <div className="text-black text-base font-medium ml-1 text-wrap">
//                     {item.medicine_name}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <div className="text-black text-base font-medium ml-1 text-wrap">
//                     {item.medicine_content}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4 border-b border-b-gray-50">
//                   <div className="text-black text-base font-medium ml-1 text-wrap">
//                     {item.medicine_quantity}
//                   </div>
//                 </td>

//                 <td className="py-2 px-4 border-b border-b-gray-50 space-x-4">
//                   <Tooltip title="Edit Medicine">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="relative inline-flex items-center justify-center text-[#06AED4]  bg-[#9FD7EA] text-sm p-1.5 rounded-full group transition-all duration-300 hover:shadow-md"
//                     >
//                       <MdOutlineEdit size={17} />
//                     </button>
//                   </Tooltip>
//                   <Tooltip title="Delete Medicine">
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="relative  inline-flex  p-1.5 rounded-full bg-red-100 text-red-600 group transition-all duration-300 hover:shadow-md"
//                     >
//                       <AiOutlineDelete size={17} />
//                     </button>
//                   </Tooltip>
//                 </td>
//               </>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { IoSearchOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";

export default function MedicalTable({ data, refreshData }) {
  const [editingId, setEditingId] = useState(null);
  const [editedMachineName, setEditedMachineName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedBrief, setEditedBrief] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v1/medicines/${id}`)
          .then((res) => {
            // console.log(res);
            refreshData();
            Swal.fire({
              title: "Deleted!",
              text: "Your medicine has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            // console.log(err);
            // alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditedMachineName(item.medicine_name);
    setEditedQuantity(item.medicine_quantity);
    setEditedBrief(item.medicine_content);
  };

  const handleSave = (id) => {
    const updatedItem = {
      medicine_name: editedMachineName,
      medicine_quantity: editedQuantity,
      medicine_content: editedBrief,
    };

    axios
      .put(`/api/v1/medicines/${id}`, updatedItem)
      .then((res) => {
        // console.log(res);
        refreshData();
        setEditingId(null);
      })
      .catch((err) => {
        // console.log(err);
        // alert(err.response?.data?.message + "!");
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMachineName("");
    setEditedQuantity("");
    setEditedBrief("");
  };

  const filteredData = data.filter((item) =>
    item.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-2">
      <div className="flex justify-end mb-4">
        <div className="relative flex items-center pr-2 w-[30rem]">
          <IoSearchOutline className="absolute left-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by medicine name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="h-[65vh] overflow-y-auto">
        <table className="w-full rounded-md border-gray-300 text-sm text-left ">
          <thead className="sticky top-0 z-10 text-[#71717A] font-medium border-b-2 bg-white">
            <tr>
              <th className="border-b-2 p-3">Medicine Name</th>
              <th className="border-b-2 p-3">Content</th>
              <th className="border-b-2 p-3">Quantity</th>
              <th className="border-b-2 p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {editingId === item.id ? (
                    <>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <input
                          type="text"
                          value={editedMachineName}
                          onChange={(e) => setEditedMachineName(e.target.value)}
                          className="border-2 rounded-md p-2"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <input
                          type="text"
                          value={editedBrief}
                          onChange={(e) => setEditedBrief(e.target.value)}
                          className="border-2 rounded-md p-2"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <input
                          type="number"
                          value={editedQuantity}
                          onChange={(e) => setEditedQuantity(e.target.value)}
                          className="border-2 rounded-md p-2"
                          min="0"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <button
                          onClick={() => handleSave(item.id)}
                          className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancel}
                          className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="text-black text-base font-medium ml-1 text-wrap">
                          {item.medicine_name}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="text-black text-base font-medium ml-1 text-wrap">
                          {item.medicine_content}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="text-black text-base font-medium ml-1 text-wrap">
                          {item.medicine_quantity}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50 space-x-4">
                        <Tooltip title="Edit Medicine">
                          <button
                            onClick={() => handleEdit(item)}
                            className="relative inline-flex items-center justify-center text-[#06AED4] bg-[#9FD7EA] text-sm p-1.5 rounded-full group transition-all duration-300 hover:shadow-md"
                          >
                            <MdOutlineEdit size={17} />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete Medicine">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="relative inline-flex p-1.5 rounded-full bg-red-100 text-red-600 group transition-all duration-300 hover:shadow-md"
                          >
                            <AiOutlineDelete size={17} />
                          </button>
                        </Tooltip>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
