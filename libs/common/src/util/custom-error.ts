export class CustomError extends Error {
  constructor(public messages: string[]) {
    super();
  }

  toMessages() {
    return {
      messages: this.messages,
    };
  }
}
