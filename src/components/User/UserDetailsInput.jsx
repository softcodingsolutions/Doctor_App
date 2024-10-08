import { useEffect } from "react";

function UserDetailsInput({
  label,
  type,
  name,
  defaultValue,
  placeholder,
  hook,
  setValue,
  errors,
}) {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, setValue, name]);

  return (
    <>
      <label className="text-sm text-end w-1/3 mr-2">{label}:</label>
      <div className="flex flex-col">
        <input
          {...hook}
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          id={name}
          className="py-1 px-2 rounded-md border border-black w-[40vh] text-sm"
        />
        {errors && (
          <span className=" text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
    </>
  );
}

export default UserDetailsInput;
