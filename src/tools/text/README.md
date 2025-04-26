# Text Processor Tool

A tool for performing various text processing operations like case conversion, trimming, and capitalization.

## Features

- Convert text to uppercase
- Convert text to lowercase
- Trim whitespace from text
- Capitalize text (first letter uppercase, rest lowercase)

## Usage

```typescript
import { TextProcessor } from "@bat-ai/tools";

const processor = new TextProcessor();

// Convert to uppercase
const upper = await processor.execute({
  text: "hello world",
  operation: "uppercase",
});
// Result: 'HELLO WORLD'

// Convert to lowercase
const lower = await processor.execute({
  text: "HELLO WORLD",
  operation: "lowercase",
});
// Result: 'hello world'

// Trim whitespace
const trimmed = await processor.execute({
  text: "  hello world  ",
  operation: "trim",
});
// Result: 'hello world'

// Capitalize text
const capitalized = await processor.execute({
  text: "hello WORLD",
  operation: "capitalize",
});
// Result: 'Hello world'
```

## Parameters

| Parameter | Type   | Required | Description                          | Example Values                                 |
| --------- | ------ | -------- | ------------------------------------ | ---------------------------------------------- |
| text      | string | Yes      | The input text to process            | 'hello world'                                  |
| operation | string | Yes      | The operation to perform on the text | 'uppercase', 'lowercase', 'trim', 'capitalize' |

## Error Handling

The tool will throw errors in the following cases:

- Missing required parameters
- Invalid operation type
- Invalid parameter types

Example error handling:

```typescript
try {
  await processor.execute({
    text: "hello",
    operation: "invalid",
  });
} catch (error) {
  console.error(error.message);
  // Output: Parameter operation must be one of: uppercase, lowercase, trim, capitalize
}
```

## Testing

The tool includes comprehensive tests covering:

- Parameter validation
- All supported operations
- Error cases

To run the tests:

```bash
npm test
```

## Contributing

If you'd like to add new text processing operations:

1. Add the new operation to the schema's enum list
2. Implement the operation in the execute method
3. Add tests for the new operation
4. Update this documentation
5. Submit a pull request
