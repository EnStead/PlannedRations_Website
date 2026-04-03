import Pen from "../assets/Pen.svg";
import Del from "../assets/Del.svg";
import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

const ReusableTable = ({
  columns,
  data,
  actions = "none",
  onEdit,
  menuItems,
  onDelete,
  onAction,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setAnimateIn(false);
    const frame = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(frame);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (action, row) => {
    setOpenMenu(null);
    onAction?.(action, row);
  };

  return (
    <div className="w-full h-[85vh] overflow-auto hide-scrollbar">
      <table className="w-full">
        {/* TABLE HEADER */}
        <thead className="bg-brand-carhead border-b border-brand-planoff">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-4 px-10 text-left font-medium text-brand-cartext"
              >
                {col.label}
              </th>
            ))}

            {actions !== "none" && <th className="py-4 px-5 text-left" />}
          </tr>
        </thead>

        {/* TABLE ROWS */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`group relative ${openMenu === index ? "z-30" : "z-0"} ${index % 2 === 0 ? "bg-brand-carhead" : "bg-transparent"} text-brand-subtext text-sm transition-all duration-300 ease-out ${
                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${Math.min(index * 35, 280)}ms` }}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className={`py-4 px-10 transition-colors duration-200 group-hover:bg-brand-secondary/5 ${col.className || ""}`}
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] ?? "-")}
                </td>
              ))}

              {actions !== "none" && (
                <td className="py-2 px-1 w-[80px] align-middle text-right relative overflow-visible z-40">
                  {actions === "menu" && (
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <MoreVertical size={20} className="text-brand-subtext" />
                    </button>
                  )}

                  {openMenu === index && (
                    <div
                      ref={menuRef}
                      className={`absolute right-0 w-50 bg-white rounded-lg shadow-lg p-2 z-[120] ${
                        index >= data.length - 3 ? "bottom-full mb-2" : "top-full mt-2"
                      }`}
                    >
                      {menuItems?.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleMenuClick(item.action, row)}
                          className={`block px-3 py-2 rounded-md hover:bg-gray-100 text-left w-full
                                        ${item.destructive ? "text-brand-red hover:bg-red-50" : "text-brand-primary"}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {actions === "editDelete" && (
                    <div className="flex w-full justify-between items-center gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="font-medium cursor-pointer"
                      >
                        <img
                          src={Pen}
                          alt="Pen"
                          className="w-20 h-7 object-contain"
                        />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className=" font-medium cursor-pointer"
                      >
                        <img
                          src={Del}
                          alt="DEL"
                          className="w-20 h-7 object-contain"
                        />
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
