export class ClientError extends Error {
  message: string;
  code?: string;
  field?: string;

  constructor(message: string, code?: string, field?: string) {
    super(message);
    this.message = message;
    this.code = code;
    this.field = field;
  }

  toString() {
    return this.message;
  }
}
