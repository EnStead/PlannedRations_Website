import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "../../../assets/Profile.jpg"

const SideModal = ({ open, onOpenChange, selectedRow, title }) => {

    const formatDate = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
    };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        {/* Side Panel */}
        <Dialog.Content className="fixed z-100 top-0 right-0 h-full w-[400px] hide-scrollbar bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
          
            <Dialog.Title className="text-xl text-center font-dash font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700 absolute top-7 right-7 ">
                <X/>
              </button>
            </Dialog.Close>
            <Dialog.Description>
                
            </Dialog.Description>
            {selectedRow && (
            <section className="mt-8" >
                <div className="flex items-center gap-3">
                    <div>
                        <img src={selectedRow.image_url} alt="image" className="rounded-xl w-30" />
                    </div>
                    <div>
                        <h3 className="text-brand-primary font-medium text-lg">{selectedRow.name}</h3>
                        <a href="mailto:" className="text-brand-midtext text-sm underline">{selectedRow.email}</a>
                        <div className="mt-4">
                            <p className="text-brand-subtext text-sm font-medium">
                                Joined: {formatDate(selectedRow.created_at)}
                            </p>
                            <p className="text-sm text-brand-subtext font-light">
                                Family: (Member) Jason Lee Family Plan
                            </p>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-3 gap-y-4 py-3 border-t-brand-offwhite border-b-brand-offwhite  border-l-transparent border-r-transparent border my-4" >
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Plan</p>
                        <h3 className="font-normal capitalize">{selectedRow.plan_code}</h3>
                    </div>
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Renewal Date</p>
                        <h3 className="font-normal">{selectedRow.subscription_end_date}</h3>
                    </div>
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Gender</p>
                        <h3 className="font-normal capitalize">{selectedRow.gender}</h3>
                    </div>
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Ethnicity</p>
                        <h3 className="font-normal capitalize">{selectedRow.ethnicity}</h3>
                    </div>
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Age</p>
                        <h3 className="font-normal">{selectedRow.age}</h3>
                    </div>
                    <div className="text-brand-subtext">
                        <p className="font-light text-sm">Goal Type</p>
                        <h3 className="font-normal capitalize">{selectedRow.age}</h3>
                    </div>
                </div>
                <div>
                    <h3 className="font-dash text-brand-primary font-medium">Goals & Target</h3>
                    <div className="grid grid-cols-2 gap-3 gap-y-4 py-3 border-t-transparent border-b-brand-offwhite  border-l-transparent border-r-transparent border my-4" >
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Current Weight</p>
                            <h3 className="font-normal capitalize">{selectedRow.weight}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Target Weight</p>
                            <h3 className="font-normal">{selectedRow.target}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Goal Focus</p>
                            <h3 className="font-normal capitalize">{selectedRow.goal}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Timeline</p>
                            <h3 className="font-normal capitalize">{selectedRow.timeline}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Daily Calories</p>
                            <h3 className="font-normal">{selectedRow.calories_per_day}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Protein Goal</p>
                            <h3 className="font-normal ">{selectedRow.profile?.nutrition_values?.protein} g</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Carbohydrate Goal</p>
                            <h3 className="font-normal ">{selectedRow.profile?.nutrition_values?.carbohydrates} g</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Fats Goal</p>
                            <h3 className="font-normal ">{selectedRow.profile?.nutrition_values?.fats} g</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Daily Step Goal</p>
                            <h3 className="font-normal ">{selectedRow.step}</h3>
                        </div>
                        <div className="text-brand-subtext">
                            <p className="font-light text-sm">Water Intake Goal</p>
                            <h3 className="font-normal capitalize">{selectedRow.water} l</h3>
                        </div>
                    </div>

                </div>
                <div>
                    <h3 className="font-dash text-brand-primary font-medium">Achievements & Awards</h3>
                    <div className="mt-4">
                        <div>
                            <p className="font-medium text-brand-primary  ">
                                Earned “October Walking Challenge” Badge
                            </p>
                            <span className="font-light text-brand-muted text-xs">
                                Nov 3, 2025
                            </span>

                        </div>

                    </div>


                </div>

            </section>
            )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SideModal;
