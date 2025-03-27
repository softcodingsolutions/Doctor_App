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
    <div className={`flex ${errors ? "flex-row" : "flex-col"} w-full`}>
      <label className="text-sm text-[#1F2937] font-semibold mr-2">
        {label} <span className="text-red-600 font-bold text-lg">*</span>:
      </label>
      <div className="flex flex-col">
        <input
          {...hook}
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          id={name}
          className="py-1 px-2 w-full rounded-md border  text-sm"
        />
        {errors && (
          <span className=" text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
    </div>
  );
}

export default UserDetailsInput;
