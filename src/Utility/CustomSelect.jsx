import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({ label, options, value, onChange, classNameLabel }) => {
  return (
    <div className="w-full">
      <label className={`mb-1 font-medium ${classNameLabel} block`}>{label}</label>

      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="w-full flex justify-between items-center border rounded-full px-4 py-3">
          <Select.Value placeholder="Select" />
          <Select.Icon>
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
                  className="px-4 py-2 rounded-md cursor-pointer hover:bg-brand-secondary hover:text-white flex justify-between"
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
