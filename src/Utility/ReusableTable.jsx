import Menu from '../assets/Menu.svg'
import Pen from '../assets/Pen.svg'
import Del from '../assets/Del.svg'
import { useEffect, useRef, useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

const ReusableTable = ({ columns, data, actions = "none", onEdit,menuItems }) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




  return (
    <div className="w-full overflow-x-auto scrollbar-hide">

        <table className="w-full">

            {/* TABLE HEADER */}
            <thead className="bg-brand-carhead border-b border-brand-planoff">
                <tr>
                    {columns.map(col => (
                        <th key={col} className="py-4 px-10 text-left font-medium text-brand-cartext">
                            {col}
                        </th>
                    ))}

                    {actions !== "none" && (
                        <th className="py-4 px-5 text-left"></th>
                    )}
                </tr>
            </thead>

            {/* TABLE ROWS */}
            <tbody>
                {data.map((row, index) => (
                    <tr 
                        key={index}
                        className={`${index % 2 === 0 ? "bg-brand-carhead" : "bg-transparent"} text-brand-subtext`}
                    >

                        {columns.map(col => (
                            <td key={col} className="py-4 px-10  ">
                                {row[col]}
                            </td>
                        ))}

                        {actions !== "none" && (
                            <td className="py-4 px-4 w-[80px] flex justify-end items-center relative">

                                    {actions === "menu" && (
                                        <button
                                        onClick={() => setOpenMenu(openMenu === index ? null : index)}
                                        className="flex-none"
                                        >
                                        <img src={Menu} alt="" className="w-6 h-6" />
                                        </button>
                                    )}

                                    {openMenu === index && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-0 mt-2 w-50 bg-white  rounded-lg shadow-lg p-2 z-50"
                                    >
                                        {menuItems?.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleMenuClick(item.action, row)}
                                            className={
                                            `block px-3 py-2 rounded-md hover:bg-gray-100 text-left w-full
                                            ${item.destructive ? "text-brand-red hover:bg-red-50" : "text-brand-primary"}`
                                            }
                                        >
                                            {item.label}
                                        </button>
                                        ))}
                                    </div>
                                    )}



                                {actions === "editDelete" && (
                                    <div className="flex justify-around gap-10">
                                        <button onClick={onEdit} className="font-medium cursor-pointer">
                                            <img src={Pen} alt="" />
                                        </button>
                                        <button  onClick={() => setDeleteModalOpen(true)} className=" font-medium cursor-pointer">
                                            <img src={Del} alt="" />
                                        </button>
                                    </div>
                                )}

                            </td>
                        )}

                    </tr>
                ))}
            </tbody>
        </table>

        <DeleteConfirmModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => {
                console.log("DELETED");
                setDeleteModalOpen(false);
            }}
        />

    </div>
  )
}

export default ReusableTable