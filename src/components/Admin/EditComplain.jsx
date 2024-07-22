import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Textarea,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

function EditComplain(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.complain_details, props.see[0]?.id);
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
                <FormLabel>{props.complain_details} :-</FormLabel>
                <Textarea
                  defaultValue={props.see[0]?.details}
                  placeholder="Details..."
                  name={`complain_details`}
                  {...register(`complain_details`)}
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

export default EditComplain;
