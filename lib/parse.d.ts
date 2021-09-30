/// <reference types="node" />
import { IFieldValue } from './fields';
export declare function parse(rawBuffer: Buffer): {
    type: import("./fields").MessageType;
    fields: Record<string, IFieldValue>;
};
