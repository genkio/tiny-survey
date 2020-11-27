import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const titleInput = (
    <div className="box">
      <div className="field">
        <label className="label">Title</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faHeading} />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="title has-text-black">Tiny Survey</h3>
      <p className="subtitle has-text-black">Create your next survey</p>

      <form className="has-text-left" onSubmit={submit}>
        {titleInput}

        {items.map((index) => (
          <div className="box" key={`Factory-${index}`}>
            <FactoryProvider>
              <RadioButtonFactory
                onChange={(updatedSchema) => updateSchema(index, updatedSchema)}
              />
            </FactoryProvider>
          </div>
        ))}

        <div className="buttons is-right">
          <div className="control">
            <button className="button is-white" onClick={add} type="button">
              More questions
            </button>
          </div>
          <div className="control">
            <button className="button is-link" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
