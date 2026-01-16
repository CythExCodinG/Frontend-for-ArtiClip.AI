import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostGeneration = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("link"); // link | article | custom
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      contentType: mode === "link" ? "link" : "text",
      value: content,
    };

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("http://localhost:3000/api/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to generate post");
        return;
      }

      navigate("/showpost", { state: { post: data.post } });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6">

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center">
          Generate a Post
        </h1>

        {/* Mode Selector */}
        <div className="flex gap-3">
          {["link", "article", "custom"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setMode(type);
                setContent("");
                setResult(null);
              }}
              className={`flex-1 py-2 rounded-lg border transition
                ${mode === type
                  ? "bg-blue-600 border-blue-500"
                  : "bg-slate-800 border-white/10 hover:bg-slate-700"
                }`}
            >
              {type === "link" && "Article Link"}
              {type === "article" && "Full Article"}
              {type === "custom" && "Custom Text"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Link Input */}
          {mode === "link" && (
            <input
              type="url"
              required
              placeholder="Paste article URL..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Text Area */}
          {(mode === "article" || mode === "custom") && (
            <textarea
              required
              placeholder={
                mode === "article"
                  ? "Paste full article content here..."
                  : "Write your custom content here..."
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={7}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-white/10 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Post"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold">AI Generated Post</h2>
            <div className="bg-slate-800 border border-white/10 rounded-lg p-4 whitespace-pre-wrap">
              {result.aiContent}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PostGeneration;
