"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const formatError = (...errors) => {
    const result = [];
    for (const error of errors) {
        result.push({ msg: error });
    }
    return { errors: result };
};
exports.formatError = formatError;
//# sourceMappingURL=error.js.map