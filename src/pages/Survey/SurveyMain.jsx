import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { CloseFullscreen } from "@mui/icons-material";

function SurveyMain() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);
  const [storeData, setStoreData] = useState({
    userDetails: [],
    healthProblem: [],
    weightGainQuestions: [],
  });

  const handleCallUserApi = async (question) => {
    console.log("Waah");
    console.log("Checking...", storeData);
    console.log("Question...", question);
    const formdata = new FormData();
    formdata.append(
      "survey_user[first_name]",
      storeData.userDetails?.firstname
    );
    formdata.append("survey_user[last_name]", storeData.userDetails?.lastname);
    formdata.append("survey_user[email]", storeData.userDetails?.email);
    formdata.append("survey_user[mobile_no]", storeData.userDetails?.mobile);
    formdata.append("survey_user[age]", storeData.userDetails?.age);
    formdata.append("survey_user[height]", storeData.userDetails?.height);
    formdata.append("survey_user[weight]", storeData.userDetails?.weight);
    formdata.append("survey_user[gender]", storeData.userDetails?.gender);
    formdata.append("survey_user[language]", storeData.userDetails?.language);
    formdata.append(
      "survey_user[fat_deposit_body_part]",
      storeData.userDetails?.selectedCheckboxes
    );
    formdata.append(
      "survey_user[user_weight_gain_reason]",
      storeData.userDetails?.question
    );
    await axios
      .post(`/api/v2/survey_users`, formdata)
      .then((res) => {
        console.log(res);
        setUserId(res.data.survey_user.id);
        console.log(res.data.survey_user.id);
        localStorage.setItem("survey_userr_id", res.data.survey_user.id);
      })
      .catch((err) => {
        console.log(err);
      });
    const formData = new FormData();
    formData.append(
      "survey_user_detail[helth_problem]",
      JSON.stringify(storeData.healthProblem)
    );
    formData.append("survey_user_detail[questions]", JSON.stringify(question));
    formData.append("survey_user_detail[survey_user_id]", userId);
    await axios
      .post(`/api/v2/survey_user_details`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(
        `/api/v2/survey_users/send_otp?survey_user_id=${localStorage.getItem(
          "survey_user_id"
        )}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Store Data: ", storeData);
  }, [storeData]);

  return (
    <div className="flex w-full items-center justify-center">
      <Outlet context={[storeData, setStoreData, handleCallUserApi]} />
    </div>
  );
}

export default SurveyMain;
