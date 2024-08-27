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
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddListFranchise(props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d);
    reset();
    setOpen(false);
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{props.title}</DialogTitle>
          <form onSubmit={handleSubmit(submittedData)}>
            <Stack spacing={3}>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.first_name} </FormLabel>
                  <Input
                    placeholder="First Name..."
                    name="first_name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    autoFocus
                  />
                  {errors.first_name && (
                    <Typography level="body2" color="danger">
                      {errors.first_name.message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>{props.last_name} </FormLabel>
                  <Input
                    placeholder="Last Name..."
                    name="last_name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.last_name && (
                    <Typography level="body2" color="danger">
                      {errors.last_name.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.email} </FormLabel>
                  <Input
                    type="email"
                    placeholder="Email..."
                    name="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <Typography level="body2" color="danger">
                      {errors.email.message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>{props.password} </FormLabel>
                  <Input
                    type="password"
                    placeholder="Password..."
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    autoFocus
                  />
                  {errors.password && (
                    <Typography level="body2" color="danger">
                      {errors.password.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box className="flex space-x-4">
                {props.role === "super_admin" && (
                  <FormControl className="w-1/2">
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
                  <FormLabel>{props.mobile} </FormLabel>
                  <Input
                    type="number"
                    placeholder="Mobile..."
                    name="mobile"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Mobile number must be exactly 10 digits",
                      },
                    })}
                  />
                  {errors.mobile && (
                    <Typography level="body2" color="danger">
                      {errors.mobile.message}
                    </Typography>
                  )}
                </FormControl>

                {props?.role === "doctor" && (
                  <FormControl>
                    <FormLabel>{props.city} </FormLabel>
                    <Input
                      placeholder="City..."
                      name="city"
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && (
                      <Typography level="body2" color="danger">
                        {errors.city.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Box>
              <Box className="flex space-x-4">
                {props?.role === "super_admin" && (
                  <FormControl>
                    <FormLabel>{props.city} </FormLabel>
                    <Input
                      placeholder="City..."
                      name="city"
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && (
                      <Typography level="body2" color="danger">
                        {errors.city.message}
                      </Typography>
                    )}
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>{props.state} </FormLabel>
                  <Input
                    placeholder="State..."
                    name="state"
                    {...register("state", { required: "State is required" })}
                  />
                  {errors.state && (
                    <Typography level="body2" color="danger">
                      {errors.state.message}
                    </Typography>
                  )}
                </FormControl>

                {props?.role === "doctor" && (
                  <FormControl>
                    <FormLabel>{props.pincode} </FormLabel>
                    <Input
                      type="number"
                      placeholder="Pincode..."
                      name="pincode"
                      {...register("pincode", {
                        required: "Pincode is required",
                      })}
                    />
                    {errors.pincode && (
                      <Typography level="body2" color="danger">
                        {errors.pincode.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Box>
              <Box className="flex space-x-4">
                <FormControl>
                  <FormLabel>{props.amount} </FormLabel>
                  <Input
                    type="number"
                    placeholder="Amount..."
                    name="amount"
                    {...register("amount", {
                      required: "Amount is required",
                      min: {
                        value: 0,
                        message: "Amount must be at least 0",
                      },
                    })}
                  />
                  {errors.amount && (
                    <Typography level="body2" color="danger">
                      {errors.amount.message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>{props.commission} </FormLabel>
                  <Input
                    type="number"
                    placeholder="In %..."
                    name="commission"
                    {...register("commission", {
                      required: "Commission is required",
                      min: {
                        value: 0,
                        message: "Commission must be at least 0",
                      },
                      max: {
                        value: 100,
                        message: "Commission must be at most 100",
                      },
                    })}
                  />
                  {errors.commission && (
                    <Typography level="body2" color="danger">
                      {errors.commission.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box className="flex w-full space-x-4">
                <FormControl className="w-1/2">
                  <FormLabel>{props.type_of_admin} </FormLabel>
                  <Select
                    required
                    placeholder="Admin Type..."
                    name="type_of_admin"
                    {...register("type_of_admin", {
                      required: "Admin type is required",
                    })}
                  >
                    <Option value="franchise">Franchise</Option>
                  </Select>
                  {errors.type_of_admin && (
                    <Typography level="body2" color="danger">
                      {errors.type_of_admin.message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="w-1/2">
                  <FormLabel>{props.possibility_group} </FormLabel>
                  <Select
                    required
                    placeholder="Possibility Group..."
                    name="possibility_group"
                    {...register("possibility_group", {
                      required: "Possibility group is required",
                    })}
                  >
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                  {errors.possibility_group && (
                    <Typography level="body2" color="danger">
                      {errors.possibility_group.message}
                    </Typography>
                  )}
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
