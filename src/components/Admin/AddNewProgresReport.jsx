import React, { useEffect, useState } from "react";
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
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewProgresReport(props) {
  const [open, setOpen] = useState(false);
  const [getWeight, setGetWeight] = useState([]);
  const [getPackage, setGetPackage] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleGetWeight = () => {
    axios
      .get("/api/v1/weight_reasons")
      .then((res) => {
        console.log(res.data);
        setGetWeight(res.data?.weight_reasons);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetPackages = async (e) => {
    await axios
      .get(`/api/v1/treatment_packages?weight_reason=${e.target.innerHTML}`)
      .then((res) => {
        console.log(res.data?.treatment_packages);
        setGetPackage(res.data?.treatment_packages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.package_id);
    reset();
  };

  useEffect(() => {
    handleGetWeight();
  }, []);

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
              <FormControl>
                <FormLabel>{props.progress_weight} :-</FormLabel>
                <Input
                  placeholder="In kgs..."
                  name={`progress_weight`}
                  {...register(`progress_weight`)}
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>{props.progress_date} :-</FormLabel>
                <input
                  className="border border-gray-300 p-1.5 bg-[#fafafa] rounded-md shadow-sm"
                  type="date"
                  name={`progress_date`}
                  {...register(`progress_date`)}
                  required
                />
              </FormControl>

              <Box className="flex space-x-4 items-center">
                <FormControl>
                  <FormLabel>{props.weight_reason} :-</FormLabel>
                  <Select
                    className="w-full"
                    required
                    placeholder="Choose any one..."
                    name={`weight_reason`}
                    {...register(`weight_reason`)}
                  >
                    {getWeight.map((res) => {
                      return (
                        <Option
                          key={res.id}
                          onClick={handleGetPackages}
                          value={res.name}
                        >
                          {res.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormControl>

                {getPackage.length > 0 && (
                  <FormControl>
                    <FormLabel>Select Packages:-</FormLabel>
                    <Select
                      className="w-full"
                      required
                      placeholder="Choose any one..."
                      name={`package_id`}
                      {...register(`package_id`)}
                    >
                      {getPackage?.map((res) => {
                        return (
                          <Option key={res.id} value={res.id}>
                            {res.package_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {getPackage.length === 0 && (
                  <FormControl>
                    <FormLabel>No Packages Found!</FormLabel>
                  </FormControl>
                )}
              </Box>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewProgresReport;
