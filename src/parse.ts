import { parseHeader } from './parseHeader';
import { getFieldsMappedByType, IField, IFieldValue } from './fields';
import { FieldReader } from './FieldReader';

export function parse(rawBuffer: Buffer) {
  const buffer = removeEscape(rawBuffer);
  const header = parseHeader(buffer);
  const fields = getFieldsMappedByType(header.type);
  return { type: header.type, fields: readFields(fields, buffer, 10) };
}

/*
    Removes the escape characters from the buffer. 
    Basically anywhere a 0x8d is seen you need to remove it and add 0x20 to the next byte.
*/
function removeEscape(buffer: Buffer) {
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

function readFields(fieldDefinitions: Record<number, IField>, buffer: Buffer, offset: number) {
  let index = offset;
  const fields: Record<string, IFieldValue> = {};

  const fieldReader = FieldReader(fieldDefinitions);

  while (true) {
    const readResult = fieldReader(buffer, index);

    if (!readResult) return fields;
    if (!readResult.name) continue;
    fields[readResult.name] = readResult.value;
    index += readResult.length;
  }
}
