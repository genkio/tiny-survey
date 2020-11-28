import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IRadioButtonSchema,
  ISurvey,
  ISurveySchema,
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

  const initializeSchemaMap = (schema: ISurveySchema) =>
    Array(schema.length)
      .fill(null)
      .reduce((acc, _, index) => ({ ...acc, [index]: schema[index] }), {});

  useEffect(() => {
    if (!data) return;
    initialize(data.survey.schema.length);
    setTitle(data.survey.title);
    setSchemaMap(initializeSchemaMap(data.survey.schema));
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
    <div>
      <h3 className="title has-text-black">Tiny Survey</h3>
      <p className="subtitle has-text-grey-light">Edit your survey</p>

      <form className="has-text-left" onSubmit={submit}>
        <div className="box">
          <div className="field">
            <label className="label">Title</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faHeading} />
              </span>
            </div>
          </div>
        </div>

        {items.map((index) => (
          <div className="box" key={`Factory-${index}`}>
            <FactoryProvider>
              <RadioButtonFactory
                onChange={(updatedSchema) => updateSchema(index, updatedSchema)}
                schema={data.survey.schema[index]}
              />
            </FactoryProvider>
          </div>
        ))}

        <div className="buttons is-right">
          <div className="control">
            <button className="button is-white" type="button" onClick={add}>
              More questions
            </button>
          </div>

          <div className="control">
            <button className="button is-link" type="submit">
              Update
            </button>
          </div>

          <div className="control">
            <button
              className="button is-danger is-outlined"
              type="button"
              onClick={() => remove(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
