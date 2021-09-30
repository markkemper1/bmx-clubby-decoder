"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldReader = void 0;
const fields_1 = require("./fields");
function FieldReader(fieldDefinitions) {
    return (buffer, offset) => {
        let index = offset;
        const type = buffer[index++];
        const field = fieldDefinitions[type];
        if (type === 0x8f)
            return null;
        const length = buffer.readInt8(index++);
        const newOffset = length + 2;
        if (!field) {
            index += length;
            /* tslint:disable:no-console */
            console.warn('Field not defined', type, index, buffer.slice(index).toString('hex'));
            return { length: newOffset };
        }
        const name = field.name;
        switch (field.type) {
            case fields_1.FieldType.time:
                return { name, length: newOffset, value: parseInt((readTime(buffer, index) / BigInt(1000)).toString(), 10) };
            case fields_1.FieldType.Int:
                return { name, length: newOffset, value: readint(buffer, length, index) };
            case fields_1.FieldType.string:
                return { name, length: newOffset, value: buffer.slice(index, index + length).toString('ascii') };
        }
    };
    function readTime(buffer, index) {
        const intBuffer = buffer.slice(index, index + 8).reverse();
        return intBuffer.readBigUInt64BE();
    }
    function readint(buffer, length, index) {
        const intBuffer = buffer.slice(index, index + length).reverse();
        switch (length) {
            case 1:
                return intBuffer.readInt8();
            case 2:
                return intBuffer.readInt16BE();
            case 4:
                return intBuffer.readInt32BE();
            default:
                throw new Error(`Invalid length for int field: ${length}`);
        }
    }
}
exports.FieldReader = FieldReader;
