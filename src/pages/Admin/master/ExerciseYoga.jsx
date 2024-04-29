import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddNewExercise from "../../../components/Admin/AddNewExercise";
import axios from "axios";
import Swal from "sweetalert2";

function ExerciseYoga() {
  const [getExercise, setGetExercise] = useState([]);

  const handleGetExercise = () => {
    axios
      .get("/api/v1/exercises")
      .then((res) => {
        console.log(res.data);
        setGetExercise(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddExercise = (exercise_describe, exercise_name) => {
    const formData = new FormData();
    formData.append("exercise[name]", exercise_name);
    formData.append("exercise[details]", exercise_describe);
    axios
      .post("/api/v1/exercises", formData)
      .then((res) => {
        console.log(res.data);
        handleGetExercise();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editExercise = async (val) => {
    const see = getExercise.filter((item) => item?.id === val);
    console.log(see);
    const { value: formValues } = await Swal.fire({
      title: "Edit the exercise",
      html: `
            <div class="flex flex-col items-center justify-center text-black">
                <div>Exercise Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.name}"/></div>
                <div class="flex items-center">Exercise Description: <textarea rows="5" cols="30" type="text" id="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">
                ${see[0]?.details}</textarea>
              </div>
            </div> 
            `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const formData = new FormData();
      formData.append("exercise[name]", formValues[0]);
      formData.append("exercise[details]", formValues[1]);
      axios.put(`api/v1/exercises/${val}`, formData).then((res) => {
        console.log(res);
        handleGetExercise();
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your diet has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
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
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Exercise & Yoga List</div>
              <div className="flex-grow" />
              <AddNewExercise
                handleApi={handleAddExercise}
                name="Add Exercise/Yoga"
                title="Add New Exercise/Yoga"
                exercise_name="Exercise/Yoga Name"
                exercise_describe="Details"
              />
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[rgb(31,41,55)] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="Exercise Name" />
                  <ThComponent name="Exercise Details" />
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
                          <TdComponent things={val.details} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => editExercise(val.id)}
                                className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"
                              >
                                <MdEdit size={20} />
                              </button>
                            }
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
