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
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

function AddNewExercise(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // State for each language's text separately
  const [englishText, setEnglishText] = useState("");
  const [hindiText, setHindiText] = useState("");
  const [gujaratiText, setGujaratiText] = useState("");

  const submittedData = (d) => {
    console.log({ englishText, hindiText, gujaratiText });
    console.log(d);
    props.handleApi(
      d.exercise_name,
      englishText,
      hindiText,
      gujaratiText,
      d.doctor_id
    );
    reset();
    setEnglishText("");
    setHindiText("");
    setGujaratiText("");
    setOpen(false); // Close the modal after submission
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
        <ModalDialog
          sx={{
            maxWidth: { sm: "69%" },
            width: "100%",
            overflow: "auto",
          }}
        >
          {" "}
          {/* Add styles here */}
          <ModalClose />
          <DialogTitle>{props.title}</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(submittedData)(event);
            }}
          >
            <Stack spacing={3} >
              <FormControl>
                <FormLabel>{props.exercise_name}</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`exercise_name`}
                  {...register(`exercise_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              {props?.role === "super_admin" && (
                <FormControl>
                  <FormLabel>Select Doctor</FormLabel>
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
                <FormLabel>{props.exercise_describe_english}</FormLabel>
                <Box className="flex flex-col items-center w-full gap-8">
                  <JoditEditor
                    value={englishText}
                    config={{
                      placeholder: "Describe in English...",
                      toolbar: [
                        "bold",
                        "italic",
                        "underline",
                        "link",
                        "image",
                        "ol",
                        "ul",
                        "table",
                        "clean",
                      ],
                    }}
                    onChange={setEnglishText}
                  />

                  <JoditEditor
                    value={hindiText}
                    config={{
                      placeholder: "Describe in Hindi...",
                      toolbar: [
                        "bold",
                        "italic",
                        "underline",
                        "link",
                        "image",
                        "ol",
                        "ul",
                        "table",
                        "clean",
                      ],
                    }}
                    onChange={setHindiText}
                  />

                  <JoditEditor
                    value={gujaratiText}
                    config={{
                      placeholder: "Describe in Gujarati...",
                      toolbar: [
                        "bold",
                        "italic",
                        "underline",
                        "link",
                        "image",
                        "ol",
                        "ul",
                        "table",
                        "clean",
                      ],
                    }}
                    onChange={setGujaratiText}
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

export default AddNewExercise;
