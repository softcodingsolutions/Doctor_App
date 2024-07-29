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
  Textarea,
  Typography,
} from "@mui/joy";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddNewWeight(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.reason_name,
      d.reason_for,
      d.reason_comments,
      d.doctor_id
    );
    reset();
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
              {props?.role === "super_admin" && (
                <FormControl>
                  <FormLabel>Select Doctor :-</FormLabel>
                  <Select
                    required
                    placeholder="Select"
                    name="doctor_id"
                    {...register("doctor_id")}
                  >
                    {props?.doctors?.map((res) => (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
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
              <FormControl>
                <FormLabel>{props.reason_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`reason_name`}
                  {...register(`reason_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl className="w-1/2">
                <FormLabel>{props.reason_for} :-</FormLabel>
                <Select
                  sx={{ width: "200%" }}
                  required
                  placeholder="Choose gender..."
                  name={`reason_for`}
                  {...register(`reason_for`)}
                >
                  <Option value="female">Female</Option>
                  <Option value="male">Male</Option>
                  <Option value="both">Both</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{props.reason_comments} :-</FormLabel>
                <Textarea
                  placeholder="Coments..."
                  name={`reason_comments`}
                  {...register(`reason_comments`)}
                  autoFocus
                  minRows={5}
                  required
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewWeight;
