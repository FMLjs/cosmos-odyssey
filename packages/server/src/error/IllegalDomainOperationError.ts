import {HttpException} from "@nestjs/common";

export class IllegalDomainOperationError extends HttpException {

    constructor(error = 'Illegal domain operation', status = 409) {
        super(error, status);
    }

    static throw(msg?: string, status?: number) {
        throw new IllegalDomainOperationError(msg, status);
    }

    static ifThrow(val: boolean, msg?: string, status?: number) {
        if (val) {
            throw new IllegalDomainOperationError(msg, status);
        }
    }
}
