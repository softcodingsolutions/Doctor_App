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
    
    props.handleApi(
      data.progress_date,
      data.progress_weight,
      data.pre_weight,
      data.diet,
      data.exercise,
      file
    );

    reset(); 
    setFile(null); 
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
                  <FormLabel>Diet Followed</FormLabel>
                  <RadioGroup defaultValue="yes" name="diet">
                    <Radio {...register("diet")} label="Yes" value="true" />
                    <Radio {...register("diet")} label="No" value="false" />
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Exercise Followed</FormLabel>
                  <RadioGroup defaultValue="yes" name="exercise">
                    <Radio {...register("exercise")} label="Yes" value="true" />
                    <Radio {...register("exercise")} label="No" value="false" />
                  </RadioGroup>
                </FormControl>

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
