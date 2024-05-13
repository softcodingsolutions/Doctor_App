function SelectTreatmentButton(props) {
  return (
    <button
      type="button"
      onClick={props.function}
      className={`p-1.5 border-[1.5px] border-gray-400 rounded-md hover:text-white hover:bg-gray-600`}
    >
      {props.name}
    </button>
  );
}

export default SelectTreatmentButton;
