const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: `Write a detailed blog post on: ${topic}` }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ blog: response.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err.message);
    res.status(500).json({ error: "OpenAI API call failed" });
  }
});

app.listen(5000, () => console.log("Backend running at http://localhost:5000"));