import { AIProvider } from "./aiProvider";

export class GeminiProvider implements AIProvider {
  name = "gemini";

  private client?: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
  }

  private async getClient() {
    if (!this.client) {
      const apiKey = process.env.GEMINI_API_KEY!;

      const { GoogleGenAI } =
        await import("@google/genai");

      this.client = new GoogleGenAI({
        apiKey,
      });
    }

    return this.client;
  }

  async generateInsight(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {

    const client =
      await this.getClient();

    const response =
      await client.models.generateContent({
        model: "gemini-2.5-flash",

        contents: userPrompt,

        config: {
          systemInstruction:
            systemPrompt,

          temperature: 0.2,
        },
      });

    const text = response.text;

    if (!text) {
      throw new Error(
        "Gemini returned an empty response"
      );
    }

    return text;
  }
}