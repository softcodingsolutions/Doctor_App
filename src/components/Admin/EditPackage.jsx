import React, { useState } from "react";
import {
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
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

function EditPackage(props) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.package_name, d.package_days, d.price, props.see[0]?.id);
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
                <FormLabel>{props.package_name} :-</FormLabel>
                <Input
                  defaultValue={props.see[0]?.package_name}
                  placeholder="Name..."
                  name={`package_name`}
                  {...register(`package_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.package_days} :-</FormLabel>
                <Input
                  defaultValue={props.see[0]?.no_of_days}
                  placeholder="No. of days"
                  name={`package_days`}
                  {...register(`package_days`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.price} :-</FormLabel>
                <Input
                  defaultValue={props.see[0]?.package_price}
                  placeholder="₹₹₹"
                  name={`price`}
                  {...register(`price`)}
                  autoFocus
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

export default EditPackage;
