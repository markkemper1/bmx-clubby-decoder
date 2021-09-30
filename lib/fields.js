"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldsMappedByName = exports.getFieldsMappedByType = exports.recordTypes = exports.FieldType = void 0;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Int"] = 0] = "Int";
    FieldType[FieldType["time"] = 1] = "time";
    FieldType[FieldType["string"] = 2] = "string";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
const generalFields = [
    { code: 0x81, name: 'DECODER_ID', type: FieldType.Int, size: 4 },
    { code: 0x83, name: 'CONTROLLER_ID', type: FieldType.Int, size: 4 },
    { code: 0x85, name: 'REQUEST_ID', type: FieldType.Int, size: 4 },
];
const fields = {
    PASSING: [
        { code: 0x01, name: 'PASSING_NUMBER', type: FieldType.Int, size: 4 },
        { code: 0x03, name: 'TRANSPONDER', type: FieldType.Int, size: 4 },
        { code: 0x13, name: 'RTC_ID', type: FieldType.Int, size: 4 },
        { code: 0x04, name: 'RTC_TIME', type: FieldType.time, size: 8 },
        { code: 0x10, name: 'UTC_TIME', type: FieldType.time, size: 8 },
        { code: 0x05, name: 'STRENGTH', type: FieldType.Int, size: 2 },
        { code: 0x06, name: 'HITS', type: FieldType.Int, size: 2 },
        { code: 0x08, name: 'FLAGS', type: FieldType.Int, size: 2 },
        { code: 0x0a, name: 'TRAN_CODE', type: FieldType.string },
        { code: 0x0e, name: 'USER_FLAG', type: FieldType.Int, size: 4 },
        { code: 0x0f, name: 'DRIVER_ID', type: FieldType.Int, size: 1 },
        { code: 0x14, name: 'SPORT', type: FieldType.Int, size: 1 },
        { code: 0x30, name: 'VOLTAGE', type: FieldType.Int, size: 1 },
        { code: 0x31, name: 'TEMPERATURE', type: FieldType.Int, size: 1 },
    ].concat(generalFields),
    STATUS: [
        { code: 0x01, name: 'NOISE', type: FieldType.Int, size: 4 },
        { code: 0x06, name: 'GPS', type: FieldType.Int, size: 4 },
        { code: 0x07, name: 'TEMPERATURE', type: FieldType.Int, size: 4 },
        { code: 0x0a, name: 'SATINUSE', type: FieldType.Int, size: 4 },
        { code: 0x0b, name: 'LOOP_TRIGGERS', type: FieldType.Int, size: 4 },
        { code: 0x0c, name: 'INPUT_VOLTAGE', type: FieldType.Int, size: 4 },
    ].concat(generalFields),
};
exports.recordTypes = {
    0x00: 'RESET',
    0x01: 'PASSING',
    0x02: 'STATUS',
    0x45: 'FIRST_CONTACT',
    0xff: 'ERROR',
    0x03: 'VERSION',
    0x04: 'RESEND',
    0x05: 'CLEAR_PASSING',
    0x18: 'WATCHDOG',
    0x20: 'PING',
    0x2d: 'SIGNALS',
    0x13: 'SERVER_SETTINGS',
    0x15: 'SESSION',
    0x28: 'GENERAL_SETTINGS',
    0x2f: 'LOOP_TRIGGER',
    0x30: 'GPS_INFO',
    0x4a: 'TIMELINE',
    0x24: 'GET_TIME',
    0x16: 'NETWORK_SETTINGS',
};
function getFieldsMappedByType(type) {
    const list = fields[type];
    const result = {};
    list.forEach((x) => {
        result[x.code] = x;
    });
    return result;
}
exports.getFieldsMappedByType = getFieldsMappedByType;
function getFieldsMappedByName(type) {
    const list = fields[type];
    const result = {};
    list.forEach((x) => {
        result[x.name] = x;
    });
    return result;
}
exports.getFieldsMappedByName = getFieldsMappedByName;
