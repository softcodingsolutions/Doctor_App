function UserDetailsInput(props) {
  return (
    <div className="flex px-2 space-x-2 items-center justify-between w-[48%]">
      <label className="text-lg">{props.label}:</label>
      <input
        {...props.hook}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete="off"
        id={props.name}
        {...props.req}
        className="py-1 px-2 rounded-md border border-black w-[18rem]"
      />
    </div>
  );
}

export default UserDetailsInput;
