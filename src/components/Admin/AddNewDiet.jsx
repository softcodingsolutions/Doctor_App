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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNewMedicine(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState({
    hindi: "",
    gujarati: "",
    english: "",
  });

  const submittedData = (d) => {
    console.log("text: ", text);
    console.log(d);
    props.handleApi(
      d.diet_code,
      d.diet_name,
      text.english,
      text.hindi,
      text.gujarati,
      d.doctor_id
    );
    reset();
    setText({
      hindi: "",
      gujarati: "",
      english: "",
    });
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
            <Stack spacing={2} width={500}>
              <FormControl>
                <FormLabel>{props.diet_code} </FormLabel>
                <Input
                  placeholder="Code..."
                  name={`diet_code`}
                  {...register(`diet_code`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.diet_name} </FormLabel>
                <Input
                  placeholder="Name..."
                  name={`diet_name`}
                  {...register(`diet_name`)}
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

              <FormControl>
                <FormLabel>{props.diet_describe_english} </FormLabel>
                <Box className="flex flex-col items-center w-full gap-2">
                  <ReactQuill
                    className="w-full min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in English..."
                    theme="snow"
                    name={`diet_describe_english`}
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
                    className="w-full min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in Hindi..."
                    theme="snow"
                    name={`diet_describe_hindi`}
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
                    className="w-full min-h-fit max-h-28 overflow-auto"
                    placeholder="Describe in Gujarati..."
                    theme="snow"
                    name={`diet_describe_gujarati`}
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

export default AddNewMedicine;
