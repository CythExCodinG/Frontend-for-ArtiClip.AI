import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import { showPostNavItems } from '../constants'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const emojis = ["📝", "✨", "🔥", "💡", "🚀", "🤖", "📌", "✅"];

const ShowPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPost = location.state?.post;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);

  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalTextRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    ...showPostNavItems,
    { label: "Logout", onClick: handleLogout }
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/data", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setHistory(data.posts || []); // Adjust based on actual API response structure
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useGSAP(() => {
    if (expandedPost && modalRef.current) {
      // Animate Modal In
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(modalContentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
      );

      // Simple text reveal animation (staggered lines/paragraphs if possible, or just the block)
      gsap.fromTo(modalTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [expandedPost]);

  const closeExpandedView = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setExpandedPost(null)
      });
    } else {
      setExpandedPost(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar navItems={navItems} />

      <div className="container mx-auto px-4 py-8 mt-20 space-y-12">

        {/* Current Result Section */}
        {currentPost && (
          <div className="max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-xl p-8 shadow-xl mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎉</span>
              <h1 className="text-3xl font-bold text-blue-400">Just Generated</h1>
            </div>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed text-slate-300 bg-slate-950/50 p-6 rounded-lg border border-white/5">
              {currentPost.aiContent || currentPost}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
              <button
                onClick={() => navigate('/postgenerator')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 transition"
              >
                Generate Another
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPost.aiContent || currentPost);
                  alert('Copied to clipboard!');
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Copy Text
              </button>
            </div>
          </div>
        )}

        {/* History Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📚</span> Your History
          </h2>

          {loading ? (
            <div className="text-gray-400">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="text-gray-400">No history found. Generate something!</div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x p-2">
              {history.map((post, index) => (
                <div
                  key={index}
                  onClick={() => setExpandedPost(post)}
                  className="min-w-[300px] max-w-[300px] bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition snap-start cursor-pointer hover:scale-[1.02] transform duration-200"
                >
                  <div>
                    <div className="text-4xl mb-4">{emojis[index % emojis.length]}</div>
                    <p className="text-slate-300 line-clamp-6 text-sm mb-4 pointer-events-none">
                      {post.aiContent || post.content || "No content"}
                    </p>
                  </div>
                  <div className="text-blue-500 text-sm mt-2 font-medium">Click to view full</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Modal */}
      {expandedPost && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeExpandedView}
        >
          <div
            ref={modalContentRef}
            className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeExpandedView}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 bg-white/5 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">
              Full Post
            </h2>

            <div
              ref={modalTextRef}
              className="prose prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed text-slate-300 overflow-y-auto custom-scrollbar p-2"
            >
              {expandedPost.aiContent || expandedPost.content}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(expandedPost.aiContent || expandedPost.content);
                  alert('Copied to clipboard!');
                }}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Copy Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowPost