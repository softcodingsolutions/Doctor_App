import { useState } from "react";
import { Button, Modal, ModalClose, ModalDialog } from "@mui/joy";
import ThComponent from "../ThComponent";
import TdComponent from "../TdComponent";
import { useNavigate } from "react-router-dom";

function ViewFranchiseDetails(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`../patients/user-diagnosis/profile`);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: "#013f9d",
          "&:hover": {
            backgroundColor: "#013f9d",
            color: "#ffffff",
          },
        }}
        color="neutral"
        onClick={() => {
          setOpen(true);
          props?.function();
        }}
      >
        View Details
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <table>
            <thead className="uppercase ">
              <tr className="bg-[#1F2937] text-white rounded-md">
                <ThComponent
                  moreClasses={"rounded-tl-md rounded-bl-md"}
                  name="Case No."
                />
                <ThComponent name="Name" />
                <ThComponent name="Email" />
                <ThComponent name="Phone" />
                <ThComponent name="City" />
                <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
              </tr>
            </thead>
            <tbody>
              {props?.users?.length > 0 ? (
                props?.users?.map((val) => {
                  return (
                    <tr key={val.id}>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center text-lg">
                          {val.case_number}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50 ">
                        <TdComponent
                          things={
                            val.first_name[0]?.toUpperCase() +
                            val.first_name?.slice(1) +
                            " " +
                            val.last_name[0]?.toUpperCase() +
                            val.last_name?.slice(1)
                          }
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.email} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.phone_number} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent
                          things={
                            val.personal_detail?.city[0]?.toUpperCase() +
                            val.personal_detail?.city?.slice(1)
                          }
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent
                          things={
                            <button
                              onClick={() => handleDiagnosis(val.id)}
                              className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-green-600 hover:text-white"
                            >
                              Diagnosis
                            </button>
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th
                    className="uppercase tracking-wide font-medium pt-[5rem] text-lg"
                    colSpan={8}
                  >
                    No Users Found!
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default ViewFranchiseDetails;
