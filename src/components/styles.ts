export const buttonStyle = {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'white',
    textShadow: "0px 0px 5px rgba(255, 255, 255, 0.3)",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    padding: '10px',
    width: '40px',
    height: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    cursor: 'pointer',
} as const;


export const buttonStyles = {
    ...buttonStyle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '60px',
} as const


export const COLORS = {
    primary: '#ffffff',
    secondary: '#b98a00',
}