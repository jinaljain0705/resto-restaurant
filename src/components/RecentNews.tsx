import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, X, Clock, Quote } from "lucide-react";
import { NewsPost } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function RecentNews() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error loading news posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
          <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
            Recent News
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Our Latest Culinary Stories
          </h2>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded" />
          <p className="font-sans text-sm text-slate-400">
            Stay updated with our master kitchen processes, signature cocktails mixology guides, and community initiatives.
          </p>
        </div>

        {/* Loading placeholder */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            <span className="font-sans text-xs text-slate-400">Fetching articles...</span>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-100 text-rose-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    {/* Date and Author */}
                    <div className="flex items-center space-x-4 text-slate-400 font-sans text-[11px] font-semibold">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-800 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author and Trigger action */}
                  <div className="pt-5 mt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full border border-slate-100 object-cover"
                      />
                      <span className="font-sans text-xs font-semibold text-slate-600">
                        {post.author.name}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-rose-600 hover:text-rose-700 font-sans text-xs font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Full Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              {/* Blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[85vh] flex flex-col relative z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-20 bg-slate-900/40 hover:bg-slate-900/60 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner Photo */}
                <div className="relative h-56 sm:h-64 bg-slate-100 shrink-0">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Category and date on image */}
                  <div className="absolute bottom-4 left-6 text-left space-y-1">
                    <span className="bg-rose-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {selectedPost.category}
                    </span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                      {selectedPost.title}
                    </h3>
                  </div>
                </div>

                {/* Scroller Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
                  {/* Author profile and metadata */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedPost.author.avatar}
                        alt={selectedPost.author.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-sans text-xs font-bold text-slate-800 block">
                          {selectedPost.author.name}
                        </span>
                        <span className="font-sans text-[10px] text-slate-400 block">
                          Executive Contributor
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-[11px] font-semibold text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-500" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Callout quote */}
                  <div className="bg-rose-50/50 border-l-4 border-rose-600 p-4 rounded-r-2xl flex items-start space-x-3">
                    <Quote className="w-8 h-8 text-rose-200 shrink-0 rotate-180" />
                    <p className="font-serif italic text-sm text-rose-900 leading-relaxed">
                      "{selectedPost.excerpt}"
                    </p>
                  </div>

                  {/* Main Paragraph */}
                  <p className="font-sans text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end shrink-0">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-all cursor-pointer"
                  >
                    Close Story
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
