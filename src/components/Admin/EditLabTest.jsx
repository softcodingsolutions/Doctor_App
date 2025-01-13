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

function EditLabTest(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.test_name, d.gender, d.test_comments, props.see[0]?.id);
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
              <FormControl>
                <FormLabel>{props.test_name} </FormLabel>
                <Input
                  defaultValue={props.see[0]?.name}
                  placeholder="Name..."
                  name={`test_name`}
                  {...register(`test_name`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.gender} </FormLabel>
                <Select
                  defaultValue={props.see[0]?.gender}
                  placeholder="Choose gender..."
                  required
                  name={`gender`}
                  {...register(`gender`)}
                >
                  <Option value="female">Female</Option>
                  <Option value="male">Male</Option>
                  <Option value="both">Both</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{props.test_comments} </FormLabel>
                <Textarea
                  defaultValue={props.see[0]?.comments}
                  placeholder="Name..."
                  name={`test_comments`}
                  {...register(`test_comments`)}
                  autoFocus
                  minRows={3}
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

export default EditLabTest;
