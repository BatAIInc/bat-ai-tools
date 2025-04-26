import { TextProcessor } from "./TextProcessor";

describe("TextProcessor", () => {
  const processor = new TextProcessor();

  describe("parameter validation", () => {
    it("should throw error for missing required parameters", async () => {
      await expect(processor.execute({})).rejects.toThrow(
        "Missing required parameter: text"
      );

      await expect(processor.execute({ text: "hello" })).rejects.toThrow(
        "Missing required parameter: operation"
      );
    });

    it("should throw error for invalid operation", async () => {
      await expect(
        processor.execute({
          text: "hello",
          operation: "invalid",
        })
      ).rejects.toThrow(
        "Parameter operation must be one of: uppercase, lowercase, trim, capitalize"
      );
    });
  });

  describe("text operations", () => {
    it("should convert text to uppercase", async () => {
      const result = await processor.execute({
        text: "hello world",
        operation: "uppercase",
      });
      expect(result).toBe("HELLO WORLD");
    });

    it("should convert text to lowercase", async () => {
      const result = await processor.execute({
        text: "HELLO WORLD",
        operation: "lowercase",
      });
      expect(result).toBe("hello world");
    });

    it("should trim text", async () => {
      const result = await processor.execute({
        text: "  hello world  ",
        operation: "trim",
      });
      expect(result).toBe("hello world");
    });

    it("should capitalize text", async () => {
      const result = await processor.execute({
        text: "hello WORLD",
        operation: "capitalize",
      });
      expect(result).toBe("Hello world");
    });
  });
});
