export interface AIProvider {
  name: string;

  generateInsight(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string>;
}