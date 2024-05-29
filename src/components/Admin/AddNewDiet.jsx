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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-transliterate/dist/index.css";
import { ReactTransliterate } from "react-transliterate";

function AddNewMedicine(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");
  const [text, setText] = useState({
    hindi: "",
    gujarati: "",
    english: "",
  });

  const submittedData = (d) => {
    console.log("text: ",text);
    console.log("Value: ", value);
    console.log(d);
    props.handleApi(d.diet_code, d.diet_name, value);
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
                <FormLabel>{props.diet_code} :-</FormLabel>
                <Input
                  placeholder="Code..."
                  name={`diet_code`}
                  {...register(`diet_code`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.diet_name} :-</FormLabel>
                <Input
                  placeholder="Name..."
                  name={`diet_name`}
                  {...register(`diet_name`)}
                  required
                />
              </FormControl>

              {/* <FormControl>
                <FormLabel>{props.diet_describe} :-</FormLabel>
                <ReactQuill
                  className="w-96 min-h-fit max-h-36 overflow-auto"
                  placeholder="Describe..."
                  theme="snow"
                  name={`diet_describe`}
                  value={value}
                  onChange={setValue}
                  required
                />
              </FormControl> */}

              <FormControl>
                <FormLabel>{props.diet_describe} :-</FormLabel>
                <Box className="flex flex-col items-center w-full gap-2">
                  <ReactQuill
                    className="w-96 min-h-fit max-h-36 overflow-auto"
                    placeholder="Describe..."
                    theme="snow"
                    name={`diet_describe`}
                    value={value}
                    onChange={setValue}
                    required
                  />

                  <ReactTransliterate
                    name={`describe_hindi`}
                    {...register(`describe_hindi`)}
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
                    name={`describe_gujarati`}
                    {...register(`describe_gujarati`)}
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

export default AddNewMedicine;
