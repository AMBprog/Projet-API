import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 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,
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      "role": "user",
      "content": "Write a rap battle between " +Rap1+ " and " +Rap2+ "."
    }
  ],
  temperature: Temp,
  max_tokens: 64,
  top_p: 1,
});