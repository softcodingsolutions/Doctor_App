import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";

export default function MedicalTable({ data, refreshData }) {
  const [editingId, setEditingId] = useState(null);
  const [editedMachineName, setEditedMachineName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedBrief, setEditedBrief] = useState("");

  const handleRemove = (id) => {
    axios
      .delete(`api/v1/medicines/${id}`)
      .then((res) => {
        console.log(res);
        refreshData();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
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
        console.log(res);
        refreshData();
        setEditingId(null);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMachineName("");
    setEditedQuantity("");
    setEditedBrief("");
  };

  return (
    <table className="w-full min-w-[460px] z-0">
      <thead className="uppercase">
        <tr className="bg-[#1F2937] text-white rounded-md">
          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left rounded-tl-md rounded-bl-md">
            Medicine Name
          </th>
          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
            Content
          </th>
          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
            Quantity
          </th>

          <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left rounded-tr-md rounded-br-md">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className=" hover:bg-gray-200">
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

                <td className="py-2 px-4 border-b border-b-gray-50">
                  <button
                    onClick={() => handleEdit(item)}
                    className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                  >
                    <MdOutlineEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                  >
                    <AiOutlineDelete size={17} />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
