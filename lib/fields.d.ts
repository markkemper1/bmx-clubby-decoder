export declare type MessageType = 'PASSING' | 'STATUS';
export declare enum FieldType {
    Int = 0,
    time = 1,
    string = 2
}
export interface IField {
    code: number;
    name: string;
    type: FieldType;
    size?: number;
}
export interface IFieldValue {
    name?: string;
    value?: any;
    length: number;
}
export declare const recordTypes: Record<number, string>;
export declare function getFieldsMappedByType(type: MessageType): Record<number, IField>;
export declare function getFieldsMappedByName(type: MessageType): Record<string, IField>;
