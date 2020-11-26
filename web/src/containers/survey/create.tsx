import {
  IRadioButtonSchema,
  ISurvey,
  ISurveyCreateRequest,
} from "common/types";
import React, { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { createSurvey } from "../../api";
import FactoryProvider from "../../components/form/factory-context";
import RadioButtonFactory from "../../components/form/radio-button/factory";
import { useFactory } from "../../hooks";

export type ISchemaMap = Record<number, IRadioButtonSchema>;

export default function SurveyCreate() {
  const history = useHistory();
  const { add, items } = useFactory();

  const [title, setTitle] = useState<ISurvey["title"]>("");
  const [schemaMap, setSchemaMap] = useState<ISchemaMap>({});

  const [mutate] = useMutation(
    (payload: ISurveyCreateRequest) => createSurvey(payload),
    {
      onSuccess: ({ id }) => history.push(`/survey/${id}`),
    }
  );

  const updateSchema = (index: number, updatedSchema: IRadioButtonSchema) => {
    setSchemaMap({ ...schemaMap, [index]: updatedSchema });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ schema: Object.values(schemaMap), title });
  };

  return (
    <form onSubmit={submit}>
      <label>Survey Title</label>
      <input type="text" onChange={(event) => setTitle(event.target.value)} />
      {items.map((index) => (
        <FactoryProvider key={`Factory-${index}`}>
          <RadioButtonFactory
            onChange={(updatedSchema) => updateSchema(index, updatedSchema)}
          />
        </FactoryProvider>
      ))}

      <button type="button" onClick={add}>
        Add more
      </button>
      <button type="submit">Create survey</button>
    </form>
  );
}
