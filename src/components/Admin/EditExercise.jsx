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
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditExercise(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState({
    hindi: props.see[0]?.details_hindi || "",
    gujarati: props.see[0]?.details_gujarati || "",
    english: props.see[0]?.details || "",
  });

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.exercise_name,
      text.english,
      text.hindi,
      text.gujarati,
      props.see[0]?.id,
      d.doctor_id
    );
  };

  useEffect(() => {
    setText({
      hindi: props.see[0]?.details_hindi || "",
      gujarati: props.see[0]?.details_gujarati || "",
      english: props.see[0]?.details || "",
    });
  }, [props.see]);

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
                  defaultValue={props.see[0]?.name}
                  placeholder="Name..."
                  name={`exercise_name`}
                  {...register(`exercise_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              {props?.role === "super_admin" && (
                <FormControl className="w-1/2">
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
                <FormLabel>{props.exercise_describe_english} :-</FormLabel>
                <Box className="flex flex-col items-center w-full gap-2">
                  <ReactQuill
                    defaultValue={props.see[0]?.details}
                    className="w-96 min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in English..."
                    theme="snow"
                    name={`exercise_describe_english`}
                    value={text.english}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        english: value,
                      }));
                    }}
                    required
                  />

                  <ReactQuill
                    defaultValue={props.see[0]?.details_hindi}
                    className="w-96 min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in Hindi..."
                    theme="snow"
                    name={`exercise_describe_hindi`}
                    value={text.hindi}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        hindi: value,
                      }));
                    }}
                    required
                  />

                  <ReactQuill
                    defaultValue={props.see[0]?.details_gujarati}
                    className="w-96 min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in Gujarati..."
                    theme="snow"
                    name={`exercise_describe_gujarati`}
                    value={text.gujarati}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        gujarati: value,
                      }));
                    }}
                    required
                  />
                </Box>
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default EditExercise;
