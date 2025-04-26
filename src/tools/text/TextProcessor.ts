import { BatTool } from "../../core/BatTool";
import { ToolSchema } from "../../types/schema";

const textProcessorSchema: ToolSchema = {
  name: "textProcessor",
  description:
    "Processes text with various operations like case conversion, trimming, etc.",
  category: "Data Processing",
  version: "1.0.0",
  parameters: {
    text: {
      type: "string",
      description: "The input text to process",
    },
    operation: {
      type: "string",
      description: "The operation to perform on the text",
      enum: ["uppercase", "lowercase", "trim", "capitalize"],
    },
  },
  required: ["text", "operation"],
};

/**
 * A tool for processing text with various operations
 */
export class TextProcessor extends BatTool {
  schema = textProcessorSchema;

  async execute(params: Record<string, any>): Promise<string> {
    this.validateParams(params);
    const { text, operation } = params;

    switch (operation) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "trim":
        return text.trim();
      case "capitalize":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }
}
