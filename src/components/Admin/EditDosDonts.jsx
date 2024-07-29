import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  //   Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { ReactTransliterate } from "react-transliterate";

function EditDosDonts(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    hindi: props.see[0]?.details_in_hindi || "",
    gujarati: props.see[0]?.details_in_gujarati || "",
    english: props.see[0]?.details_in_english || "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.comments,
      d.do_dont,
      text.hindi,
      text.gujarati,
      text.english,
      props.see[0]?.id,
      d.doctor_id
    );
  };

  useEffect(() => {
    setText({
      hindi: props.see[0]?.details_in_hindi || "",
      gujarati: props.see[0]?.details_in_gujarati || "",
      english: props.see[0]?.details_in_english || "",
    });

    reset({
      do_dont: props.see[0]?.category || "",
    });
  }, [props.see, reset]);

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
              <FormControl>
                <FormLabel>{props.do_dont} :-</FormLabel>
                <Select
                  defaultValue={props.see[0]?.category}
                  className="w-full"
                  required
                  placeholder="Choose any one..."
                  name={`do_dont`}
                  {...register(`do_dont`)}
                >
                  <Option value="do">Do</Option>
                  <Option value="dont">Don't</Option>
                </Select>
              </FormControl>

              {props?.role === "super_admin" && (
                <FormControl>
                  <FormLabel>Select Doctor :-</FormLabel>
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

              {/* 
              <FormControl>
                <FormLabel>{props.comments} :-</FormLabel>
                <Input
                  defaultValue={props.see[0]?.comments}
                  placeholder="Comments..."
                  name={`comments`}
                  {...register(`comments`)}
                  autoFocus
                />
              </FormControl> */}

              <FormControl>
                <FormLabel>{props.details} :-</FormLabel>
                <Box className="flex flex-col items-center w-full">
                  <ReactTransliterate
                    defaultValue={props.see[0]?.details_in_english}
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
                    defaultValue={props.see[0]?.details_in_hindi}
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
                    defaultValue={props.see[0]?.details_in_gujarati}
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

export default EditDosDonts;
