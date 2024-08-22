import { useState } from "react";
import Consulting from "./Consulting";

export default function Oldcase(props) {
  const [choice, setChoice] = useState("consulting");

  return (
    <div>
      <form className="text-lg">
        
        <div>
          {choice === "consulting" && (
            <Consulting doctor={props.doctor} user={props.user} name={props.name} number={props.number} email={props.email}/>
          )}
        </div>
      </form>
    </div>
  );
}
