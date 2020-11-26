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
    <div>
      <label>Title</label>
      <input
        name="title"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </div>
  );
}

function Option({
  labelPrefix,
  index,
  onAdd,
  onChange,
  onRemove,
  value,
}: {
  index: number;
  labelPrefix: string;
  onAdd: (index: number) => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  value?: string;
}) {
  return (
    <div>
      <label>{`${labelPrefix} ${index + 1}`}</label>
      <input
        name={String(index)}
        type="text"
        onChange={(event) => onChange(index, event.target.value)}
        value={value}
      />
      <button onClick={() => onAdd(index + 1)} type="button">
        Add
      </button>
      <button onClick={() => onRemove(index)} type="button">
        Remove
      </button>
    </div>
  );
}

interface IProps {
  labelPrefix?: string;
  onChange: (v: IRadioButtonSchema) => void;
  schema?: Pick<IRadioButtonSchema, "options" | "title">;
}

export default function RadioButtonFactory({
  labelPrefix = "Option",
  onChange,
  schema,
}: IProps) {
  const { add, initialize, items, remove } = useFactory();
  const [optionMap, setOptionMap] = useState<IRadioOptionMap>({});
  const [title, setTitle] = useState<IRadioButtonSchema["title"]>("");

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
    setOptionMap(
      Array(schema.options.length)
        .fill(null)
        .reduce(
          (acc, _, index) => ({ ...acc, [index]: schema.options[index] }),
          {}
        )
    );
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
          labelPrefix={labelPrefix}
          onAdd={add}
          onChange={updateOption}
          onRemove={remove}
          value={optionMap[index] ?? schema?.options[index]}
        />
      ))}
    </div>
  );
}
