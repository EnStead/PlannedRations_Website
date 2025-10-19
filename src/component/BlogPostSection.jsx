import { Link, useParams } from "react-router-dom";
import blogPosts from "../Utility/BlogData";
import Facebook from "../assets/BlogFacebook.svg"
import BlogLink from "../assets/Bloglink.svg"
import Linkedin from "../assets/Bloglinkedin.svg"
import Twitter from "../assets/Blogtwitter.svg"
import Instagram from "../assets/Bloginstagram.svg"
import BlogBackground from "../assets/Blogbackground.jpg"
import { useEffect, useState } from "react";
import axios from "axios";

const BlogPostSection = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommend, setLoadingRecommend] = useState(true); 
  // Fetch single blog
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.plannedrations.com/api/web/get-blog/${id}`);
      setPost(res.data.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recommended blogs
  const fetchRecommended = async () => {
    try {
      setLoadingRecommend(true);
      const res = await axios.get("https://api.plannedrations.com/api/web/get-recommend?limit=4");
      let recommendedData = res.data.data || [];

      // Remove the current post from the recommended list
      recommendedData = recommendedData.filter((r) => r.id !== id);

      setRecommended(recommendedData);
    } catch (err) {
      console.error("Error fetching recommended blogs:", err);
    } finally {
      setLoadingRecommend(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRecommended();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-brand-head font-semibold text-xl">
          Loading blog post...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 mt-20 text-brand-head">
        <p className="font-bold text-3xl mb-8" >Post not found.</p>
        <Link to="/blog" className="text-brand-orange underline">
          Go back
        </Link>
      </div>
    );
  }
    

  return (
    <div className="font-sans text-brand-text">
      {/* --- HERO SECTION --- */}
      <section
        className="relative h-[70vh] w-full  overflow-hidden"
      >
        <img
          src={post.thumbnail_url || BlogBackground}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white max-w-3xl">
          <h1 className=" text-3xl sm:text-5xl font-bold leading-tight mb-2 ">{post.title}</h1>
          <p className="text-sm opacity-80"> {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            • {post.rreading_time}
          </p>
        </div>
      </section>

      {/* --- CONTENT + SIDEBAR --- */} 
      <section className=" grid grid-cols-1 md:grid-cols-3 gap-10 py-20 px-7 xsm:px-15">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div
            className="prose prose-headings:font-heading prose-a:text-brand-midtext prose-a:underline prose-ul:text-brand-head"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          ></div>
        </div>

        {/* Sidebar */}
        <div className=" md:border-0 border-t-1 border-brand-planoff md:col-span-1">
          <div className="sticky top-32">
            <h3 className="font-semibold text-lg mb-4 pt-4 md:pt-0  text-brand-cardhead">
              Share This Blog
            </h3>
            <div className="flex gap-4 text-brand-cardhead text-2xl">
              <img src={BlogLink} className="  transition" />
              <Link>
                <img src={Facebook} className="cursor-pointer hover:scale-200 transition" />              
              </Link>
              <Link>
                <img src={Linkedin} className="cursor-pointer hover:scale-200 transition" />              
              </Link>
              <Link>
                <img src={Twitter} className="cursor-pointer hover:scale-200 transition" />              
              </Link>
              <Link to={`https://www.instagram.com/plannedrations`}>
                <img src={Instagram} className="cursor-pointer hover:scale-200 transition" />              
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECOMMENDED BLOGS --- */}
      <section className="px-7 xsm:px-15 pb-20">
        <h2 className=" text-xl sm:text-3xl font-bold mb-10 text-brand-cardhead">
          Recommended for you
        </h2>
        {
          loadingRecommend ? (   <p className="text-center text-brand-head font-medium text-xl">Loading recommendations...</p>
          ) : recommended.length === 0 ? (
            <p className="text-center text-brand-head font-medium text-xl">No recommendations available.</p>
          ) : (

            <div className="grid ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recommended.map((post) => (
                <div
                    key={post.id}
                    className="bg-transparent overflow-hidden flex flex-col"
                >
                <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-40 ssm:h-33 xsm:h-43 rounded-2xl object-cover"
                />

                <div className="flex flex-col flex-grow py-3">
                    <p className=" text-[10px] ml:text-xs text-brand-orange font-medium mb-1">              {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      &#8226; {post.reading_time}
                    </p>
                    <h3 className=" text-base ml:text-xl font-semibold mb-1 text-brand-cardhead font-heading">
                        {post.title}
                    </h3>

                    {/* Spacer to push button down */}
                    <div className="mt-auto border-t border-brand-planoff pt-1 ">
                        <Link to={`/blog/${post.id}`} className="w-full cursor-pointer flex justify-between items-center text-sm font-bold text-brand-offpurple">
                            <div>Read Blog</div>
                            <div className="text-2xl">→</div>
                        </Link>
                    </div>
                </div>
                </div>
              ))}
            </div>

          )
        }
      </section>
    </div>
  )
}

export default BlogPostSection