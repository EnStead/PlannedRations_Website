
import { useEffect, useState } from 'react';
// import Navbar from '../component/Navbar'
import BlogPageHeroSection from '../component/BlogPageHeroSection';
import BlogPagePostSection from '../component/BlogPagePostSection';
// import Footer from '../component/Footer'
// import BlogFooterbg from '../assets/BlogFooterbg.jpg'
// import BlogCursor from '../assets/BlogCursor.svg'


const Blog = () => {

    const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
        {/* <Navbar isScrolled={isScrolled} setIsScrolled={setIsScrolled} /> */}
        <BlogPageHeroSection setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <BlogPagePostSection searchQuery={searchQuery} />
        {/* <Footer Footerbg={BlogFooterbg} LeftCard='#F9A720' Cursor={BlogCursor} Tooltip='#9E78F6'/> */}
    </div>
  )
}

export default Blog