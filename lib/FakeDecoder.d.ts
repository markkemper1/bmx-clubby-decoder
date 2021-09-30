/// <reference types="node" />
interface FakeDecoder {
    send: (data: Buffer) => void;
}
export declare function CreateFakeDecoder(): FakeDecoder;
export {};
