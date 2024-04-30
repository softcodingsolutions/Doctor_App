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
import { ReactTransliterate } from "react-transliterate";

function AddNewFamily(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    hindi: "",
    gujarati: "",
    english: "",
  });
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    console.log(text);
    console.log(d);
    props.handleApi(text.hindi, text.gujarati, text.english);
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
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>{props.details} :-</FormLabel>
                <Box className="flex flex-col items-center w-full">
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
                    className="p-1 border border-gray-400 rounded-sm"
                    rows={4}
                    cols={30}
                    required
                  />

                  <ReactTransliterate
                    name={`question_hindi`}
                    {...register(`question_hindi`)}
                    value={text.hindi}
                    lang="hi"
                    onChangeText={(value) => {
                      setText((prev) => {
                        return {
                          ...prev,
                          hindi: value,
                        };
                      });
                    }}
                    renderComponent={(props) => {
                      return <textarea {...props} placeholder="In Hindi..." />;
                    }}
                    className="p-1 border border-gray-400 rounded-sm"
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

export default AddNewFamily;
