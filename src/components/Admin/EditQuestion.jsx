import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import { useForm } from "react-hook-form";
import "react-transliterate/dist/index.css";
import { ReactTransliterate } from "react-transliterate";
import { Box, ModalClose } from "@mui/joy";
import { MdEdit } from "react-icons/md";

function EditQuestion(props) {
  const [text, setText] = useState({
    hindi: props.see[0]?.question_in_hindi || "",
    gujarati: props.see[0]?.question_in_gujarati || "",
    english: props.see[0]?.question_in_english || "",
  });
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setText({
      hindi: props.see[0]?.question_in_hindi || "",
      gujarati: props.see[0]?.question_in_gujarati || "",
      english: props.see[0]?.question_in_english || "",
    });

    reset({
      gender: props.see[0]?.gender || "",
      part: props.see[0]?.part || "",
    });
  }, [props.see, reset]);

  const submittedData = (data) => {
    const finalData = {
      ...data,
      question_english: text.english,
      question_hindi: text.hindi,
      question_gujarati: text.gujarati,
    };

    console.log(finalData);
    props.handleApi(
      finalData.gender,
      finalData.question_gujarati,
      finalData.question_english,
      finalData.question_hindi,
      finalData.part,
      props.see[0]?.id
    );
  };

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
              <Box className="flex space-x-4">
                <FormControl className="w-1/2">
                  <FormLabel>{props.part} :-</FormLabel>
                  <Select
                    defaultValue={props.see[0]?.part}
                    className="w-full"
                    required
                    placeholder="Choose any one..."
                    name="part"
                    {...register("part")}
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </FormControl>

                <FormControl className="w-1/2">
                  <FormLabel>{props.label1} :-</FormLabel>
                  <Select
                    defaultValue={props.see[0]?.gender}
                    placeholder="Choose gender..."
                    required
                    name="gender"
                    {...register("gender")}
                  >
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="both">Both</Option>
                  </Select>
                </FormControl>
              </Box>

              <FormControl>
                <FormLabel>{props.label2} :-</FormLabel>
                <Box className="flex flex-col items-center w-full">
                  <ReactTransliterate
                    defaultValue={props.see[0]?.question_in_english}
                    name="question_english"
                    value={text.english}
                    lang="en"
                    onChangeText={(value) => {
                      setText((prev) => ({
                        ...prev,
                        english: value,
                      }));
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
                    defaultValue={props.see[0]?.question_in_hindi}
                    name="question_hindi"
                    value={text.hindi}
                    lang="hi"
                    onChangeText={(value) => {
                      setText((prev) => ({
                        ...prev,
                        hindi: value,
                      }));
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
                    defaultValue={props.see[0]?.question_in_gujarati}
                    name="question_gujarati"
                    value={text.gujarati}
                    lang="gu"
                    onChangeText={(value) => {
                      setText((prev) => ({
                        ...prev,
                        gujarati: value,
                      }));
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

export default EditQuestion;