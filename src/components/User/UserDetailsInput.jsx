function UserDetailsInput(props) {
  return (
      <>
        <label className="text-lg text-end w-1/3 mr-2">{props.label}:</label>
        <input
          {...props.hook}
          type={props.type}
          name={props.name}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          autoComplete="off"
          id={props.name}
          {...props.req}
          className="py-1 px-2 rounded-md border border-black w-[40vh]"
        />
        {props.errors && (
        <span className="text-sm  text-red-500 ">
          {props.errors?.message}
        </span>
      )}
      </>
  
  );
}

export default UserDetailsInput;
