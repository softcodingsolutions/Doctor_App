function SignupInputs(props) {
  return (
    <div className="grid py-2 my-1">
      <input
        {...props.hook}  
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete="off"
        id={props.name}
        className="py-1 px-2 rounded-md border border-black w-[20rem]"
      />
    </div>
  )
}

export default SignupInputs