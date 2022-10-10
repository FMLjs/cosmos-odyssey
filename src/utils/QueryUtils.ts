export class QueryUtils {

    static toSnakeCase(value: string) {
        return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
}