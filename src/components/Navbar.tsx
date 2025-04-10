import logo from '../assets/logo.jpg';

export const Navbar = () => (
  <div className="absolute top-0 left-0 w-full bg-black py-4 h-16 sm:h-18 md:h-20 z-50">
    <div className="flex ">
      <a
        href="https://moxieimpact.com/pages/qr-apparel"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={logo}
          alt="Moxie Daily Logo"
          className="h-16  sm:h-16 md:h-20  max-w-xs mx-auto -mt-4 -ml-2 p-3"
        />
      </a>
    </div>
  </div>
);
