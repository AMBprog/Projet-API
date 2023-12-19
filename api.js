import React from 'react';
import ReactDOM from "react-dom";
import './projetapi.css';

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      "role": "user",
      "content": "Write a rap battle between"+Rap1+"and"+Rap2+"."
    }
  ],
  temperature: temp,
  max_tokens: 64,
  top_p: 1,
});