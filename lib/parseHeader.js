"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeader = void 0;
const recordTypes_1 = require("./recordTypes");
function parseHeader(buffer) {
    //00 - SOR (Start of Record = 8e)
    if (buffer[0] != 0x8e)
        throw new Error('Start of record indicator missing! buffer:' + buffer.toString('hex') + ' [0]:' + buffer[0]);
    return {
        version: buffer.readInt8(1),
        length: buffer.readInt16LE(2),
        crc: buffer.slice(4, 6).toString('hex'),
        flags: buffer.slice(6, 8).toString('hex'),
        type: recordTypes_1.recordTypes[buffer.readInt16LE(8)], //08 - TOR (Type of Record) LSB, 09 - TOR(Type of Record) MSB
    };
}
exports.parseHeader = parseHeader;
