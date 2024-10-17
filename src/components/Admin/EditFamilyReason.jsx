import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { ReactTransliterate } from "react-transliterate";

function EditFamilyReason(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({
    hindi: "",
    gujarati: "",
    english: "",
  });

  useEffect(() => {
    if (props.see && props.see[0]) {
      setText({
        hindi: props.see[0]?.details_in_hindi || "",
        gujarati: props.see[0]?.details_in_gujarati || "",
        english: props.see[0]?.details_in_english || "",
      });
    }
  }, [props.see]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      text.hindi,
      text.gujarati,
      text.english,
      props.see[0]?.id,
      d.doctor_id
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
                <FormLabel>{props.details} </FormLabel>
                <Box className="flex flex-col w-full">
                  <ReactTransliterate
                    name="question_english"
                    {...register("question_english")}
                    value={text.english}
                    lang="en"
                    onChangeText={(value) => {
                      setText((prev) => ({ ...prev, english: value }));
                    }}
                    renderComponent={(props) => (
                      <textarea {...props} placeholder="In English..." />
                    )}
                    className="p-1 border border-gray-400 rounded-sm w-full"
                    rows={4}
                    cols={30}
                    required
                  />

                  <ReactTransliterate
                    name="question_hindi"
                    {...register("question_hindi")}
                    value={text.hindi}
                    lang="hi"
                    onChangeText={(value) => {
                      setText((prev) => ({ ...prev, hindi: value }));
                    }}
                    renderComponent={(props) => (
                      <textarea {...props} placeholder="In Hindi..." />
                    )}
                    className="p-1 border border-gray-400 rounded-sm w-full"
                    rows={4}
                    cols={30}
                    required
                  />

                  <ReactTransliterate
                    name="question_gujarati"
                    {...register("question_gujarati")}
                    value={text.gujarati}
                    lang="gu"
                    onChangeText={(value) => {
                      setText((prev) => ({ ...prev, gujarati: value }));
                    }}
                    renderComponent={(props) => (
                      <textarea {...props} placeholder="In Gujarati..." />
                    )}
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
}

export default EditFamilyReason;
