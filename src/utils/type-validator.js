export class DataValidator {
    static isArrayOfString(data) {
        if (Array.isArray(data)) {
            if (data.length < 1) {
                return false;
            }
            return data.every(item => typeof item === 'string');
        }
        return false;
    }
}
