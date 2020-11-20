export class IResponse<T extends object> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}
