import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { X, MoreVertical, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";
import RecipeImg from "../../../assets/RecipeImg.png";

const TagSideModal = ({ open, onOpenChange, tag, onEdit, onDelete }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tag-details", tag],
    queryFn: () => api.get(`/admin/tags/${tag}`).then((res) => res.data.data),
    enabled: !!tag && open,
  });

  const handleEdit = () => {
    if (onEdit) onEdit(data);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(data);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {/* {isLoading && (
          <p className="text-sm text-brand-muted">Loading recipe...</p>
        )} */}

        {isError && (
          <p className="text-sm text-red-500">Failed to load recipe details</p>
        )}

        {data && (
          <Dialog.Portal>
            {/* Overlay */}
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

            {/* Modal Content */}
            <Dialog.Content className="fixed z-50 top-0 right-0 h-full w-full sm:w-[400px] hide-scrollbar transform  bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white relative rounded-lg shadow-lg border border-gray-200 p-2 min-w-[160px] z-100">
                      <DropdownMenu.Item
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none"
                        onSelect={handleEdit}
                      >
                        Edit Tag
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                        onSelect={handleDelete}
                      >
                        Delete Recipe
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Dialog.Title className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                  Tag Details
                </Dialog.Title>

                <Dialog.Close asChild>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800">
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description></Dialog.Description>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Recipe Info */}

                <div className="px-6 pb-4 grid grid-cols-2 gap-4 text-brand-subtext border-b border-brand-planoff">
                  <div className="">
                    <span className="text-sm text-brand-subtext font-light">
                      Title
                    </span>
                    <h2 className="text-base font-normal text-brand-subtext mt-2">
                      {data?.title}
                    </h2>
                  </div>
                  <div className="">
                    <span className="text-sm font-light">Tag Morality</span>
                    <p className="mt-2">{data.good_for ? "True" : "False"}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light">Category</span>
                    <p className="mt-2">{data.category}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light ">Sub Category</span>
                    <p className="mt-2">{data.sub_category}</p>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <span className="text-sm text-brand-subtext font-light">
                    Description
                  </span>
                  <p className="text-base font-normal text-brand-subtext mt-2">
                    {data?.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="px-6 pb-4 grid grid-cols-2 gap-4 text-brand-subtext border-b border-brand-planoff">
                  <div className="">
                    <span className="text-sm font-light">Category</span>
                    <p className="mt-2">{data.category}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light ">Sub Category</span>
                    <p className="mt-2">{data.sub_category}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light ">Blog Usage</span>
                    <p className="mt-2">{data.usage?.blogs}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light">Recipe Usage</span>
                    <p className="mt-2">{data.usage?.recipes}</p>
                  </div>
                  <div className="">
                    <span className="text-sm font-light ">Challenge Usage</span>
                    <p className="mt-2">{data.usage?.challenges}</p>
                  </div>
                </div>

                <h2 className="px-6 pt-5 pb-2 font-dash font-medium text-brand-primary">
                  Usage Details
                </h2>

                <Accordion.Root
                  type="single"
                  collapsible
                  className="w-full px-6"
                >
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger
                        className="
                          flex w-full items-center justify-between py-3
                          text-sm font-medium text-brand-primary
                          hover:bg-gray-50 transition 
                        "
                      >
                        Blogs
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className=" pb-4 text-sm text-brand-subtext">
                      {data.usage_details?.blogs?.items?.length > 0 ? (
                        data.usage_details.blogs.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 bg-brand-offwhite p-2 rounded-lg mb-2"
                          >
                            <img
                              src={item.image_url || RecipeImg}
                              className="w-10 h-10 rounded-lg object-cover"
                              alt=""
                            />
                            <div>
                              <p className="text-sm text-brand-primary font-medium">
                                {item.title || item.name}
                              </p>
                              <span className="text-xs text-brand-subtext font-light">
                                Blog
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-brand-muted italic">
                          No blogs linked
                        </p>
                      )}
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="item-2">
                    <Accordion.Header>
                      <Accordion.Trigger
                        className="
                          flex w-full items-center justify-between py-3
                          text-sm font-medium text-brand-primary
                          hover:bg-gray-50 transition 
                        "
                      >
                        Recipes
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className=" pb-4 text-sm text-brand-subtext">
                      {data.usage_details?.recipes?.items?.length > 0 ? (
                        data.usage_details.recipes.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 bg-brand-offwhite p-2 rounded-lg mb-2"
                          >
                            <img
                              src={item.image_url || RecipeImg}
                              className="w-10 h-10 rounded-lg object-cover"
                              alt=""
                            />
                            <div>
                              <p className="text-sm text-brand-primary font-medium">
                                {item.name}
                              </p>
                              <span className="text-xs text-brand-subtext font-light">
                                Recipe
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-brand-muted italic">
                          No recipes linked
                        </p>
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </>
  );
};

export default TagSideModal;
