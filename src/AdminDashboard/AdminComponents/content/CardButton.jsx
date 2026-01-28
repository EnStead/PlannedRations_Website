import Plus from '../../../assets/Plus.svg'
import Download from '../../../assets/Download.svg'
import Document from '../../../assets/Document.svg'
import Clipboard from '../../../assets/Clipboard.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import IngredientModal from '../../../Utility/IngredientModal'
import api from '../../../Utility/api'
import { useToast } from '../../Context/ToastProvider'

const CardButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (form) => {
    try {
      setIsSubmitting(true);
      let dataToSend = form;
      let headers = {};

      if (form.image) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("default_unit", form.default_unit);
        formData.append("description", form.description || "");
        formData.append("image", form.image);
        dataToSend = formData;
        headers = { "Content-Type": "multipart/form-data" };
      }

      await api.post("/admin/ingredients", dataToSend, { headers });

      showToast({
        title: "Success",
        description: "Ingredient created successfully",
        variant: "success",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create ingredient",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardData = [
    {
      image: Plus,
      title: "Add Recipe",
      text: "Create a new recipe and link ingredients",
      path: "/admin/recipes/add-recipe",
    },
    {
      image: Document,
      title: "New Post",
      text: "Publish a blog, story, article or update for users",
      path: "/admin/posts/create",
    },
    {
      image: Clipboard,
      title: "Create Ingredient",
      text: "Add or manage an ingredient in the library",
      action: () => setIsModalOpen(true),
    },
    {
      image: Download,
      title: "Activity Log",
      text: "View the actions taken by you or other admin with to.",
      path: "#",
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {cardData.map((data, index) => {
          const Wrapper = data.path ? Link : "div";
          const props = data.path
            ? { to: data.path }
            : { onClick: data.action };

          return (
            <Wrapper
              key={index}
              {...props}
              className="bg-brand-carhead
                    rounded-xl py-2 px-4 w-full h-fit flex flex-col 
                    justify-between items-start cursor-pointer hover:shadow-lg transition-shadow  "
            >
              <div className="flex items-center justify-start gap-4">
                <div className="p-1 bg-brand-background1 rounded-lg">
                  <img src={data.image} alt="image" />
                </div>
                <div>
                  <h3 className="text-brand-cardhead text-sm font-semibold font-dash mb-2">
                    {data.title}
                  </h3>
                  <p className="text-brand-muted font-light text-[8px]">
                    {data.text}
                  </p>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </section>

      <IngredientModal
        open={isModalOpen}
        mode="add"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />
    </>
  );
};

export default CardButtons