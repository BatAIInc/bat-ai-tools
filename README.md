# @bat-ai/tools

The official tools framework for BatAI - A Multi-Agent AI System for Node.js. This module allows developers to create and share custom tools that can be used by BatAI agents.

## About

BatAI Tools is a framework that enables the community to create, share, and use custom tools within the BatAI multi-agent system. Each tool represents a specific capability that agents can use to perform tasks, interact with external systems, or process data.

## Installation

```bash
npm install @bat-ai/tools
```

## Creating New Tools

### Tool Structure

A BatAI tool consists of three main parts:

1. Tool Definition
2. Tool Implementation
3. Tool Schema

Here's how to create a new tool:

```typescript
import { BatTool, ToolSchema } from "@bat-ai/tools";

// Define your tool's parameter schema
const myToolSchema: ToolSchema = {
  name: "myTool",
  description: "Description of what your tool does",
  parameters: {
    // Define your tool's parameters here
  },
  required: ["param1", "param2"],
};

// Implement your tool
export class MyTool extends BatTool {
  schema = myToolSchema;

  async execute(params: Record<string, any>): Promise<any> {
    this.validateParams(params);
    // Implement your tool's logic here
  }
}
```

### Tool Guidelines

1. **Schema Definition**

   - Provide clear and concise descriptions for your tool and its parameters
   - Use appropriate parameter types (`string`, `number`, `boolean`, `object`, `array`)
   - Mark required parameters in the `required` array
   - Use enums when parameters have a fixed set of valid values

2. **Implementation**

   - Handle errors gracefully and provide meaningful error messages
   - Validate input parameters before processing
   - Return consistent data structures
   - Document any external dependencies or requirements

3. **Best Practices**
   - Keep tools focused on a single responsibility
   - Provide comprehensive error handling
   - Include usage examples in the documentation
   - Add unit tests for your tool
   - Follow TypeScript best practices for type safety

### Testing Your Tool

Create a test file for your tool (e.g., `myTool.test.ts`):

```typescript
import { MyTool } from "./myTool";

describe("MyTool", () => {
  const tool = new MyTool();

  it("should execute correctly", async () => {
    const result = await tool.execute({
      // test parameters
    });
    expect(result).toBe(/* expected result */);
  });
});
```

## Publishing Your Tool

1. Create a new directory for your tool in the `src/tools` directory
2. Implement your tool following the structure above
3. Add tests to ensure functionality
4. Submit a pull request to the BatAI Tools repository

## Tool Categories

Tools can be organized into different categories:

- **Data Processing**: Tools for manipulating and transforming data
- **API Integration**: Tools for interacting with external APIs
- **File Operations**: Tools for reading, writing, and managing files
- **Network Operations**: Tools for network-related tasks
- **Utility**: General-purpose utility tools

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a new branch for your tool
3. Implement your tool following the guidelines above
4. Add comprehensive tests
5. Submit a pull request

Please ensure your code follows our coding standards and includes appropriate documentation.

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## License

MIT
