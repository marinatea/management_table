import React from "react";
import s from "./FilterInput.module.scss";

interface FilterInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={s.filterInput}
    />
  );
};

export default FilterInput;
