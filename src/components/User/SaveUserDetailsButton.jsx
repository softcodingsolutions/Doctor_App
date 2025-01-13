function SaveUserDetailsButton(props) {
  return (
    <button
      onClick={props.function}
      type="submit"
      className="w-[20rem] p-1 text-white rounded-md text-lg border border-gray-500 font-medium text-lg hover:scale-105"
      style={{ backgroundColor: "black" }}
    >
      {props.name}
    </button>
  );
}

export default SaveUserDetailsButton;
