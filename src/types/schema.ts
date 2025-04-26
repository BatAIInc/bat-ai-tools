/**
 * Parameter types supported by BatAI tools
 */
export type ParameterType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array";

/**
 * Definition for a single parameter in a tool
 */
export interface ParameterDefinition {
  type: ParameterType;
  description: string;
  enum?: string[] | number[] | boolean[];
  items?: {
    type: ParameterType;
    description?: string;
  };
  properties?: {
    [key: string]: ParameterDefinition;
  };
  required?: string[];
}

/**
 * Schema definition for a BatAI tool
 */
export interface ToolSchema {
  name: string;
  description: string;
  parameters: {
    [key: string]: ParameterDefinition;
  };
  required: string[];
  category?: string;
  version?: string;
}
