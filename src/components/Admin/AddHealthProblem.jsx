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

function AddHealthProblem(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    english: "",
  });
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(text);
    props.handleApi(text.english);

    const formData = new FormData();
    formData.append("survey_helth_problem[problem]", text.english);
    axios
      .post("/api/v2/survey_helth_problems", formData)
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
                <FormLabel>{props.details} :-</FormLabel>
                <Box className="flex flex-col items-center w-full">
                  <ReactTransliterate
                    name="question_english"
                    value={text.english}
                    lang="en"
                    onChangeText={(value) => {
                      setText((prev) => ({
                        ...prev,
                        english: value,
                      }));
                    }}
                    renderComponent={(props) => (
                      <textarea {...props} placeholder="In English..." />
                    )}
                    className="p-1 border border-gray-400 rounded-sm"
                    rows={4}
                    cols={30}
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

export default AddHealthProblem;
