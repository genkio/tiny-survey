import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRadioButton, ISurvey } from "@libs/common/model";
import { ISurveyCreateRequest, surveyCreateValidator } from "@libs/common/api";
import React, { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { createSurvey } from "../../api";
import ErrorMessages from "../../components/error-messages";
import FactoryProvider from "../../components/form/factory-context";
import RadioButtonFactory from "../../components/form/radio-button/factory";
import { useFactory } from "../../hooks";

export type ISchemaMap = Record<number, IRadioButton>;

export default function SurveyCreate() {
  const history = useHistory();
  const { add, items } = useFactory();

  const [title, setTitle] = useState<ISurvey["title"]>("");
  const [schemaMap, setSchemaMap] = useState<ISchemaMap>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const [mutate, { status }] = useMutation(
    (payload: ISurveyCreateRequest) => createSurvey(payload),
    {
      onSuccess: ({ id }) => history.push(`/survey/${id}`),
      onError: (messages: string[]) => setErrorMessages(messages),
    }
  );

  const updateSchema = (index: number, updatedSchema: IRadioButton) => {
    setSchemaMap({ ...schemaMap, [index]: updatedSchema });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      schema: Object.values(schemaMap),
      title,
    };
    const messages = surveyCreateValidator.validate(payload);
    if (messages) {
      setErrorMessages(messages);
    } else {
      mutate(payload);
    }
  };

  if (status === "loading") return <p>Loading</p>;

  const titleInput = (
    <div className="box">
      <div className="field">
        <label className="label">Title</label>
        <div className="control has-icons-left">
          <input
            className="input"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Give you tiny survey a name"
            type="text"
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
      <p className="subtitle has-text-grey-light">Create your next survey</p>

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

        <ErrorMessages messages={errorMessages} />

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
