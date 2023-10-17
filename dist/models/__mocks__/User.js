"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const User = Object.create({});
exports.User = User;
User.findOne = ({ email }) => {
    console.log('find user for email: ', email);
    if (email.startsWith('admin')) {
        console.log('return admin');
        return Promise.resolve({
            _id: 1234,
            id: 1234,
            role: 'admin',
        });
    }
    return Promise.resolve({
        _id: 1234,
        id: 1234,
        role: 'user',
    });
};
User.create = () => Promise.resolve();
//# sourceMappingURL=User.js.map