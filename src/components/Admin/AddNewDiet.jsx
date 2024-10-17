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
import React, { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

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

  const submittedData = useCallback(
    (d) => {
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
      setText({ hindi: "", gujarati: "", english: "" });
      setOpen(false);
    },
    [text, reset, props]
  );

  const editorConfig = useMemo(
    () => ({
      placeholder: "Type here...",
      toolbar: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ol",
        "ul",
        "|",
        "font",
        "fontsize",
        "color",
        "|",
        "link",
        "image",
        "|",
        "clean",
      ],
    }),
    []
  );

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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: {  sm: "69%" },
            width: "100%",
            overflow: "auto",
          }}
        >
          <ModalClose />
          <DialogTitle>{props.title}</DialogTitle>
          <Box sx={{ overflowY: "auto", maxHeight: "70vh", paddingRight: 2 }}>
            <form onSubmit={handleSubmit(submittedData)}>
              <Stack spacing={2} sx={{ width: "1000px" }}>
                <FormControl>
                  <FormLabel>{props.diet_code}</FormLabel>
                  <Input
                    placeholder="Code..."
                    name="diet_code"
                    {...register("diet_code")}
                    autoFocus
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{props.diet_name}</FormLabel>
                  <Input
                    placeholder="Name..."
                    name="diet_name"
                    {...register("diet_name")}
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
                          {`${res.first_name} ${res.last_name}`}
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
                  <FormLabel>{props.diet_describe_english}</FormLabel>
                  <Box className="flex flex-col items-center w-full gap-3">
                    <JoditEditor
                      value={text.english}
                      config={editorConfig}
                      onChange={(value) =>
                        setText((prev) => ({ ...prev, english: value }))
                      }
                    />

                    <JoditEditor
                      value={text.hindi}
                      config={editorConfig}
                      onChange={(value) =>
                        setText((prev) => ({ ...prev, hindi: value }))
                      }
                    />

                    <JoditEditor
                      value={text.gujarati}
                      config={editorConfig}
                      onChange={(value) =>
                        setText((prev) => ({ ...prev, gujarati: value }))
                      }
                    />
                  </Box>
                </FormControl>

                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewMedicine;
