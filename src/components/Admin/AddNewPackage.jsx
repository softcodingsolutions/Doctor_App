import React, { useState } from "react";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";

function AddNewPackage(props) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.package_name, d.package_days, d.price);
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
              <FormControl>
                <FormLabel>{props.package_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`package_name`}
                  {...register(`package_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.package_days} :-</FormLabel>
                <Input
                  placeholder="No. of days"
                  name={`package_days`}
                  {...register(`package_days`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.price} :-</FormLabel>
                <Input
                  placeholder="₹₹₹"
                  name={`price`}
                  {...register(`price`)}
                  autoFocus
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

export default AddNewPackage;
