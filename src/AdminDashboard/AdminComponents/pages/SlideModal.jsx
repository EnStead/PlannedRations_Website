import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical, X } from "lucide-react";

const SideModal = ({ open, onOpenChange, selectedRow, title, onReset, onDelete }) => {

    const formatDate = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
    };

  const handleReset = () => {
    if (onReset) onReset();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        {/* Side Panel */}
        <Dialog.Content className="fixed z-100 top-0 right-0 h-full w-full sm:w-[400px] hide-scrollbar bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
          
            {/* Header */}
            <div className="flex items-center justify-between px-1 py-4">
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
                      onSelect={handleReset}
                    >
                      Reset Password
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                      onSelect={handleDelete}
                    >
                      Delete Account
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <Dialog.Title className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                User Details
              </Dialog.Title>

              <Dialog.Close asChild>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
 
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
