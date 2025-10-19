import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

const BlogPagePostSection = ({searchQuery}) => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.plannedrations.com/api/web/get-blogs?page=${pageNumber}`);
      const data = res.data.data;
      setPosts(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

    const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-brand-head font-semibold text-xl">Loading blog posts...</p>
        </div>
    );
  }


  if (filteredPosts.length === 0) {
    return (
      <div className="py-20 text-center font-bold text-3xl mb-8 text-brand-head">
        No blog posts found.
      </div>
    );
  }


  return (
    <section className=" py-18 ssm:py-27 px-8 xsm:px-15 mb-20">
        
        {

            loading ? (
                <p className="text-center text-brand-head font-medium text-xl ">Loading...</p>
            ) : (
            <>
                <div className="grid ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ssm:gap-5 ml:gap-8">
                    {filteredPosts.map((post) => (
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
                            <p className=" text-[10px] ml:text-xs text-brand-orange font-medium mb-1">
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                                })} &#8226; {post.reading_time}
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
                {/* Pagination controls */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                    onClick={() => page > 1 && fetchBlogs(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-brand-secondary text-white disabled:opacity-40"
                    >
                    Previous
                    </button>

                    <span className="text-brand-head font-medium">
                    Page {page} of {lastPage}
                    </span>

                    <button
                    onClick={() => page < lastPage && fetchBlogs(page + 1)}
                    disabled={page === lastPage}
                    className="px-4 py-2 rounded-lg bg-brand-secondary text-white disabled:opacity-40"
                    >
                    Next
                    </button>
                </div>
            </>)

        }
        
    </section>

  )
}

export default BlogPagePostSection