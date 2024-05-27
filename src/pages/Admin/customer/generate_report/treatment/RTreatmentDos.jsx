import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

function RTreatmentDos() {
  const context = useOutletContext();
  const [getPredictionNutrition, setGetPredictionNutrition] = useState([]);
  const [getNutrition, setGetNutrition] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleGetNutrition = () => {
    if (context[0]) {
      const data = context[1].filter((pack) => {
        return context[0][0] === pack.package.weight_reason;
      });
      console.log("Predicted Nutritions:", data[0]);
      setGetPredictionNutrition(data[0]?.package?.nutrition);
    }

    axios
      .get("/api/v1/nutritions")
      .then((res) => {
        console.log("All the Nutritions:", res.data);
        setGetNutrition(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
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
    const selectedNutrition = selectedCheckboxes
      .map((id) => getNutrition.find((med) => med.id === Number(id)))
      .filter((med) => med);

    if (selectedNutrition.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Nutrition Selected",
        text: "Please select at least one nutrition to save.",
      });
    }

    console.log("Selected Nutrition: ", selectedNutrition);
    setShowCheckboxes(false);
    const formData = new FormData();
    formData.append(
      "package[weight_reason]",
      context[0] === "null" ? null : context[0]
    );
    formData.append("package[medicines]", JSON.stringify(selectedNutrition));
  };

  useEffect(() => {
    const preSelectedNutrition = getPredictionNutrition.map((val) =>
      val.id.toString()
    );
    console.log("pre", preSelectedNutrition);
    setSelectedCheckboxes(preSelectedNutrition);
  }, [getPredictionNutrition]);

  useEffect(() => {
    handleGetNutrition();
  }, [context]);

  return <div>RTreatmentDos</div>;
}

export default RTreatmentDos;
