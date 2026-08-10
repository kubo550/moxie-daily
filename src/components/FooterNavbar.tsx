import { COLORS } from '@/components/styles.ts';
import {
  FaCommentDots,
  FaHome,
  FaInfoCircle,
  FaLifeRing,
  FaVideo,
} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

export const FooterNavbar = () => {
  const location = useLocation();

  const getActiveColor = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' ? COLORS.active : '#FFFFFF';
    }
    return location.pathname.startsWith(path) ? COLORS.active : '#FFFFFF';
  };

  const isOnChallengesPage = location.pathname === '/pages/challenges';

  return (
    <div className="shrink-0 w-full bg-black text-white flex justify-around items-center py-3 z-50 h-[60px]">
      <NavLink
        to="/"
        className={`flex flex-col items-center text-xs active:scale-110 transition duration-200 mt-2`}
      >
        <FaHome size={20} color={getActiveColor('/')} />
        <span className="mt-1">Home</span>
      </NavLink>
      <NavLink
        to="/pages/chat"
        className={`flex flex-col items-center text-xs active:scale-110 transition duration-200 mt-2`}
      >
        <FaCommentDots size={20} color={getActiveColor('/pages/chat')} />
        <span className="mt-1">Chat</span>
      </NavLink>
      <NavLink
        to="/pages/challenges"
        className={`flex flex-col items-center text-xs active:scale-110 transition duration-200 mt-2 relative`}
      >
        <div className="relative">
          <FaLifeRing size={20} color={getActiveColor('/pages/challenges')} />
          {!isOnChallengesPage && (
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
        <span className="mt-1">Challenges</span>
      </NavLink>
      <NavLink
        to="/pages/fuel"
        className="flex flex-col items-center text-xs active:scale-110 transition duration-200 mt-2"
      >
        <FaVideo size={20} color={getActiveColor('/pages/fuel')} />
        <span>Fuel</span>
      </NavLink>
      <NavLink
        to="/pages/about"
        className={`flex flex-col items-center text-xs active:scale-110 transition duration-200 mt-2`}
      >
        <FaInfoCircle size={20} color={getActiveColor('/pages/about')} />
        <span className="mt-1">About</span>
      </NavLink>
    </div>
  );
};
