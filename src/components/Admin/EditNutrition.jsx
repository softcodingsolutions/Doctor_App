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
import { MdEdit } from "react-icons/md";

function EditNutrition(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.nutrition_name, props.see[0]?.id, d.doctor_id);
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(true);
          props?.function();
        }}
      >
        <MdEdit size={20} />
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: { xs: "95%", sm: "600px" },
            width: "100%",
            overflow: "auto",
          }}
        >
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
                <FormLabel>{props.nutrition_name} </FormLabel>
                <Input
                  defaultValue={props.see[0]?.name}
                  placeholder="Name..."
                  name={`nutrition_name`}
                  {...register(`nutrition_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              {props?.role === "super_admin" && (
                <FormControl>
                  <FormLabel>Select Doctor </FormLabel>
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

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default EditNutrition;
