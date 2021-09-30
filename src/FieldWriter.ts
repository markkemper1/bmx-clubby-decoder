import { FieldType, IField } from './fields';

export function FieldWriter(fieldDefinitions: Record<string, IField>) {
  return (name: string, value: any): Buffer => {
    const field = fieldDefinitions[name];
    const fieldType = field.type;
    let size = field.size;
    if (fieldType === FieldType.string) size = value.length;
    if (!size) throw new Error('Size not defined for ' + fieldType + ' - ' + value);
    const buf = Buffer.alloc(2 + size);
    buf.writeUInt8(field.code, 0);
    buf.writeUInt8(size, 1);
    switch (fieldType) {
      case FieldType.time:
        buf.writeBigUInt64LE(BigInt(value) * BigInt(1000), 2);
        return buf;
      case FieldType.Int:
        writeInt(buf, size, value);
        return buf;
      case FieldType.string:
        buf.fill(value, 2, 2 + size, 'ascii');
        return buf;
      default:
        throw new Error('unsupport field type');
    }
  };
}

function writeInt(buffer: Buffer, size: number, value: number | bigint) {
  switch (size) {
    case 1:
      return buffer.writeInt8(value as number, 2);
    case 2:
      return buffer.writeInt16LE(value as number, 2);
    case 4:
      return buffer.writeInt32LE(value as number, 2);
    case 8:
      return buffer.writeBigUInt64LE(value as bigint, 2);
    default:
      throw new Error('Invalid length for int field, size: ' + size);
  }
}
