import {HttpException} from '@nestjs/common';

export class InvalidArgumentError extends HttpException {

    constructor(error = 'Invalid argument exception') {
        super(error, 404);
    }

    static throw(msg?: string) {
        throw new InvalidArgumentError(msg);
    }

    static ifThrow(condition: boolean, msg?: string) {
        if (condition) {
            throw new InvalidArgumentError(msg);
        }
    }
}
