import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { useMemo, useState } from "react";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  classNameLabel,
  classNameSelect,
  formatOption,
  searchable = false,
  searchPlaceholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getOptValue = (opt) => {
    if (typeof opt === "object" && opt !== null) {
      const val = opt.slug ?? opt.id ?? opt.name;
      return val !== undefined && val !== null ? String(val) : String(opt);
    }
    return String(opt);
  };

  const getOptLabel = (opt) => {
    if (typeof opt === "object" && opt !== null) {
      const val = opt.name ?? opt.title ?? opt.label ?? opt.slug;
      return val !== undefined && val !== null ? String(val) : String(opt);
    }
    return String(opt);
  };

  const getOptDesc = (opt) => {
    if (typeof opt === "object" && opt !== null) {
      return opt.description ?? opt.subtext ?? null;
    }
    return null;
  };

  const selectedLabel = () => {
    if (value === undefined || value === null || value === "") return undefined;
    const selectedOpt = options.find((opt) => getOptValue(opt) === String(value));
    const labelStr = selectedOpt !== undefined ? getOptLabel(selectedOpt) : String(value);
    return formatOption ? formatOption(labelStr) : labelStr;
  };

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;

    const normalizedSearch = searchTerm.trim().toLowerCase();
    return options.filter((option) => {
      const optionLabel = getOptLabel(option);
      return optionLabel.toLowerCase().includes(normalizedSearch);
    });
  }, [options, searchTerm, searchable]);

  return (
    <div className="w-full">
      <label className={`mb-1 font-medium ${classNameLabel} block`}>{label}</label>

      <Select.Root
        value={value !== undefined && value !== null ? String(value) : ""}
        onValueChange={(selectedValue) => {
          onChange(selectedValue);
          if (searchable) setSearchTerm("");
        }}
        onOpenChange={(open) => {
          if (!open && searchable) setSearchTerm("");
        }}
      >
        <Select.Trigger className={`w-full flex ${classNameSelect} bg-brand-carhead justify-between items-center border rounded-full px-4 py-3 ${!value ? "text-brand-cartext" : ""}`}>
          <span className="truncate flex-1 text-left">
            <Select.Value placeholder="Select from the options...">
              {selectedLabel() || "Select from the options..."}
            </Select.Value>
          </span>
          <Select.Icon className="flex-shrink-0 ml-2">
            <ChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content 
            position="popper" 
            sideOffset={4} 
            className="bg-white rounded-xl shadow-lg z-[100] max-h-60 overflow-y-auto w-[var(--radix-select-trigger-width)]"
          >
            <Select.Viewport className="p-2">
              {searchable && (
                <div className="px-2 pb-2 sticky top-0 bg-white z-[101]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder={searchPlaceholder}
                    className="w-full border border-brand-planoff rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              )}

              {filteredOptions.map((option, idx) => {
                const optVal = getOptValue(option);
                const optLabel = getOptLabel(option);
                const optDesc = getOptDesc(option);

                return (
                  <Select.Item
                    key={optVal || idx}
                    value={optVal}
                    className="px-4 py-2 rounded-md cursor-pointer hover:bg-brand-secondary/30 outline-0 hover:text-white flex justify-between items-center"
                  >
                    <div className="flex flex-col text-left">
                      <Select.ItemText>{formatOption ? formatOption(optLabel) : optLabel}</Select.ItemText>
                      {optDesc && (
                        <span className="text-xs opacity-70 font-light mt-0.5">{optDesc}</span>
                      )}
                    </div>
                    <Select.ItemIndicator>
                      <Check size={14} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}

              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-sm text-brand-muted">
                  No options found
                </div>
              )}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
