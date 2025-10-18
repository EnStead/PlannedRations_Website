import { Link, useParams } from "react-router-dom";
import blogPosts from "../Utility/BlogData";
import Facebook from "../assets/BlogFacebook.svg"
import BlogLink from "../assets/Bloglink.svg"
import Linkedin from "../assets/Bloglinkedin.svg"
import Twitter from "../assets/Blogtwitter.svg"
import Instagram from "../assets/Bloginstagram.svg"
import BlogBackground from "../assets/Blogbackground.jpg"
import { useEffect, useState } from "react";

const BlogPostSection = () => {

  const { id } = useParams();
  const [recommended, setRecommended] = useState([]);

  
  // Scroll to top on mount
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  // Pick 4 random posts for recommended section
  useEffect(() => {
    // Filter out the current post and shuffle randomly
    const filtered = blogPosts.filter((p) => p.id.toString() !== id.toString());
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setRecommended(selected);
  }, [id, blogPosts]);
  
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Post not found.</p>
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
          src={BlogBackground}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white max-w-3xl">
          <h1 className=" text-3xl sm:text-5xl font-bold leading-tight mb-2 ">{post.title}</h1>
          <p className="text-sm opacity-80">{post.date} • {post.time}</p>
        </div>
      </section>

      {/* --- CONTENT + SIDEBAR --- */} 
      <section className=" grid grid-cols-1 md:grid-cols-3 gap-10 py-20 px-7 xsm:px-15">
        {/* Main Content */}
        <div className="md:col-span-2">
          <p className="text-brand-subtext leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
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
        <div className="grid ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recommended.map((post) => (
            <div
                key={post.id}
                className="bg-transparent overflow-hidden flex flex-col"
            >
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 ssm:h-33 xsm:h-43 rounded-2xl object-cover"
            />

            <div className="flex flex-col flex-grow py-3">
                <p className=" text-[10px] ml:text-xs text-brand-orange font-medium mb-1">{post.date} &#8226; {post.time}</p>
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
      </section>
    </div>
  )
}

export default BlogPostSection