export class IHttpResponse<T extends object> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}
