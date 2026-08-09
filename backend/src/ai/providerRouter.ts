import { AIProvider } from "./providers/aiProvider";

import { GeminiProvider } from "./providers/gemini.provider";
import { GroqProvider } from "./providers/groq.provider";
import { MistralProvider } from "./providers/mistral.provider";

import {
  aiInsightSchema,
} from "../validation/ai.validation";


export class AIProviderRouter
  implements AIProvider {

  name = "router";

  private providers: AIProvider[];

  constructor() {

    this.providers = [
      new GeminiProvider(),
      new GroqProvider(),
      new MistralProvider(),
    ];

  }

  async generateInsight(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {

    const errors: string[] = [];

    for (
      const provider of this.providers
    ) {

      try {

        console.log(
          `Trying AI provider: ${provider.name}`
        );


        // Call provider

        const result =
          await provider.generateInsight(
            systemPrompt,
            userPrompt
          );


        // Parse response

        let parsed: unknown;

        try {

          parsed = JSON.parse(result);

        } catch {

          throw new Error(
            "Provider returned invalid JSON"
          );

        }


        // Validate response

        aiInsightSchema.parse(parsed);


        console.log(
          `AI provider succeeded: ${provider.name}`
        );


        // Return original JSON string
        // because aiInsight.service will
        // parse/validate it again.

        return result;


      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "Unknown provider error";


        console.error(
          `AI provider failed: ${provider.name}`,
          message
        );


        errors.push(
          `${provider.name}: ${message}`
        );

      }

    }


    throw new Error(
      `All AI providers failed.\n${errors.join("\n")}`
    );

  }

}