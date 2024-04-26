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
  Stack,
} from "@mui/joy";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddNewWeight(props) {
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
                <FormLabel>{props.weight_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`weight_name`}
                  {...register(`weight_name`)}
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

export default AddNewWeight;
