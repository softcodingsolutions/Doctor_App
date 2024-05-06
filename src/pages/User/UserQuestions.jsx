import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../schemas/UserDetailsSchema";
import NextPageButton from "../../components/Admin/NextPageButton";
import PrevPageButton from "../../components/Admin/PrevPageButton";

function UserQuestions() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const submittedData = (d) => {
    console.log(d);
  }

  return (
    <div className="flex w-full p-4">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" flex-grow space-y-2 overflow-auto flex rounded-lg bg-card h-[94vh] bg-white flex-wrap content-start p-2">
        <div className="text-xl font-semibold">General Details :-</div>
        <div className="w-full flex flex-col justify-between p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[94%]">
          <form
            onSubmit={handleSubmit(submittedData)}
            className="w-full h-fit flex flex-col justify-center items-center"
            method="post"
          >
            <div className="flex space-x-2 items-center">
              <div>First Name:</div>
              <input type="text" className="border w-full rounded-sm p-1" />
            </div>
            <div className="flex space-x-2 items-center">
              <div>Last Name:</div>
              <input type="text" required className="border rounded-sm p-1" />
            </div>
            <div className="flex space-x-2 items-center">
              <div>Email:</div>
              <input type="email" required className="border rounded-sm p-1" />
            </div>
          </form>
          <div className="flex justify-end">
            <NextPageButton to="./current-diet" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserQuestions;
