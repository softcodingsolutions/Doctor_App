import { useState,useEffect } from "react";
import { Button, Modal, ModalClose, ModalDialog } from "@mui/joy";
import ThComponent from "../ThComponent";
import TdComponent from "../TdComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewFranchiseDetails() {
  const franchiseId = localStorage.getItem("viewDetails")
  const navigate = useNavigate();
  const [getFranchiseUsers, setGetFranchiseUsers] = useState([]);

  const handleDiagnosis = (val) => {
    localStorage.setItem("userId", val);
    navigate(`../patients/user-diagnosis/profile`);
  };

  const handleGetFranchiseUsers = () => {
    axios
      .get(`/api/v1/users/find_doc_franchise_users?id=${franchiseId}`)
      .then((res) => {
        console.log("Franchise Users", res?.data?.users);
        setGetFranchiseUsers(res?.data?.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect (() =>{
    handleGetFranchiseUsers()
  },[])

  return (
    <>
      <div>
        <h1>Franchise User Details</h1>
      </div>
    </>
  );
}

export default ViewFranchiseDetails;
