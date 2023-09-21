export class ClientException extends Error {
  public status: number;
  public message: string;

  constructor(status: number = 500, message: string | string[] = 'Something went wrong') {
    super(Array.isArray(message) ? message.join(' | ') : message);
    this.status = status;
    this.message = Array.isArray(message) ? message.join(' | ') : message;
  }
}

export class NotFoundError extends ClientException {
  constructor(message: string[] | string = 'Resource not found') {
    super(404, message);
  }
}

export class InvalidArgumentError extends ClientException {
  constructor(message: string[] | string = 'Invalid arguments') {
    super(422, message);
  }
}

export class InvalidCredentialsError extends ClientException {
  constructor(message: string[] | string = 'Invalid credentials') {
    super(401, message);
  }
}

export class InvalidSessionError extends ClientException {
  constructor(message: string[] | string = 'Invalid session') {
    super(403, message);
  }
}

export class InvalidAccessError extends ClientException {
  constructor(message: string[] | string = 'Insufficient permissions') {
    super(403, message);
  }
}

export class InvalidIdentityError extends ClientException {
  constructor(message: string[] | string = 'Please verify your identity') {
    super(401, message);
  }
}

export class MailerError extends ClientException {
  constructor(message: string[] | string = 'An error occurred while sending email') {
    super(500, message);
  }
}
