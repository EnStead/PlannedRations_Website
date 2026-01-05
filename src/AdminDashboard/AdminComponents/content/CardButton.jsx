import Plus from '../../../assets/Plus.svg'
import Download from '../../../assets/Download.svg'
import Document from '../../../assets/Document.svg'
import Clipboard from '../../../assets/Clipboard.svg'
import { Link } from 'react-router'


const cardData = [
    {
        image: Plus,
        title: "Add Recipe",
        text: "Create a new recipe and link ingredients"
    },
    {
        image: Document,
        title: "New Post",
        text: "Publish a blog, story, article or update for users"
    },
    {
        image: Clipboard,
        title: "Create Ingredient",
        text: "Add or manage an ingredient in the library"
    },
    {
        image: Download,
        title: "Export Report",
        text: "Generate PDF summary of analytics"
    },
]

const CardButtons = () => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ' >
        
        {
            cardData.map((data,index) => (

                <Link key={index} className='bg-brand-carhead
                    rounded-xl py-2 px-4 w-full h-fit flex flex-col 
                    justify-between items-start cursor-pointer hover:shadow-lg transition-shadow  '
                >
                    <div className='flex items-center justify-start gap-4'>
                        <div className='p-1 bg-brand-background1 rounded-lg' >
                            <img src={data.image} alt="image" />
                        </div>
                        <div>
                            <h3 className='text-brand-cardhead text-sm font-semibold font-dash mb-2'>
                                {data.title}
                            </h3>
                            <p className='text-brand-muted font-light text-[8px]'>
                                {data.text}
                            </p>
                        </div>
                    </div>
                </Link>

            ))
        }



    </section>
  )
}

export default CardButtons