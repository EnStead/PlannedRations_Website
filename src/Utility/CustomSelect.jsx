import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({ label, options, value, onChange, classNameLabel, classNameSelect }) => {
  return (
    <div className="w-full">
      <label className={`mb-1 font-medium ${classNameLabel} block`}>{label}</label>

      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className={`w-full flex ${classNameSelect} bg-brand-carhead justify-between items-center border rounded-full px-4 py-3 ${!value ? "text-brand-cartext" : ""}`}>
          <span className="truncate flex-1 text-left">
            <Select.Value placeholder="Select from the options..." />
          </span>
          <Select.Icon className="flex-shrink-0 ml-2">
            <ChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white rounded-xl shadow-lg z-50">
            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="px-4 py-2 rounded-md cursor-pointer hover:bg-brand-secondary/30 outline-0 hover:text-white flex justify-between"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={14} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
