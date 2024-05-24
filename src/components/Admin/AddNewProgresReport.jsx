import React, { useEffect, useState } from "react";
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
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewProgresReport(props) {
  const [open, setOpen] = useState(false);
  const [getPackages, setGetPackages] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleGetPackages = () => {
    axios
      .get("/api/v1/user_packages")
      .then((res) => {
        console.log(res.data);
        setGetPackages(res.data?.user_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const submittedData = (d) => {
    console.log(d);
    props.handleApi(d.progress_weight, d.progress_date, d.progress_package);
    reset();
  };

  useEffect(() => {
    handleGetPackages();
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

              <FormControl>
                <FormLabel>{props.progress_package} :-</FormLabel>
                <Select
                  className="w-full"
                  required
                  placeholder="Choose any one..."
                  name={`progress_package`}
                  {...register(`progress_package`)}
                >
                  {getPackages.map((res) => {
                    return <Option key={res.id} value={res.package_name}>{res.package_name}</Option>;
                  })}
                </Select>
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewProgresReport;
