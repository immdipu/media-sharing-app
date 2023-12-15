import React from "react";

interface InputTypes {
  label: string;
  name: string;
  defaultValue?: string;
  value: string;
  type: string;
  required: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput: React.FC<InputTypes> = ({
  label,
  name,
  defaultValue,
  value,
  type,
  required,
  disabled = false,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <div className="flex max-md:flex-col">
        <label
          htmlFor="username"
          className="flex   w-full max-w-[280px]  items-center text-base font-medium text-neutral-200 text-opacity-60"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className="placeholder:text-_welcometext_lightblue font-Inter border-_light_white mr-6 w-2/3 rounded-md border border-opacity-30 bg-inherit bg-opacity-40 px-2 py-2 text-sm font-normal tracking-wide text-neutral-400 outline-none transition-all duration-200 ease-linear placeholder:font-light placeholder:text-opacity-50 focus-within:border-opacity-75  focus-within:text-neutral-200 max-md:mr-0 max-md:mt-2  max-md:w-11/12"
          required={required}
        />
      </div>
    </>
  );
};

export default ProfileInput;
