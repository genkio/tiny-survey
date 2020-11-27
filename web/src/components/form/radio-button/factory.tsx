import {
  faLightbulb,
  faMinus,
  faPlus,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRadioButtonSchema } from "common/types";
import React, { useEffect, useState } from "react";
import { useFactory } from "../../../hooks";

type IRadioOptionMap = Record<number, string>;

function Title({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value?: string;
}) {
  return (
    <div className="field">
      <label className="label">Question</label>
      <div className="control has-icons-left">
        <input
          className="input"
          name="title"
          onChange={(event) => onChange(event.target.value)}
          type="text"
          value={value}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faQuestion} />
        </span>
      </div>
    </div>
  );
}

function Option({
  index,
  onAdd,
  onChange,
  onRemove,
  total,
  value,
}: {
  index: number;
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  total: number;
  value?: string;
}) {
  const input = (
    <div className="control is-expanded has-icons-left">
      <input
        className="input"
        name={String(index)}
        type="text"
        onChange={(event) => onChange(index, event.target.value)}
        value={value}
      />
      <span className="icon is-small is-left">
        <FontAwesomeIcon icon={faLightbulb} />
      </span>
    </div>
  );

  const addButton = (
    <div className="control">
      <button className="button is-white" onClick={onAdd} type="button">
        More options
      </button>
    </div>
  );

  const removeButton = (
    <div className="control">
      <button
        className="button is-white"
        onClick={() => onRemove(index)}
        type="button"
      >
        <span className="icon has-text-danger is-small">
          <FontAwesomeIcon icon={faMinus} />
        </span>
      </button>
    </div>
  );

  return (
    <div className="field has-text-centered">
      <div className="field is-grouped">
        {input}
        {index !== 0 && removeButton}
      </div>
      {index + 1 === total && addButton}
    </div>
  );
}

interface IProps {
  onChange: (v: IRadioButtonSchema) => void;
  schema?: Pick<IRadioButtonSchema, "options" | "title">;
}

export default function RadioButtonFactory({ onChange, schema }: IProps) {
  const { add, initialize, items, remove } = useFactory();
  const [optionMap, setOptionMap] = useState<IRadioOptionMap>({});
  const [title, setTitle] = useState<IRadioButtonSchema["title"]>("");

  const initializeOptionMap = (options: IRadioButtonSchema["options"]) =>
    Array(options.length)
      .fill(null)
      .reduce((acc, _, index) => ({ ...acc, [index]: options[index] }), {});

  useEffect(() => {
    onChange({
      options: items.reduce<IRadioButtonSchema["options"]>(
        (acc, v) => (optionMap[v] ? acc.concat(optionMap[v]) : acc),
        []
      ),
      title,
      type: "radio",
    });
  }, [optionMap, title]);

  useEffect(() => {
    if (!schema) return;
    setTitle(schema.title);
    initialize(schema.options.length);
    setOptionMap(initializeOptionMap(schema.options));
  }, [schema]);

  const updateOption = (index: number, value: string) => {
    setOptionMap({ ...optionMap, [index]: value });
  };

  const updateTitle = (value: string) => {
    setTitle(value);
  };

  return (
    <div>
      <Title onChange={updateTitle} value={title ?? schema?.title} />

      {items.map((index) => (
        <Option
          key={`OptionWrapper-${index}`}
          index={index}
          onAdd={add}
          onChange={updateOption}
          onRemove={remove}
          total={items.length}
          value={optionMap[index] ?? schema?.options[index]}
        />
      ))}
    </div>
  );
}
