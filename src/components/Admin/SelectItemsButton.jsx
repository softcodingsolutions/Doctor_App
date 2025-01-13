function SelectItemsButton(props) {
  const handleShowCheckboxes = () =>
    props.setShowCheckboxes(!props.showCheckboxes);

  return (
    <button
      onClick={handleShowCheckboxes}
    >
      {!props.showCheckboxes ? props.title : "Save"}
    </button>
  );
}

export default SelectItemsButton;
