import { IResponseCreateRequest, ISurvey } from "common/types";
import React, { FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { createResponse, getSurvey } from "../../api";
import RadioButtonRenderer from "../../components/form/radio-button/renderer";

interface IProps {
  id: ISurvey["id"];
}

export default function SurveyDetail({ id }: IProps) {
  const history = useHistory();
  const { data, error, status } = useQuery(["survey-detail", id], getSurvey);

  const [answers, setAnswers] = useState({});

  const [mutate] = useMutation(
    (payload: IResponseCreateRequest) => createResponse(payload),
    {
      onSuccess: ({ id }) => history.push(`/response/${id}`),
    }
  );

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Oops</p>;

  if (!data) return <p>Not found</p>;

  const {
    survey: { schema, title },
  } = data;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ data: answers, surveyId: id });
  };

  const changeSelect = (index: number, selected: string) => {
    setAnswers({ ...answers, [index]: selected });
  };

  return (
    <form onSubmit={submit}>
      <p>{title}</p>
      {schema.map((data, index) => (
        <RadioButtonRenderer
          key={`RadioButton-${index}`}
          schema={data}
          onChange={(selected) => changeSelect(index, selected)}
        />
      ))}

      <button type="button" onClick={() => history.push(`/survey/${id}/edit`)}>
        Edit
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
