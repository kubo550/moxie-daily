import {FaHome, FaCommentDots, FaInfoCircle} from 'react-icons/fa';
import {NavLink, useLocation} from 'react-router-dom';
import {COLORS} from "@/components/styles.ts";

export const FooterNavbar = () => {

  const location = useLocation();

    const getActiveColor = (path: string) => {
        return location.pathname === path ? COLORS.gold : '#FFFFFF';
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-3 border-t border-gray-700 z-50 h-[70px]">
            <NavLink to="/" className={`flex flex-col items-center text-sm`}>
                <FaHome size={22} color={getActiveColor('/')}/>
                <span className="mt-1">Home</span>
            </NavLink>
            <NavLink to="/pages/chat" className={`flex flex-col items-center text-sm`}>
                <FaCommentDots size={22} color={getActiveColor('/pages/chat')}/>
                <span className="mt-1">Chat</span>
            </NavLink>
            <NavLink to="/pages/about" className={`flex flex-col items-center text-sm`}>
                <FaInfoCircle size={22} color={getActiveColor('/pages/about')}/>
                <span className="mt-1">About</span>
            </NavLink>
        </div>
    );
};
