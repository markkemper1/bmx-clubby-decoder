/// <reference types="node" />
import { MessageType } from './fields';
export declare function write({ type, fields }: {
    type: MessageType;
    fields: Record<string, any>;
}): Buffer;
