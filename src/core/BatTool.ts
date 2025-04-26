import { ToolSchema, ParameterDefinition } from "../types/schema";

/**
 * Base class for all BatAI tools
 */
export abstract class BatTool {
  /**
   * The schema defining the tool's interface
   */
  abstract schema: ToolSchema;

  /**
   * Execute the tool with the given parameters
   * @param params Parameters for the tool execution
   * @returns Result of the tool execution
   */
  abstract execute(params: Record<string, any>): Promise<any>;

  /**
   * Validates the parameters against the tool's schema
   * @param params Parameters to validate
   * @throws Error if validation fails
   */
  protected validateParams(params: Record<string, any>): void {
    // Check required parameters
    for (const required of this.schema.required) {
      if (!(required in params)) {
        throw new Error(`Missing required parameter: ${required}`);
      }
    }

    // Validate parameter types and values
    for (const [key, value] of Object.entries(params)) {
      const paramDef = this.schema.parameters[key];
      if (!paramDef) {
        throw new Error(`Unknown parameter: ${key}`);
      }

      this.validateParameter(key, value, paramDef);
    }
  }

  /**
   * Validates a single parameter against its definition
   * @param name Parameter name
   * @param value Parameter value
   * @param def Parameter definition
   * @throws Error if validation fails
   */
  private validateParameter(
    name: string,
    value: any,
    def: ParameterDefinition
  ): void {
    // Check type
    const type = typeof value;
    if (def.type === "array") {
      if (!Array.isArray(value)) {
        throw new Error(`Parameter ${name} must be an array`);
      }
      // Validate array items if item type is specified
      if (def.items) {
        const itemDef: ParameterDefinition = {
          type: def.items.type,
          description: def.items.description || "Array item",
        };
        for (const item of value) {
          this.validateParameter(`${name}[]`, item, itemDef);
        }
      }
    } else if (def.type === "object") {
      if (type !== "object" || Array.isArray(value)) {
        throw new Error(`Parameter ${name} must be an object`);
      }
      // Validate object properties if specified
      if (def.properties) {
        for (const [propName, propDef] of Object.entries(def.properties)) {
          if (propName in value) {
            this.validateParameter(
              `${name}.${propName}`,
              value[propName],
              propDef
            );
          } else if (def.required?.includes(propName)) {
            throw new Error(
              `Missing required property ${propName} in parameter ${name}`
            );
          }
        }
      }
    } else if (type !== def.type) {
      throw new Error(`Parameter ${name} must be of type ${def.type}`);
    }

    // Check enum values
    if (def.enum && !def.enum.some((enumValue) => enumValue === value)) {
      throw new Error(
        `Parameter ${name} must be one of: ${def.enum.join(", ")}`
      );
    }
  }
}
