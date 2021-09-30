import { getFieldsMappedByName, IField, FieldType, MessageType } from './fields';
import { recordTypes } from './recordTypes';
import { FieldWriter } from './FieldWriter';

export function write({ type, fields }: { type: MessageType; fields: Record<string, any> }) {
  // { type: header.type, fields: readFields(fields, buffer, 10) }
  /*
fields: {
    PASSING_NUMBER: 15166,
    TRANSPONDER: 9992,
    RTC_TIME: 1625558581045000n,
    FLAGS: 0,
    SPORT: 41,
    DECODER_ID: 273134
  }*/

  const fieldTypes = getFieldsMappedByName(type);
  const fieldsBuffer = writeFields(fields, fieldTypes);
  const header = writeHeader({ recordType: type, length: fieldsBuffer.length });
  return Buffer.concat([header, fieldsBuffer]);
}

function writeFields(fields: Record<string, any>, fieldTypes: Record<string, IField>) {
  const fieldWriter = FieldWriter(fieldTypes);
  const result: Buffer[] = [];
  for (const [key, value] of Object.entries(fields)) {
    const fieldBuffer = fieldWriter(key, value);
    if (fieldBuffer) result.push(fieldWriter(key, value));
  }
  result.push(Buffer.from('8f', 'hex'));
  return Buffer.concat(result);
}

function writeField(fieldType: FieldType, value: any, size: number) {
  if (fieldType === FieldType.string) size = value.length;
  if (!size) throw new Error('Size not defined for ' + fieldType + ' - ' + value);
  const buf = Buffer.alloc(2 + size);
  buf.writeInt8(fieldType, 0);
  buf.writeInt8(size, 1);
  switch (fieldType) {
    case FieldType.time:
      buf.writeBigUInt64BE(BigInt(value) * BigInt(1000), 2);
      return buf;
    case FieldType.Int:
      writeInt(buf, size, value);
      return buf;
    case FieldType.string:
      buf.fill(value, 2, 2 + size, 'ascii');
      return buf;
    default:
      break;
    // throw new Error("Unknown field type", field)
  }
}
function writeInt(buffer: Buffer, size: number, value: number | bigint) {
  switch (size) {
    case 1:
      return buffer.writeInt8(value as number, 2);
    case 2:
      return buffer.writeInt16BE(value as number, 2);
    case 4:
      return buffer.writeInt32BE(value as number, 2);
    case 8:
      return buffer.writeBigUInt64BE(value as bigint, 2);
    default:
      throw new Error('Invalid length for int field, length:' + size);
  }
}

function writeHeader({ length, recordType }: { length: number; recordType: MessageType }) {
  const result = Buffer.alloc(10);
  result.fill(0x8e, 0); // 00 - SOR (Start of Record = 8e)
  result.writeInt8(2, 1); // 01 - Version (default = 02)
  result.writeUInt16LE(length, 2); // 02 - length of record LSB, 03 - length of record MSB
  result.writeUInt16LE(0, 4); // 04 - CRC of record LSB, 05 - CRC of record MSB
  result.writeUInt16LE(0, 6); // 06 - Flags of record LSB,  07 - Flags of record MSB
  const recordTypeCodeEntry = Object.entries(recordTypes).find(([key, value]) => value === recordType);
  if (!recordTypeCodeEntry) throw new Error(`Record type: ${recordType} could not be found in recordTypes`);
  result.writeInt16LE(parseInt(recordTypeCodeEntry[0], 10), 8); // 08 - TOR (Type of Record) LSB, 09 - TOR(Type of Record) MSB
  return result;
}
