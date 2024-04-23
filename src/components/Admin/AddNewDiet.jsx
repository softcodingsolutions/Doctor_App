import { Add } from "@mui/icons-material";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddNewMedicine(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi();
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
                <FormLabel>{props.diet_code} :-</FormLabel>
                <Input
                  placeholder="Code..."
                  name={`diet_code`}
                  {...register(`diet_code`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.diet_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`diet_name`}
                  {...register(`diet_name`)}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.diet_describe} :-</FormLabel>
                <Input
                  placeholder="Describe..."
                  name={`diet_describe`}
                  {...register(`diet_describe`)}
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

export default AddNewMedicine;
