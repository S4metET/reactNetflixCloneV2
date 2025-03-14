import { useState, useEffect } from "react";
import { MdMovie } from "react-icons/md";
import { FaHome, FaBookmark } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { GiTv } from "react-icons/gi";
import profileImage from "../image/user.svg";

const Sidebar = ({ navigate }) => {
    const [activePath, setActivePath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePathChange = () => {
            setActivePath(window.location.pathname);
        };

        window.addEventListener("popstate", handlePathChange);
        return () => window.removeEventListener("popstate", handlePathChange);
    }, []);

    const handleMenuChange = (e) => {
        e.preventDefault();
        const link = e.target.closest("a");
        if (!link || !link.href) {
            console.error("Geçersiz URL");
            return;
        }
        const path = new URL(link.href, window.location.origin).pathname;
        setActivePath(path); 
        navigate(path);
    };

    return (
        <aside className="flex justify-between items-center bg-[#161D2F] px-3 py-5 mb-6  ">
            <div className="">
                <a href="/" onClick={handleMenuChange}>
                    <MdMovie className="w-[25px] h-[20px] text-[#FC4747]" />
                </a>
            </div>
            <nav className="flex gap-6 ">
                <a href="/" onClick={handleMenuChange}>
                    <FaHome className={`w-4 h-4 ${activePath === "/" ? "text-white" : "text-[#5A698F]"}`} />
                </a>
                <a href="/filmler" onClick={handleMenuChange}>
                    <TbMovie className={`w-4 h-4 ${activePath === "/filmler" ? "text-white" : "text-[#5A698F]"}`} />
                </a>
                <a href="/diziler" onClick={handleMenuChange}>
                    <GiTv className={`w-4 h-4 ${activePath === "/diziler" ? "text-white" : "text-[#5A698F]"}`} />
                </a>
                <a href="/kaydedilenler" onClick={handleMenuChange}>
                    <FaBookmark className={`w-4 h-4 ${activePath === "/kaydedilenler" ? "text-white" : "text-[#5A698F]"}`} />
                </a>
            </nav>
            <div className="">
                <a href="/profil" onClick={handleMenuChange}>
                    <img src={profileImage} alt="Profile" />
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
