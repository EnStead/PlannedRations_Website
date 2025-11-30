import { ArrowLeft } from 'lucide-react';
import AddRecipeForm from '../../../../Utility/AddRecipeForm';

const AddRecipes = () => {
  return (
    <section className='bg-brand-background1 min-h-screen py-10 px-10 flex gap-8 ' >
      {/* LEFT SECTION */}
      <div className='w-[70%]'>
        {/* TITLE SECTION */}
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-brand-cardhead font-medium flex gap-4'>
              <ArrowLeft /> 
              <p>
                Back
              </p> 
            </div>
            <h2 className='font-dash font-medium text-xl text-brand-primary mt-4 mb-2'>Create Recipe</h2>
            <p className='text-brand-subtext' >Recipe Basics & Information</p>
          </div>
          <p className='font-medium text-brand-step text-sm' >
            Step 1 of 3
          </p>
        </div>

        {/* FORM SECTION */}
        <div className='pt-4'>
          <AddRecipeForm/>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className='w-[30%]'>
        Planned Rations
      </div>
    </section>
  )
}

export default AddRecipes