import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

function UserQuestions() {
    const context = useOutletContext(); 
  return (
    <div className="flex w-full p-3">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <Outlet context={context}/>
    </div>
  );
}

export default UserQuestions;
