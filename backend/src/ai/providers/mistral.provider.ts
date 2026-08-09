import { AIProvider } from "./aiProvider";

export class MistralProvider
  implements AIProvider {

  name = "mistral";

  async generateInsight(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {

    const apiKey =
      process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      throw new Error(
        "MISTRAL_API_KEY is not configured"
      );
    }

    const response =
      await fetch(
        "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${apiKey}`,
          },

          body: JSON.stringify({
            model: "mistral-small-latest",

            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],

            temperature: 0.2,

            response_format: {
              type: "json_object",
            },
          }),
        }
      );

    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        `Mistral API error ${response.status}: ${errorText}`
      );
    }

    const data =
      await response.json();

    const text =
      data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error(
        "Mistral returned an empty response"
      );
    }

    return text;
  }
}