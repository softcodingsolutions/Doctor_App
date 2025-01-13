import { Add } from "@mui/icons-material";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewMedicine(props) {
  const [open, setOpen] = useState(false);
  const [medicineName, setMedicines] = useState("");
  const [getParticularMedicine, setParticularMedicine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState("");
  const [medicineContent, setMedicineContent] = useState("");
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (data) => {
    props.handleApi(
      medicineName,
      data.med_content,
      data.med_quantity,
      data.doctor_id,
      update
    );
    reset();
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      axios
        .get(`/api/v1/medicines/search_medicine?medicine_name=${value}`)
        .then((res) => {
          const medicines = res.data?.medicines || [];
          setParticularMedicine(medicines);
          if (medicines.length === 0) {
            setMedicines(value); // This is for new medicine
            setUpdate(false); // New entry
          }
        })
        .catch((err) => console.error(err));
    } else {
      setParticularMedicine([]);
      setUpdate(false);
    }
  };

  const handleUserSelect = (medicine) => {
    setMedicines(medicine.medicine_name);
    setMedicineContent(medicine.medicine_content);
    setMedicineQuantity(medicine.medicine_quantity);
    setParticularMedicine([]);
    setUpdate(true); // Existing entry
  };

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        {props.name}
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
          setUpdate(false);
          setSearchTerm("");
        }}
      >
        <ModalDialog
          sx={{
       
            width: "70%",
            overflow: "auto",
          }}
        >
          <ModalClose />
          <DialogTitle>{props.title}</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(submittedData)(e);
              setParticularMedicine([]);
              setOpen(false);
            }}
          >
            <Stack spacing={3}>
              <Input
                type="text"
                name="med_name"
                {...register("med_name")}
                placeholder="Medicine Name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="py-2 px-4 rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {getParticularMedicine.length > 0 ? (
                <div className="space-y-1 h-20 overflow-auto">
                  {getParticularMedicine.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="border p-2 text-lg rounded-md cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => handleUserSelect(medicine)}
                    >
                      <div>
                        <div className="font-semibold text-sm">
                          {medicine.medicine_name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          Content: {medicine.medicine_content}
                        </div>
                      </div>
                      <div className="text-gray-600 text-xs">
                        Quantity: {medicine.medicine_quantity}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchTerm && (
                  <div className="text-gray-500 text-sm flex justify-center"></div>
                )
              )}

              {!update ? (
                <>
                  <FormControl>
                    <FormLabel>{props.med_content}</FormLabel>
                    <Input
                      placeholder="Content..."
                      name="med_content"
                      {...register("med_content")}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{props.med_quantity}</FormLabel>
                    <Input
                      placeholder="Quantity..."
                      name="med_quantity"
                      {...register("med_quantity")}
                      required
                    />
                  </FormControl>
                </>
              ) : (
                <div>
                  <div className="mb-5">
                    <div className="flex text-md font-medium m-1">
                      Medicine Content: {medicineContent}
                    </div>
                    <div className="flex text-md font-medium m-1">
                      Medicine Quantity: {medicineQuantity}
                    </div>
                  </div>
                  <FormControl>
                    <FormLabel>{props.med_quantity}</FormLabel>
                    <Input
                      placeholder="Add Medicine..."
                      name="med_quantity"
                      {...register("med_quantity")}
                      required
                    />
                  </FormControl>
                </div>
              )}

              {props?.role === "super_admin" && (
                <FormControl>
                  <FormLabel>Select Doctor</FormLabel>
                  <Select name="doctor_id" {...register("doctor_id")} required>
                    {props.doctors.map((doctor) => (
                      <Option key={doctor.id} value={doctor.id}>
                        {doctor.first_name + " " + doctor.last_name}
                      </Option>
                    ))}
                  </Select>
                  {errors.doctor_id && (
                    <Typography level="body2" color="danger">
                      {errors.doctor_id.message}
                    </Typography>
                  )}
                </FormControl>
              )}

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default AddNewMedicine;
