import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import InsideLoader from "../../InsideLoader";
import { useOutletContext } from "react-router-dom";

function TreatmentLabTests() {
  const context = useOutletContext();
  const [getTests, setGetTests] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("userId");
  const [getUser, setGetUser] = useState([]);

  const handleGetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${user_id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetUser(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetTests = () => {
    axios
      .get("/api/v1/labtest_managements")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setGetTests(res.data?.lab_managements);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCheckboxes((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const handleSave = async () => {
    const selectedTests = selectedCheckboxes
      .map((id) => getTests.find((com) => com.id === Number(id)))
      .filter((com) => com);
    if (selectedTests.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Lab Test Selected",
        text: "Please select at least one test to save.",
      });
    }
    console.log("Selected Lab Test: ", selectedTests);

    const formData = new FormData();
    formData.append("user_labtest[labtest]", JSON.stringify(selectedTests));
    formData.append("user_labtest[user_id]", user_id);

    try {
      const response = await axios.post("/api/v1/user_labtests", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your lab test has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        context?.[2]();
        handleGetTests();
        handleGetUser();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetTests();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  const givenLabTestIds =
    getUser?.user_labtests?.[getUser?.user_labtests?.length - 1]?.labtest || [];

  console.log(givenLabTestIds);

  return (
    <div className="w-full p-2">
      <div className={`rounded-lg bg-card h-[89vh] bg-white`}>
        <div className="flex px-4 py-3 h-full flex-col space-y-3">
          <div className="flex gap-5 text-center items-center justify-between">
            <div className="font-[550] text-lg">
              No. of tests checked: {selectedCheckboxes?.length}
            </div>
          </div>
          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Select"
                  />
                  <ThComponent name="Test Name" />
                  <ThComponent name="Gender" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Comments"
                  />
                </tr>
              </thead>
              <tbody>
                {getTests.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Lab Tests Found!
                    </th>
                  </tr>
                ) : (
                  getTests.map((val) => {
                    const isGiven = givenLabTestIds.find(
                      (test) => test.id === val.id
                    );
                    return (
                      <tr
                        className={`${isGiven ? "bg-gray-400" : ""} w-full`}
                        key={val.id}
                      >
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <input
                            value={val.id}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            className="size-4"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              val.gender?.[0]?.toUpperCase() +
                              val.gender?.slice(1)
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.comments} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-[550] text-lg flex items-center invisible">
              Already Given Lab Tests -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
            <SaveTreatmentButtons function={handleSave} />{" "}
            <div className="font-[550] text-lg flex items-center">
              Already Given Lab Tests -{" "}
              <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TreatmentLabTests;
