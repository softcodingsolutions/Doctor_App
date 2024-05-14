function UserDetailsInput(props) {
  return (
    <div className="flex flex-col items-baseline">
      <div className="flex px-2 items-center justify-between w-full">
        <label className="text-lg text-end w-1/3 mr-2">{props.label}:</label>
        <input
          {...props.hook}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          autoComplete="off"
          id={props.name}
          {...props.req}
          className="py-1 px-2 rounded-md border border-black w-[40vh]"
        />
      </div>
      {props.errors && (
        <span className="text-sm  text-red-500 -mt-2.5">
          {props.errors?.message}
        </span>
      )}
    </div>
  );
}

export default UserDetailsInput;
