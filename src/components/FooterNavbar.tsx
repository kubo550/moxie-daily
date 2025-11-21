import { FaHome, FaCommentDots, FaInfoCircle } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { COLORS } from '@/components/styles.ts';

export const FooterNavbar = () => {
  const location = useLocation();

  const getActiveColor = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' ? COLORS.gold : '#FFFFFF';
    }
    return location.pathname.startsWith(path) ? COLORS.gold : '#FFFFFF';
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-3 z-50 h-[60px]">
      <NavLink
        to="/"
        className={`flex flex-col items-center text-sm active:scale-110 transition duration-200 mt-2`}
      >
        <FaHome size={21} color={getActiveColor('/')} />
        <span className="mt-1">Home</span>
      </NavLink>
      <NavLink
        to="/pages/chat"
        className={`flex flex-col items-center text-sm active:scale-110 transition duration-200 mt-2`}
      >
        <FaCommentDots size={21} color={getActiveColor('/pages/chat')} />
        <span className="mt-1">Chat</span>
      </NavLink>
      <NavLink
        to="/pages/about"
        className={`flex flex-col items-center text-sm active:scale-110 transition duration-200 mt-2`}
      >
        <FaInfoCircle size={21} color={getActiveColor('/pages/about')} />
        <span className="mt-1">About</span>
      </NavLink>
    </div>
  );
};
