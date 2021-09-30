"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldWriter = void 0;
const fields_1 = require("./fields");
function FieldWriter(fieldDefinitions) {
    return (name, value) => {
        const field = fieldDefinitions[name];
        const fieldType = field.type;
        let size = field.size;
        if (fieldType === fields_1.FieldType.string)
            size = value.length;
        if (!size)
            throw new Error('Size not defined for ' + fieldType + ' - ' + value);
        const buf = Buffer.alloc(2 + size);
        buf.writeUInt8(field.code, 0);
        buf.writeUInt8(size, 1);
        switch (fieldType) {
            case fields_1.FieldType.time:
                buf.writeBigUInt64LE(BigInt(value) * BigInt(1000), 2);
                return buf;
            case fields_1.FieldType.Int:
                writeInt(buf, size, value);
                return buf;
            case fields_1.FieldType.string:
                buf.fill(value, 2, 2 + size, 'ascii');
                return buf;
            default:
                throw new Error('unsupport field type');
        }
    };
}
exports.FieldWriter = FieldWriter;
function writeInt(buffer, size, value) {
    switch (size) {
        case 1:
            return buffer.writeInt8(value, 2);
        case 2:
            return buffer.writeInt16LE(value, 2);
        case 4:
            return buffer.writeInt32LE(value, 2);
        case 8:
            return buffer.writeBigUInt64LE(value, 2);
        default:
            throw new Error('Invalid length for int field, size: ' + size);
    }
}
