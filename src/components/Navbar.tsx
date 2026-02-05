import logo from '../assets/logo.jpeg';

export const Navbar = () => (
  <nav className="flex fixed top-0 left-0 right-0 h-[60px] bg-black items-center px-4 shadow-md z-50">
    <div className="flex">
      <a
        href="https://moxieimpact.com/pages/qr-apparel"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={logo}
          alt="Moxie Daily Logo"
          className="h-16  sm:h-16 md:h-20  max-w-xs mx-auto -ml-4 p-3"
        />
      </a>
    </div>
  </nav>
);
