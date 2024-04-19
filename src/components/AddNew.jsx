import React from "react";
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
import { Textarea } from "@mui/joy";
import { useForm } from "react-hook-form";

function AddNew(props) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.gender, d.Question, d.Language, d.Part);
    reset();
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
          <DialogTitle>{props.title}</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(submittedData)(event);
              setOpen(false);
            }}
          >
            <Stack spacing={3}>
              {props.part && (
                <FormControl>
                  <FormLabel>{props.part} :-</FormLabel>
                  <Select
                    placeholder="Choose any one..."
                    name={`${props.part}`}
                    {...register(`${props.part}`)}
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </FormControl>
              )}
              {props.label1 && (
                <FormControl>
                  <FormLabel>{props.label1} :-</FormLabel>
                  <Select
                    placeholder="Choose for whom..."
                    name={`${props.gender}`}
                    {...register(`${props.gender}`)}
                  >
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="both">Both</Option>
                  </Select>
                </FormControl>
              )}
              {props.language && (
                <FormControl>
                  <FormLabel>{props.language} :-</FormLabel>
                  <Select
                    placeholder="Choose one language..."
                    name={`${props.language}`}
                    {...register(`${props.language}`)}
                  >
                    <Option value="gujarati">Gujarati</Option>
                    <Option value="hindi">Hindi</Option>
                    <Option value="english">English</Option>
                  </Select>
                </FormControl>
              )}
              {props.label2 && (
                <FormControl>
                  <FormLabel>{props.label2} :-</FormLabel>
                  <Textarea
                    placeholder="Write something..."
                    name={`${props.label2}`}
                    {...register(`${props.label2}`)}
                    minRows={5}
                    required
                  />
                </FormControl>
              )}
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNew;
