import React, { useState } from "react";
import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewProgresReport(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const [file, setFile] = useState(null); 

  const progressWeight = watch("progress_weight", 0);

  const submittedData = (data) => {
    console.log(data);
    if (file) {
      const formData = new FormData();
      formData.append("progress_date", data.progress_date);
      formData.append("pre_weight", data.pre_weight);
      formData.append("progress_weight", data.progress_weight);
      formData.append("diet", data.diet);
      formData.append("exercise", data.exercise);
      formData.append("file", file);

      // Send the form data with axios
      props.handleApi(formData);
    } else {
      props.handleApi(data.progress_date, data.progress_weight);
    }

    reset();
    setFile(null); // Reset file input after submission
  };

  const getWeightInputClass = () => {
    return progressWeight <= 200
      ? "border border-green-500 p-1.5 bg-[#fafafa] rounded-md shadow-sm"
      : "border border-red-500 p-1.5 bg-[#fafafa] rounded-md shadow-sm";
  };

  return (
    <React.Fragment>
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
        }}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{props.title}</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(submittedData)(event);
              setOpen(false);
            }}
          >
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>{props.progress_date}</FormLabel>
                <input
                  className="border border-gray-300 p-1.5 bg-[#fafafa] rounded-md shadow-sm"
                  type="date"
                  name="progress_date"
                  {...register("progress_date")}
                  required
                />
              </FormControl>

              <div className="grid grid-cols-2 gap-2">
                <FormControl>
                  <FormLabel>Pre Weight</FormLabel>
                  <Input
                    placeholder="In kgs..."
                    name="pre_weight"
                    {...register("pre_weight")}
                    autoFocus
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{props.progress_weight}</FormLabel>
                  <Input
                    placeholder="In kgs..."
                    name="progress_weight"
                    {...register("progress_weight")}
                    className={getWeightInputClass()}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Following Diet</FormLabel>
                  <RadioGroup name="diet" defaultValue="yes">
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Following Exercise</FormLabel>
                  <RadioGroup name="exercise" defaultValue="yes">
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                  </RadioGroup>
                </FormControl>

                {/* New File Upload Input */}
                <FormControl>
                  <FormLabel>Upload Blood Report(PDF or JPG)</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormControl>
              </div>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewProgresReport;
