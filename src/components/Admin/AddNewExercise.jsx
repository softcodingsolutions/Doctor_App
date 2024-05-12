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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNewExercise(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.exercise_name, value);
    reset();
    setValue("");
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
                <FormLabel>{props.exercise_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`exercise_name`}
                  {...register(`exercise_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.exercise_describe} :-</FormLabel>
                <ReactQuill
                  className="w-96 min-h-fit max-h-36 overflow-auto"
                  placeholder="Describe..."
                  theme="snow"
                  name={`exercise_describe`}
                  value={value}
                  onChange={setValue}
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

export default AddNewExercise;
