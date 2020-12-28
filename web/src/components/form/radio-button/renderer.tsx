import { IOption, IRadioButton } from "@libs/common/model";
import React, { useState } from "react";
import { createElementId } from "../../../utilities";

interface IProps {
  schema: IRadioButton;
  onChange?: (checked: string) => void;
  result?: IOption;
}

function Option({
  disabled,
  checked,
  onChange,
  option,
}: {
  disabled?: boolean;
  checked: string;
  onChange: (value: string) => void;
  option: string;
}) {
  return (
    <div className="control">
      <label className="radio">
        <input
          checked={checked === option}
          disabled={disabled}
          id={createElementId(option)}
          name={createElementId(option)}
          onChange={(event) => onChange(event.target.value)}
          type="radio"
          value={option}
        />{" "}
        {option}
      </label>
    </div>
  );
}

export default function RadioButtonRenderer({
  schema: { title, options },
  onChange,
  result,
}: IProps) {
  const [checked, setChecked] = useState("");

  const change = (value: string) => {
    setChecked(value);
    if (onChange) onChange(value);
  };

  return (
    <>
      <div className="field">
        <label className="label">{title}</label>
      </div>
      {options.map((option, index) => (
        <div className="field" key={`RadioButton-${index}`}>
          <Option
            checked={result ?? checked}
            disabled={result !== undefined}
            onChange={change}
            option={option}
          />
        </div>
      ))}
    </>
  );
}
