import Consulting from "./Consulting";

export default function Oldcase(props) {
  return (
    <div>
      <Consulting
        doctor={props.doctor}
        user={props.user}
        name={props.name}
        number={props.number}
        email={props.email}
        lastName={props.lastName}
      />
    </div>
  );
}
