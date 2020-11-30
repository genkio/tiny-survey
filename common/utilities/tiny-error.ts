export default class TinyError extends Error {
  constructor(public messages: string[]) {
    super();
  }

  toMessages() {
    return {
      messages: this.messages,
    };
  }
}
