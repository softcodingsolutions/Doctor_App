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

function EditMedicine(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.med_name,
      d.med_content,
      d.med_quantity,
      props?.see[0]?.id,
      d.doctor_id
    );
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
            width: "70%",
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
                <FormLabel>{props.med_name} </FormLabel>
                <Input
                  defaultValue={props?.see[0]?.medicine_name}
                  placeholder="Name..."
                  name={`med_name`}
                  {...register(`med_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.med_content} </FormLabel>
                <Input
                  defaultValue={props?.see[0]?.medicine_content}
                  placeholder="Content..."
                  name={`med_content`}
                  {...register(`med_content`)}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.med_quantity} </FormLabel>
                <Input
                  defaultValue={props?.see[0]?.medicine_quantity}
                  placeholder="Quantity..."
                  name={`med_quantity`}
                  {...register(`med_quantity`)}
                  required
                />
              </FormControl>

              {props?.role === "super_admin" && (
                <FormControl className="w-1/2">
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

export default EditMedicine;
