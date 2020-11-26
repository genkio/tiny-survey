import {
  IRadioButtonSchema,
  ISurvey,
  ISurveyUpdateRequest,
} from "common/types";
import React, { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { deleteSurvey, getSurvey, updateSurvey } from "../../api";
import FactoryProvider from "../../components/form/factory-context";
import RadioButtonFactory from "../../components/form/radio-button/factory";
import { useFactory } from "../../hooks";
import { ISchemaMap } from "./create";

interface IProps {
  id: ISurvey["id"];
}

export default function SurveyEdit({ id }: IProps) {
  const history = useHistory();
  const { add, initialize, items } = useFactory();

  const [title, setTitle] = useState<ISurvey["title"]>("");
  const [schemaMap, setSchemaMap] = useState<ISchemaMap>({});

  const { data, error, status } = useQuery(["survey-detail", id], getSurvey);

  useEffect(() => {
    if (!data) return;
    initialize(data.survey.schema.length);
    setTitle(data.survey.title);
    setSchemaMap(
      Array(data.survey.schema.length)
        .fill(null)
        .reduce(
          (acc, _, index) => ({ ...acc, [index]: data.survey.schema[index] }),
          {}
        )
    );
  }, [data]);

  const [update] = useMutation(
    (payload: ISurveyUpdateRequest) => updateSurvey(id, payload),
    {
      onSuccess: ({ id }) => history.push(`/survey/${id}`),
    }
  );

  const [remove] = useMutation((id: string) => deleteSurvey(id), {
    onSuccess: () => history.push("/"),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Oops</p>;

  if (!data) return <p>Not found</p>;

  const updateSchema = (index: number, updatedSchema: IRadioButtonSchema) => {
    setSchemaMap({ ...schemaMap, [index]: updatedSchema });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update({ schema: Object.values(schemaMap), title });
  };

  return (
    <form onSubmit={submit}>
      <label>Survey Title</label>
      <input
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      {items.map((index) => (
        <FactoryProvider key={`Factory-${index}`}>
          <RadioButtonFactory
            onChange={(updatedSchema) => updateSchema(index, updatedSchema)}
            schema={data.survey.schema[index]}
          />
        </FactoryProvider>
      ))}

      <button type="button" onClick={add}>
        Add more
      </button>
      <button type="submit">Update survey</button>
      <button type="button" onClick={() => remove(id)}>
        Delete survey
      </button>
    </form>
  );
}
