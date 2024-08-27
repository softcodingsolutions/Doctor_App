import Consulting from "./Consulting";

export default function Oldcase(props) {
  return (
    <div>
      <form className="text-lg">
        <div>
          <Consulting
            doctor={props.doctor}
            user={props.user}
            name={props.name}
            number={props.number}
            email={props.email}
          />
        </div>
      </form>
    </div>
  );
}
