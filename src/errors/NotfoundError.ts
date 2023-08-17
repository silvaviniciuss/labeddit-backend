import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "Não encontrado"
    ){super(404, message)}
}
