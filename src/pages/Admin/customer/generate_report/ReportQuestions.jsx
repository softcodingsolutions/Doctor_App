import { useState, useEffect } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function ReportQuestions() {
  const context = useOutletContext();
  const [showPart1, setShowPart1] = useState([]);
  const [showPart2, setShowPart2] = useState(false);
  const role = localStorage.getItem("role");
  const [show, setShow] = useState(true);
  const id = localStorage.getItem("userId");

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        setShowPart1(
          res.data?.user?.personal_detail?.user_selected_questions_one
        );
        setShowPart2(
          res.data?.user?.personal_detail?.user_selected_questions_two
        );
        if (res.data?.user?.creator === "doctor") {
          localStorage.setItem("doctor_id", res.data?.user.created_by_id);
          setLoading(false);
        } else if (res.data?.user?.creator === "franchise") {
          axios
            .get(`/api/v2/users/search?id=${res.data?.user?.created_by_id}`)
            .then((res) => {
              console.log(
                "User created by franchise's doctor: ",
                res.data?.user
              );

              localStorage.setItem("doctor_id", res.data?.user?.created_by_id);
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  return (
    <div className="w-full p-2">
      <div
        className={`rounded-lg bg-card ${
          role === "patient" ? "h-[85vh]" : "h-[89vh]"
        } bg-white`}
      >
        <div className="flex items-center justify-between mb-2 p-2">
          <span className="font-semibold text-xl">Questions List</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShow(true)}
              className={`p-2 border-2 rounded-md ${
                show ? "bg-gray-700 text-white" : "bg-gray-50"
              } hover:scale-105 border-gray-300`}
            >
              Part 1
            </button>
            <button
              onClick={() => setShow(false)}
              className={`p-2 border-2 rounded-md ${
                !show ? "bg-gray-700 text-white" : "bg-gray-50"
              } hover:scale-105 border-gray-300`}
            >
              Part 2
            </button>
          </div>
        </div>
        <table className="w-full">
          <tbody>
            {show ? (
              showPart1.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-4 text-sm font-medium"
                  >
                    No Questions found in Part 1!
                  </td>
                </tr>
              ) : (
                showPart1.map((val, index) => (
                  <tr key={val.id}>
                    <td className="py-2 px-4 border-b border-gray-50 text-center text-2xl">
                      *
                    </td>
                    <td className="py-3 px-4 border-b border-gray-50 text-sm">
                      <TdComponent things={val} />
                    </td>
                  </tr>
                ))
              )
            ) : showPart2.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-4 text-sm font-medium"
                >
                  No Questions found in Part 2!
                </td>
              </tr>
            ) : (
              showPart2.map((val, index) => (
                <tr key={val.id}>
                  <td className="py-2 px-4 border-b border-gray-50 text-center text-sm">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-50 text-sm">
                    <TdComponent things={val} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportQuestions;
