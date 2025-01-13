import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactTransliterate } from "react-transliterate";

function AddWeightName(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    english: "",
  });
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(text);
    props.handleApi(text.english);

    const formData = new FormData();
    formData.append("survey_weigh_reason[name]", d.name);
    axios
      .post("/api/v2/survey_weigh_reasons", formData)
      .then((res) => {
        console.log(res);
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
    setText({
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
        <ModalDialog
          sx={{
            maxWidth: { xs: "95%", sm: "600px" },
            width: "100%",
            overflow: "auto",
          }}
        >
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
                <FormLabel>{props.details} </FormLabel>
                <Box className="flex flex-col items-center w-full">
                  <input
                    name="name"
                    {...register("name")}
                    placeholder="Name..."
                    className="p-2 border w-full border-gray-400 rounded-sm mb-2"
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

export default AddWeightName;
