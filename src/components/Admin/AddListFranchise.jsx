import { Add } from "@mui/icons-material";
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
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddListFranchise(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const submittedData = (d) => {
    props.handleApi(d);
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
                <FormControl>
                  <FormLabel>{props.first_name} :-</FormLabel>
                  <Input
                    placeholder="First Name..."
                    name={`first_name`}
                    {...register(`first_name`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.last_name} :-</FormLabel>
                  <Input
                    placeholder="Last Name..."
                    name={`last_name`}
                    {...register(`last_name`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.email} :-</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email..."
                    name={`email`}
                    {...register(`email`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.password} :-</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password..."
                    name={`password`}
                    {...register(`password`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.mobile} :-</FormLabel>
                  <Input
                    type="number"
                    placeholder="Mobile..."
                    name={`mobile`}
                    {...register(`mobile`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.city} :-</FormLabel>
                  <Input
                    placeholder="City..."
                    name={`city`}
                    {...register(`city`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.state} :-</FormLabel>
                  <Input
                    placeholder="State..."
                    name={`state`}
                    {...register(`state`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.pincode} :-</FormLabel>
                  <Input
                    type="number"
                    placeholder="Pincode..."
                    name={`pincode`}
                    {...register(`pincode`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.amount} :-</FormLabel>
                  <Input
                    type="number"
                    placeholder="Amount..."
                    name={`amount`}
                    {...register(`amount`)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{props.commission} :-</FormLabel>
                  <Input
                    type="number"
                    placeholder="In %..."
                    name={`commission`}
                    {...register(`commission`)}
                    autoFocus
                    required
                  />
                </FormControl>
              </Box>
              <Box className="flex w-full space-x-4">
                <FormControl className="w-1/2">
                  <FormLabel>{props.type_of_admin} :-</FormLabel>
                  <Select
                    required
                    placeholder="Admin Type..."
                    name={`type_of_admin`}
                    {...register(`type_of_admin`)}
                  >
                    <Option value="super_admin">Super Admin</Option>
                    <Option value="franchise">Franchise</Option>
                  </Select>
                </FormControl>
                <FormControl className="w-1/2">
                  <FormLabel>{props.possibility_group} :-</FormLabel>
                  <Select
                    required
                    placeholder="Possibility Group..."
                    name={`possibility_group`}
                    {...register(`possibility_group`)}
                  >
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </FormControl>
              </Box>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddListFranchise;
