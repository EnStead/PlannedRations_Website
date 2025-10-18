import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import termContent from '../Utility/term.md?raw';

const TermDeetsSection = () => {
  return (
    <section className='text-brand-head max-w-5xl px-7 xsm:px-15 py-15 xsm:py-30 text-lg '   >
        <div 
            className="prose  
            prose-headings:font-heading 
            prose-a:text-brand-midtext 
            prose-a:underline
            prose-ul:text-brand-head 
            sm:prose-headings:text-3xl"
            
        >
            <ReactMarkdown 
                components={{
                    li: ({ node, ...props }) => (
                    <li
                        className=" marker:text-brand-head"
                        {...props}
                    />
                    )
                }}
                rehypePlugins={[rehypeRaw]}            
            >
                {termContent}
            </ReactMarkdown>

        </div>

    </section>
  )
}

export default TermDeetsSection