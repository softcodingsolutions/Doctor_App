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
  Textarea,
  Select,
  Option,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";

function AddLabTest(props) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.test_name, d.gender, d.test_comments);
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
                <FormLabel>{props.test_name} </FormLabel>
                <Input
                  placeholder="Name..."
                  name={`test_name`}
                  {...register(`test_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.gender} </FormLabel>
                <Select
                  placeholder="Choose gender..."
                  required
                  name={`gender`}
                  {...register(`gender`)}
                >
                  <Option value="female">Female</Option>
                  <Option value="male">Male</Option>
                  <Option value="both">Both</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{props.test_comments} </FormLabel>
                <Textarea
                  placeholder="Name..."
                  name={`test_comments`}
                  {...register(`test_comments`)}
                  autoFocus
                  minRows={3}
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

export default AddLabTest;
