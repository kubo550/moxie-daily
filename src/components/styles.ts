export const buttonStyle = {
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'white',
  textShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  padding: '10px',
  width: '40px',
  height: '40px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  cursor: 'pointer',
} as const;

export const buttonClass = `
  w-[60px] h-[60px]
  rounded-full
  bg-neutral-700
  hover:bg-neutral-700/10
  active:scale-110
  cursor-pointer
  transition duration-300
  flex items-center justify-center
  text-white
  shadow-xl
  backdrop-blur-[10px]
`.trim();

export const buttonStyles = {
  ...buttonStyle,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
} as const;

export const COLORS = {
  primary: '#ffffff',
  gold: '#e6b424',
  active: '#7c3aed', // violet-600 - ciemny fioletowy
};
