import { Add } from "@mui/icons-material";
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
  Stack,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddListFranchise(props) {
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
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.first_name} :-</FormLabel>
                  <Input
                    placeholder="Name..."
                    name={`first_name`}
                    {...register(`first_name`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.last_name} :-</FormLabel>
                  <Input
                    placeholder="Name..."
                    name={`last_name`}
                    {...register(`last_name`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddListFranchise;
