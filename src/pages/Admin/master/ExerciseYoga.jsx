import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddNewExercise from "../../../components/Admin/AddNewExercise";
import axios from "axios";
import Swal from "sweetalert2";
import EditExercise from "../../../components/Admin/EditExercise";

function ExerciseYoga() {
  const [getExercise, setGetExercise] = useState([]);
  const [editExercise, setEditExercise] = useState([]);

  const handleGetExercise = () => {
    axios
      .get("/api/v1/exercises")
      .then((res) => {
        console.log(res.data);
        setGetExercise(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleAddExercise = (
    exercise_name,
    describe_eng,
    describe_hindi,
    describe_gujarati
  ) => {
    const formData = new FormData();
    formData.append("exercise[name]", exercise_name);
    formData.append("exercise[details]", describe_eng);
    formData.append("exercise[details_hindi]", describe_hindi);
    formData.append("exercise[details_gujarati]", describe_gujarati);
    axios
      .post("/api/v1/exercises", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your exercise has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetExercise();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleEditExercise = (val) => {
    setEditExercise(getExercise.filter((item) => item?.id === val));
  };

  const handleEditExerciseApi = async (
    exercise_name,
    describe_eng,
    describe_hindi,
    describe_gujarati,
    id
  ) => {
    const formData = new FormData();
    formData.append("exercise[name]", exercise_name);
    formData.append("exercise[details]", describe_eng);
    formData.append("exercise[details_hindi]", describe_hindi);
    formData.append("exercise[details_gujarati]", describe_gujarati);
    axios.put(`api/v1/exercises/${id}`, formData).then((res) => {
      console.log(res);
      handleGetExercise();
      if (res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated!",
          text: "Your exercise has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const deleteExercise = (val) => {
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
          .delete(`/api/v1/exercises/${val}`)
          .then((res) => {
            console.log(res);
            handleGetExercise();
            Swal.fire({
              title: "Deleted!",
              text: "Your exercise has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    });
  };

  useEffect(() => {
    handleGetExercise();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Exercise & Yoga List</div>
            <AddNewExercise
              handleApi={handleAddExercise}
              name="Add Exercise/Yoga"
              title="Add New Exercise/Yoga"
              exercise_name="Exercise/Yoga Name"
              exercise_describe_english="Details"
            />
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[rgb(31,41,55)] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="Exercise Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getExercise.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Exercise & Yoga Found!
                    </th>
                  </tr>
                ) : (
                  getExercise.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_hindi,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.details_gujarati,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditExercise
                            see={editExercise}
                            function={() => {
                              handleEditExercise(val.id);
                            }}
                            handleApi={handleEditExerciseApi}
                            title="Edit Exercise"
                            exercise_name="Exercise"
                            exercise_describe_english="Details"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteExercise(val.id)}
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseYoga;
