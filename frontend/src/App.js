import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [blog, setBlog] = useState("");

  const generateBlog = async () => {
    const res = await axios.post("http://localhost:5000/api/generate", { topic });
    setBlog(res.data.blog);
  };

  return (
    <div className="container">
      <h1>🧠 InkwellAI - Content Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter blog topic..."
      />
      <button onClick={generateBlog}>Generate</button>
      <div className="output">
        <h3>Generated Blog:</h3>
        <pre>{blog}</pre>
      </div>
    </div>
  );
}

export default App;