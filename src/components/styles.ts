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
  w-[48px] h-[48px]
  rounded-full
  cursor-pointer
  transition duration-300
  flex items-center justify-center
  text-white
  active:scale-95
`.trim();

export const shareButtonClass = `
  ${buttonClass}
  bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))]
  shadow-[0_0_24px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.3)]
  backdrop-blur-[12px]
  border border-white/[0.08]
  hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]
`.trim();

export const COLORS = {
  primary: '#ffffff',
  active: '#8B8DFF',
};
