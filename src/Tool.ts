/**
 * Interface for tool input parameters
 */
export interface ToolInput {
  [key: string]: any;
}

/**
 * Interface for tool output
 */
export interface ToolOutput {
  success: boolean;
  result: any;
  error?: string;
}

/**
 * Base interface for all tools
 */
export interface Tool {
  name: string;
  description: string;
  parameters: {
    [key: string]: {
      type: string;
      description: string;
      required?: boolean;
    };
  };
  execute(input: ToolInput): Promise<ToolOutput>;
}

/**
 * Abstract base class for tools
 */
export abstract class BaseTool implements Tool {
  public abstract name: string;
  public abstract description: string;
  public abstract parameters: {
    [key: string]: {
      type: string;
      description: string;
      required?: boolean;
    };
  };

  protected validateInput(input: ToolInput): string | null {
    for (const [param, config] of Object.entries(this.parameters)) {
      if (config.required && !(param in input)) {
        return `Missing required parameter: ${param}`;
      }
      if (param in input && typeof input[param] !== config.type) {
        return `Invalid type for parameter ${param}. Expected ${
          config.type
        }, got ${typeof input[param]}`;
      }
    }
    return null;
  }

  public async execute(input: ToolInput): Promise<ToolOutput> {
    const validationError = this.validateInput(input);
    if (validationError) {
      return {
        success: false,
        result: null,
        error: validationError,
      };
    }

    try {
      const result = await this._execute(input);
      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        result: null,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  protected abstract _execute(input: ToolInput): Promise<any>;
}
