import React from 'react'

const BlogPageHeroSection = ({searchQuery,setSearchQuery}) => {


  return (
        
    <section className="text-center mt-22 mb-12 px-4">
        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-brand-primary mb-4">
            Discover our latest news
        </h1>
        <p className=" font-sans font-normal text-lg sm:text-2xl text-brand-subtext max-w-2xl mx-auto">
            Tips, guides, and insights to help you eat smarter, save money, and to make food enjoyable and fun.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center gap-2">
            <input
                type="text"
                placeholder="Find relevant blog topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
            <button className="bg-brand-secondary text-white text-sm sm:text-base px-5 sm:px-10 py-2  rounded-2xl font-medium hover:opacity-90 transition">
                Search
            </button>
        </div>
    </section>
  )
}

export default BlogPageHeroSection