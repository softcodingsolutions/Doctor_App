import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import AddDosDonts from "../../../components/Admin/AddDosDonts";
import axios from "axios";
import Swal from "sweetalert2";
import EditDosDonts from "../../../components/Admin/EditDosDonts";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function DosDonts() {
  const [getDos, setGetDos] = useState([]);
  const [getDonts, setGetDonts] = useState([]);
  const [editDosDonts, setEditDosDonts] = useState([]);
  const [showDos, setShowDos] = useState(true);
  const [showDonts, setShowDonts] = useState(false);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);
  
  const handleGetDos = () => {
    axios
      .get("/api/v1/avoid_and_adds")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(
                "Dos",
                res.data?.avoid_and_adds.filter((res) => res.category === "do")
              );
              setGetDos(
                res.data?.avoid_and_adds.filter((res) => res.category === "do")
              );
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Dos: ",
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "do" && res.user_id == getDoctorId
                )
              );
              setGetDos(
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "do" && res.user_id == getDoctorId
                )
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Dos: ",
            res.data?.avoid_and_adds.filter(
              (res) => res.category === "do" && res.user_id == main_id
            )
          );
          setGetDos(
            res.data?.avoid_and_adds.filter(
              (res) => res.category === "do" && res.user_id == main_id
            )
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetDonts = () => {
    axios
      .get("/api/v1/avoid_and_adds")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(
                "Dos",
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "dont"
                )
              );
              setGetDonts(
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "dont"
                )
              );
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Dont: ",
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "dont" && res.user_id == getDoctorId
                )
              );
              setGetDonts(
                res.data?.avoid_and_adds.filter(
                  (res) => res.category === "dont" && res.user_id == getDoctorId
                )
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Dont: ",
            res.data?.avoid_and_adds.filter(
              (res) => res.category === "dont" && res.user_id == main_id
            )
          );
          setGetDonts(
            res.data?.avoid_and_adds.filter(
              (res) => res.category === "dont" && res.user_id == main_id
            )
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(
          "Doctors: ",
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddDosDonts = (
    comments,
    do_dont,
    hindi,
    gujarati,
    english,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("avoid_and_add[category]", do_dont);
      formData.append("avoid_and_add[comments]", comments);
      formData.append("avoid_and_add[details_in_english]", english);
      formData.append("avoid_and_add[details_in_hindi]", hindi);
      formData.append("avoid_and_add[details_in_gujarati]", gujarati);
      formData.append("avoid_and_add[user_id]", main_id);
      axios
        .post("api/v1/avoid_and_adds", formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your ${showDos ? "Dos" : "Don'ts"}  has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          showDos ? handleGetDos() : handleGetDonts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } else {
      formData.append("avoid_and_add[category]", do_dont);
      formData.append("avoid_and_add[comments]", comments);
      formData.append("avoid_and_add[details_in_english]", english);
      formData.append("avoid_and_add[details_in_hindi]", hindi);
      formData.append("avoid_and_add[details_in_gujarati]", gujarati);
      formData.append("avoid_and_add[user_id]", doc_id);
      axios
        .post("api/v1/avoid_and_adds", formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your ${showDos ? "Dos" : "Don'ts"}  has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          showDos ? handleGetDos() : handleGetDonts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleEditDosDonts = (val, cat) => {
    console.log(val);
    if (
      cat == "do"
        ? setEditDosDonts(getDos.filter((item) => item?.id === val))
        : setEditDosDonts(getDonts.filter((item) => item?.id === val))
    );
  };

  const handleEditDosDontsApi = (
    comments,
    do_dont,
    hindi,
    gujarati,
    english,
    id,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("avoid_and_add[category]", do_dont);
      formData.append("avoid_and_add[comments]", comments);
      formData.append("avoid_and_add[details_in_english]", english);
      formData.append("avoid_and_add[details_in_hindi]", hindi);
      formData.append("avoid_and_add[details_in_gujarati]", gujarati);
      formData.append("avoid_and_add[user_id]", main_id);
      axios
        .put(`api/v1/avoid_and_adds/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your ${showDos ? "Dos" : "Don'ts"}  has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          showDos ? handleGetDos() : handleGetDonts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } else {
      formData.append("avoid_and_add[category]", do_dont);
      formData.append("avoid_and_add[comments]", comments);
      formData.append("avoid_and_add[details_in_english]", english);
      formData.append("avoid_and_add[details_in_hindi]", hindi);
      formData.append("avoid_and_add[details_in_gujarati]", gujarati);
      formData.append("avoid_and_add[user_id]", doc_id);
      axios
        .put(`api/v1/avoid_and_adds/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your ${showDos ? "Dos" : "Don'ts"}  has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          showDos ? handleGetDos() : handleGetDonts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const deleteDosDonts = (val) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v1/avoid_and_adds/${val}`)
          .then((res) => {
            console.log(res);
            showDos ? handleGetDos() : handleGetDonts();
            Swal.fire({
              title: "Deleted!",
              text: `Your ${showDos ? "Dos" : "Don'ts"} has been deleted.`,
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  useEffect(() => {
    handleGetDoctors();
    showDos ? handleGetDos() : handleGetDonts();
  }, [showDos, showDonts, getDoctorId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Do/Don't List</div>
            <div className="space-x-1">
              <button
                onClick={() => {
                  setShowDonts(false);
                  setShowDos(true);
                }}
                className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                  showDos ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105 border-x-gray-300`}
              >
                Dos
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  setShowDos(false);
                  setShowDonts(true);
                }}
                className={`px-3 py-1.5 rounded-md ${
                  showDonts ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                } hover:scale-105  border-x-gray-300 border-[1.5px]`}
              >
                Don'ts
              </button>
            </div>
            <div className="flex gap-3">
              <AddDosDonts
                handleApi={handleAddDosDonts}
                name="Add Do/Don't"
                title="Add New Do/Don't"
                do_dont="Do/Don't"
                details="Details"
                comments="Comments"
                role={role}
                doctors={getDoctors}
              />
              {role === "super_admin" && (
                <Select
                  required
                  defaultValue={"all"}
                  placeholder="Select"
                  value={getDoctorId}
                  onChange={(e, newValue) => setGetDoctorId(newValue)}
                >
                  <Option key={"all"} value="all">
                    All
                  </Option>
                  {getDoctors?.map((res) => {
                    return (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {showDos ? (
                  getDos.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Dos Found!
                      </th>
                    </tr>
                  ) : (
                    getDos.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">
                              {index + 1 }
                            </div>{" "}
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_english} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_hindi} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_gujarati} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <EditDosDonts
                              see={editDosDonts}
                              function={() => {
                                handleEditDosDonts(val.id, val.category);
                              }}
                              handleApi={handleEditDosDontsApi}
                              title="Edit Do/Don't"
                              role={role}
                              doctors={getDoctors}
                              do_dont="Do/Don't"
                              details="Details"
                              comments="Comments"
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => deleteDosDonts(val.id)}
                                  className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white"
                                >
                                  <MdDelete size={20} />
                                </button>
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : null}
                {showDonts ? (
                  getDonts.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Don'ts Found!
                      </th>
                    </tr>
                  ) : (
                    getDonts.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">
                              {index + 1 }
                            </div>{" "}
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_english} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_hindi} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.details_in_gujarati} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <EditDosDonts
                              see={editDosDonts}
                              function={() => {
                                handleEditDosDonts(val.id, val.category);
                              }}
                              handleApi={handleEditDosDontsApi}
                              title="Edit Do/Don't"
                              do_dont="Do/Don't"
                              details="Details"
                              role={role}
                              doctors={getDoctors}
                              comments="Comments"
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => deleteDosDonts(val.id)}
                                  className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white"
                                >
                                  <MdDelete size={20} />
                                </button>
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : null}
              </tbody>
            </table>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default DosDonts;
