/// <reference types="node" />
import { MessageType } from './fields';
export interface IHeader {
    version: number;
    length: number;
    crc: string;
    flags: string;
    type: MessageType;
}
export declare function parseHeader(buffer: Buffer): IHeader;
