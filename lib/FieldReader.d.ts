/// <reference types="node" />
import { IField, IFieldValue } from './fields';
export declare function FieldReader(fieldDefinitions: Record<string, IField>): (buffer: Buffer, offset: number) => IFieldValue | null;
