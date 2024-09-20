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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const handleShow = () => {
    axios
      .get(`api/v1/medicines`)
      .then((res) => {
        console.log(res, "Medicine");
        setData(res.data?.medicines);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleQuantityChange = (e) => {
    setInputQuantity(e.target.value);
  };

  const handleCostChange = (e) => {
    setInputCost(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleChoice = (e) => {
    setChoice(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return data.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        console.log(res);
        setOpen(false);
        handleShow();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-2">
          <button
            onClick={context?.[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="w-full ">
          <div className="rounded-lg bg-card h-[95vh] bg-white">
            <div className="flex flex-col px-4 py-2.5 h-full space-y-3">
              <div className="text-xl font-semibold">Medical Inventory</div>
              
                <MedicalTable data={paginateCustomers()} refreshData={handleShow} />
      
              {/* Pagination Controls */}
              {totalPages !== 0 && (
                <div className="flex flex-wrap justify-center items-center gap-2 py-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      ></path>
                    </svg>
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                          currentPage === i + 1
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
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
                      autoFocus
                      required
                    />
                  </FormControl>
                  <Button onClick={handleSubmit}>Add</Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
        </div>
      </div>
    </div>
  );
}
