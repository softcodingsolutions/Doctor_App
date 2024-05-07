import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { UserSchema } from "../../../schemas/UserDetailsSchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function QueGeneralDetails() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  return (
    <div className="w-full flex flex-col justify-between p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[90%]">
      <form>
        <div className="flex space-x-2">
          <label>Name:</label>
          <input type="text" className="border w-full" />
        </div>
      </form>
      <button className="border p-1 rounded-md w-fit">Next</button>
    </div>
  );
}

export default QueGeneralDetails;
