import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import "react-transliterate/dist/index.css";
import { ReactTransliterate } from "react-transliterate";
import { Box, ModalClose, Typography } from "@mui/joy";

function AddNewQuestion(props) {
  const [text, setText] = useState({
    hindi: "",
    gujarati: "",
    english: "",
  });
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(text);
    console.log(d);
    props.handleApi(
      d.gender,
      text.gujarati,
      text.english,
      text.hindi,
      d.Part,
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
        <ModalDialog
          sx={{
            width: "70%",
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
              <Box className="flex space-x-2">
                <FormControl className="w-1/2">
                  <FormLabel>{props.part} </FormLabel>
                  <Select
                    className="w-full"
                    required
                    placeholder="Choose any one..."
                    name={`${props.part}`}
                    {...register(`${props.part}`)}
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </FormControl>

                <FormControl className="w-1/2">
                  <FormLabel>{props.label1} </FormLabel>
                  <Select
                    placeholder="Choose gender..."
                    required
                    name={`${props.gender}`}
                    {...register(`${props.gender}`)}
                  >
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="both">Both</Option>
                  </Select>
                </FormControl>

                {props?.role === "super_admin" && (
                  <FormControl className="w-1/2">
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
              </Box>

              <FormControl>
                <FormLabel>{props.label2} </FormLabel>
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
                    className="p-1 border border-gray-400 rounded-sm w-full lg:w-[100%] " // responsive width classes
                    rows={4}
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
                    className="p-1 border border-gray-400 rounded-sm w-full lg:w-[100%] "
                    rows={4}
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
                    className="p-1 border border-gray-400 rounded-sm w-full lg:w-[100%] "
                    rows={4}
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

export default AddNewQuestion;
