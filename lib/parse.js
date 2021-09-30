"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parseHeader_1 = require("./parseHeader");
const fields_1 = require("./fields");
const FieldReader_1 = require("./FieldReader");
function parse(rawBuffer) {
    const buffer = removeEscape(rawBuffer);
    const header = (0, parseHeader_1.parseHeader)(buffer);
    const fields = (0, fields_1.getFieldsMappedByType)(header.type);
    return { type: header.type, fields: readFields(fields, buffer, 10) };
}
exports.parse = parse;
/*
    Removes the escape characters from the buffer.
    Basically anywhere a 0x8d is seen you need to remove it and add 0x20 to the next byte.
*/
function removeEscape(buffer) {
    const result = [];
    const esc = 0x8d;
    const offset = 0x20;
    let escSeen = false;
    for (const item of buffer) {
        if (escSeen) {
            result.push(item - offset);
            escSeen = false;
            continue;
        }
        if (item === esc) {
            escSeen = true;
            continue;
        }
        result.push(item);
    }
    return Buffer.from(result);
}
function readFields(fieldDefinitions, buffer, offset) {
    let index = offset;
    const fields = {};
    const fieldReader = (0, FieldReader_1.FieldReader)(fieldDefinitions);
    while (true) {
        const readResult = fieldReader(buffer, index);
        if (!readResult)
            return fields;
        if (!readResult.name)
            continue;
        fields[readResult.name] = readResult.value;
        index += readResult.length;
    }
}
