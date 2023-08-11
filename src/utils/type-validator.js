export class DataValidator {
    static isArrayOfString(data) {
        if (Array.isArray(data)) {
            return data.every(item => typeof item === 'string');
        }
        return false;
    }
}
