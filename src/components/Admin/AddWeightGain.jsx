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
import React, { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { ReactTransliterate } from "react-transliterate";

const AddWeightGain = forwardRef((props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    gujarati: "",
    english: "",
  });
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(text);
    console.log(d);
    if (typeof props.handleApi === "function") {
      props.handleApi(text.gujarati, text.english);
    } else {
      console.error("handleApi is not a function");
    }
    reset();
    setText({
      gujarati: "",
      english: "",
    });

    const formdata = new FormData();
    formdata.append("survey_question[in_english]", text.english);
    formdata.append("survey_question[in_gujarati]", text.gujarati);

    axios
      .post(`/api/v2/survey_questions`, formdata)
      .then((res) => {
        console.log(res);
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
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
                <Box className="flex flex-col  w-full">
                  <ReactTransliterate
                    name={`question_english`}
                    {...register(`question_english`)}
                    value={text.english}
                    lang="en"
                    onChangeText={(value) => {
                      setText((prev) => {
                        return {
                          ...prev,
                          english: value,
                        };
                      });
                    }}
                    renderComponent={(props) => {
                      return (
                        <textarea {...props} placeholder="In English..." />
                      );
                    }}
                    className="p-1 border border-gray-400 rounded-sm w-full"
                    rows={4}
                    cols={30}
                    required
                  />

                  <ReactTransliterate
                    name={`question_gujarati`}
                    {...register(`question_gujarati`)}
                    value={text.gujarati}
                    lang="gu"
                    onChangeText={(value) => {
                      setText((prev) => {
                        return {
                          ...prev,
                          gujarati: value,
                        };
                      });
                    }}
                    renderComponent={(props) => {
                      return (
                        <textarea {...props} placeholder="In Gujarati..." />
                      );
                    }}
                    className="p-1 border border-gray-400 rounded-sm w-full"
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
});

export default AddWeightGain;
