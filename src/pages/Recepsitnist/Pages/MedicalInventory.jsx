import { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import MedicalTable from "./MedicalTable";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import InsideLoader from "../../InsideLoader";
import { BiClinic } from "react-icons/bi";

export default function MedicalInventory() {
  const context = useOutletContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [choice, setChoice] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShow = () => {
    axios
      .get(`api/v1/medicines`)
      .then((res) => {
        // console.log(res, "Medicine");
        setData(res.data?.medicines);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        // alert(err.response?.data?.message + "!");
      });
  };

  const handleQuantityChange = (e) => setInputQuantity(e.target.value);
  const handleCostChange = (e) => setInputCost(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleChoice = (e) => setChoice(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("medicine_inventories[category]", choice);
    formdata.append("medicine_inventories[name]", name);
    formdata.append("medicine_inventories[quantity]", inputQuantity);
    formdata.append("medicine_inventories[price]", inputCost);
    formdata.append("medicine_inventories[content]", content);
    formdata.append("medicine_inventories[total_quantity_sold]", 0);

    axios
      .post(`/api/v1/medicine_inventories`, formdata)
      .then((res) => {
        // console.log(res);
        setOpen(false);
        handleShow();
      })
      .catch((err) => {
        // console.log(err);
        // alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full flex-grow overflow-auto  flex-wrap content-start ">
      <div className="rounded-lg w-full">
        <div className="flex flex-col px-4 py-2.5 h-full space-y-3">
          <div className="flex justify-between w-full">
            <div className="flex gap-1">
              <div className="mt-2">
                <BiClinic size={35} className="text-green-600" />{" "}
              </div>
              <div className="flex  flex-col">
                <label className="flex justify-start text-xl font-bold ">
                  Medical Inventory
                </label>
                <span className="text-md text-gray-600 ">
                  Manage all medicines
                </span>
              </div>
            </div>
            <div>
              {/* Add Button */}
              <button
                onClick={() => setOpen(true)}
                className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
              >
                Add New Medicine
              </button>
            </div>
          </div>
          {/* Scrollable table section */}
          <div >
            <MedicalTable data={data} refreshData={handleShow} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <select
                  className="py-1 px-2 rounded-md border border-black"
                  onChange={handleChoice}
                  value={choice}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="consulting">Consulting</option>
                  <option value="indooractivity">Indoor Activity</option>
                </select>
              </FormControl>
              <FormControl>
                <FormLabel>Medicine Name</FormLabel>
                <Input
                  placeholder="Enter Medicine name"
                  onChange={handleName}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <div className="flex gap-3">
                  <FormLabel>Quantity</FormLabel>
                  <input
                    className="border-2 rounded-md p-2"
                    type="number"
                    onChange={handleQuantityChange}
                    value={inputQuantity}
                    placeholder="Quantity"
                    min="0"
                  />
                  <FormLabel>Cost</FormLabel>
                  <input
                    className="border-2 rounded-md p-2"
                    type="number"
                    onChange={handleCostChange}
                    value={inputCost}
                    placeholder="Cost per medicine"
                    min="0"
                  />
                </div>
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input
                  placeholder="Content"
                  value={content}
                  onChange={handleContent}
                  required
                />
              </FormControl>
              <Button onClick={handleSubmit}>Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
