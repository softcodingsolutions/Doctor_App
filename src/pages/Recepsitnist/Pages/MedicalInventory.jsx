import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import MedicalTable from './MedicalTable';
import axios from 'axios';

export default function MedicalInventory() {
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState(false);
  const [name, setName] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');
  const [inputCost, setInputCost] = useState('');
  const [choice, setChoice] = useState('');
  const [content, setContent] = useState('');
  const [medicine, setMedicine] = useState('');
  const [casee, setCase] = useState('');
  const [quantityBill, setQuantityBill] = useState('');
  const [data, setData] = useState([]);
  const [medicineName,setMedicineName] = useState({});
  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = () => {
    axios.get(`/api/v1/medicine_inventories`).then((res) => {
      console.log(res,"Medicine");
      setData(res.data.medicines);
      const medicineData = res.data.medicines.map((res)=>res.name);
      setMedicineName(medicineData);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleBill = () =>{
    const formdata = new FormData();
    formdata.append('')
  }
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

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append('medicine_inventories[category]', choice);
    formdata.append('medicine_inventories[name]', name);
    formdata.append('medicine_inventories[quantity]', inputQuantity);
    formdata.append('medicine_inventories[price]', inputCost);
    formdata.append('medicine_inventories[content]', content);
    formdata.append('medicine_inventories[total_quantity_sold]', 0);

    axios.post(`/api/v1/medicine_inventories`, formdata).then((res) => {
      console.log(res);
      setOpen(false);
      handleShow();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div>
            <div className="text-xl font-semibold">
              Medical Inventory
            </div>
            <div className='flex gap-5'>
              <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
              >
                Add Medicine
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => setBill(true)}
              >
                Generate Bill
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <MedicalTable data={data} refreshData={handleShow} />
          </div>
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
                <Input placeholder='Enter Medicine name' onChange={handleName} autoFocus required />
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
                <Input placeholder='Content' value={content} onChange={handleContent} autoFocus required />
              </FormControl>
              <Button onClick={handleSubmit}>Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={bill} onClose={() => setBill(false)}>
        <ModalDialog>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Case Number</FormLabel>
                <Input placeholder='Enter CaseNumber' onChange={(e) => setCase(e.target.value)} autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Select Medicine</FormLabel>
                <select
                  className="py-1 px-2 rounded-md border border-black"
                  onChange={(e) => setMedicine(e.target.value)}
                  value={medicine}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {data.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </FormControl>
              <FormControl>
                <div className="flex gap-3">
                  <FormLabel>Quantity</FormLabel>
                  <input
                    className="border-2 rounded-md p-2"
                    type="number"
                    onChange={(e) => setQuantityBill(e.target.value)}
                    value={quantityBill}
                    placeholder="Quantity"
                    min="0"
                  />
                </div>
              </FormControl>
              <Button onClick={handleBill}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}