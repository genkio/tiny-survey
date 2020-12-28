import Ajv, { JSONSchemaType } from "ajv";
import { get, isEmpty } from "lodash";

export class Validator<T> {
  private ajv: Ajv;

  constructor(private schema: JSONSchemaType<T>) {
    try {
      this.ajv = new Ajv();
    } catch (error) {
      // Required by firebase functions
      // @ts-ignore
      this.ajv = require("ajv")();
    }
  }

  validate(data: T) {
    const compiler = this.ajv.compile(this.schema);

    if (compiler(data)) return null;

    return compiler.errors?.map(({ dataPath, message }) => {
      // dataPath comes in as either /schema/0/options or .schema[0].options
      const fields = dataPath.split(/\/|\./).slice(1);
      const source = get(data, fields);
      const fieldOrSource = isEmpty(source)
        ? fields[fields.length - 1]
        : source;

      return `${fieldOrSource} ${message}`;
    });
  }
}
