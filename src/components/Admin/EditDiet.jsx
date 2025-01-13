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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import JoditEditor from "jodit-react";

function EditDiet(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [text, setText] = useState({
    hindi: props.see[0]?.chart_hindi || "",
    gujarati: props.see[0]?.chart_gujarati || "",
    english: props.see[0]?.chart_english || "",
  });

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.diet_code,
      d.diet_name,
      text.english,
      text.hindi,
      text.gujarati,
      props.see[0]?.id,
      d.doctor_id
    );
  };

  useEffect(() => {
    setText({
      hindi: props.see[0]?.chart_hindi || "",
      gujarati: props.see[0]?.chart_gujarati || "",
      english: props.see[0]?.chart_english || "",
    });
  }, [props.see]);

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
            overflowY: "auto",
            maxHeight: "100vh",
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
            <Stack spacing={2} sx={{ width: "1000px" }}>
              <FormControl>
                <FormLabel>{props.diet_code} </FormLabel>
                <Input
                  defaultValue={props.see[0]?.code}
                  placeholder="Code..."
                  name={`diet_code`}
                  {...register(`diet_code`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.diet_name} </FormLabel>
                <Input
                  defaultValue={props.see[0]?.name}
                  placeholder="Name..."
                  name={`diet_name`}
                  {...register(`diet_name`)}
                  required
                />
              </FormControl>

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
                <FormLabel>{props.diet_describe_english} </FormLabel>
                <Box className="flex flex-col items-center w-full gap-8">
                  <JoditEditor
                    value={text.english}
                    config={{
                      placeholder: "Describe in English...",
                    }}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        english: value,
                      }));
                    }}
                  />

                  <JoditEditor
                    value={text.hindi}
                    config={{
                      placeholder: "Describe in Hindi...",
                    }}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        hindi: value,
                      }));
                    }}
                  />

                  <JoditEditor
                    value={text.gujarati}
                    config={{
                      placeholder: "Describe in Gujarati...",
                    }}
                    onChange={(value) => {
                      setText((prev) => ({
                        ...prev,
                        gujarati: value,
                      }));
                    }}
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

export default EditDiet;
