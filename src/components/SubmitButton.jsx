function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="mt-3 mb-3 w-[20rem] p-1 text-white rounded-md border border-gray-500 font-medium text-lg"
      style={{ backgroundColor: "black" }}
    >
      {props.name}
    </button>
  );
}

export default SubmitButton;
