import { IResponse } from "common/types";
import React from "react";
import { useQuery } from "react-query";
import { getResponse } from "../../api";
import RadioButtonRenderer from "../../components/form/radio-button/renderer";

interface IProps {
  id: IResponse["id"];
}

export default function ResponseDetail({ id }: IProps) {
  const { data, error, status } = useQuery(
    ["response-detail", id],
    getResponse
  );

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Oops</p>;

  if (!data) return <p>Not found</p>;

  const { result, schema, title } = data;

  return (
    <div>
      <h3 className="title has-text-black">{title}</h3>
      <p className="subtitle has-text-weak">Thank you for your participation</p>

      <div className="box has-text-left">
        {schema.map((data, index) => (
          <RadioButtonRenderer
            key={`RadioButton-${index}`}
            schema={data}
            result={result[index]}
          />
        ))}
      </div>
    </div>
  );
}
