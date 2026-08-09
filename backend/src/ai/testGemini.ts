import "dotenv/config";

import { GeminiProvider } from "./providers/gemini.provider";
import {
  buildAIContext,
  AnalyticsData,
} from "./contextBuilder";
import {
  buildSystemPrompt,
  buildUserPrompt,
} from "./promptBuilder";
import {
  aiInsightSchema,
} from "../validation/ai.validation";

async function test() {

  const analytics: AnalyticsData = {
    campaign: {
      id: "test-campaign",
      name: "Testing",
      destinationUrl: "https://google.com",
      trackingLink:
        "http://localhost:5000/r/testing-a4pws",
      createdAt: new Date("2026-08-03T13:42:56.598Z"),
    },

    summary: {
      totalClicks: 8,
      uniqueVisitors: 2,
      lastClick:
        new Date("2026-08-04T11:25:04.223Z"),
    },

    timeline: [
      {
        date: "2026-08-03",
        clicks: 7,
      },
      {
        date: "2026-08-04",
        clicks: 1,
      },
    ],

    devices: [
      {
        device: "DESKTOP",
        count: 8,
      },
    ],

    browsers: [
      {
        browser: "Unknown",
        count: 8,
      },
    ],

    countries: [
      {
        country: "Unknown",
        count: 8,
      },
    ],

    referrers: [
      {
        referrer: "Direct",
        count: 8,
      },
    ],
  };

  const context =
    buildAIContext(analytics);

  console.log(
    "\n===== AI CONTEXT =====\n"
  );

  console.log(
    JSON.stringify(
      context,
      null,
      2
    )
  );

  const provider =
    new GeminiProvider();

const response =
  await provider.generateInsight(
    buildSystemPrompt(),
    buildUserPrompt(context)
  );

console.log(
  "\n===== RAW GEMINI RESPONSE =====\n"
);

console.log(response);

let parsedResponse: unknown;

try {
  parsedResponse = JSON.parse(response);
} catch {
  throw new Error(
    "Gemini did not return valid JSON"
  );
}

const validated =
  aiInsightSchema.parse(
    parsedResponse
  );

console.log(
  "\n===== VALIDATED AI INSIGHT =====\n"
);

console.log(
  JSON.stringify(
    validated,
    null,
    2
  )
);
}

test().catch((error) => {

  console.error(
    "\n===== TEST FAILED =====\n"
  );

  console.error(error);

});