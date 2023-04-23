class Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly details: object;

  constructor(message: string, statusCode = 400, details = {}) {
    this.message = message
    this.statusCode = statusCode
    this.details = details
  }
}

export default Error;
