import {
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
  Textarea,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

function EditWeightReason(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(
      d.reason_name,
      d.reason_for,
      d.reason_comments,
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
              <FormControl>
                <FormLabel>{props.reason_name} :-</FormLabel>
                <Input
                  defaultValue={props.see[0]?.name}
                  placeholder="Name..."
                  name={`reason_name`}
                  {...register(`reason_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl className="w-1/2">
                <FormLabel>{props.reason_for} :-</FormLabel>
                <Select
                  sx={{ width: "200%" }}
                  required
                  placeholder="Choose gender..."
                  name={`reason_for`}
                  defaultValue={props.see[0]?.for}
                  {...register(`reason_for`)}
                >
                  <Option value="female">Female</Option>
                  <Option value="male">Male</Option>
                  <Option value="both">Both</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{props.reason_comments} :-</FormLabel>
                <Textarea
                  defaultValue={props.see[0]?.comments}
                  placeholder="Coments..."
                  name={`reason_comments`}
                  {...register(`reason_comments`)}
                  autoFocus
                  minRows={5}
                  required
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default EditWeightReason;