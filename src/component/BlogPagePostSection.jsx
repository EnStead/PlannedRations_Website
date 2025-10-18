import { Link } from 'react-router-dom';
import blogPosts from '../Utility/BlogData';

const BlogPagePostSection = ({searchQuery}) => {


  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <section className=" py-18 ssm:py-27 px-8 xsm:px-15 grid ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ssm:gap-5 ml:gap-8 mb-20">
        {filteredPosts.map((post) => (
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
    </section>

  )
}

export default BlogPagePostSection