/// <reference types="node" />
import { IField } from './fields';
export declare function FieldWriter(fieldDefinitions: Record<string, IField>): (name: string, value: any) => Buffer;
