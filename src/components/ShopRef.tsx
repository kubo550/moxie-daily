import {CiShoppingBasket} from "react-icons/ci";

const redirectUrl = 'https://moxieimpact.com/pages/qr-apparel';
const style = {
    position: 'fixed',
    bottom: '28px',
    right: '50%',
    transform: 'translateX(50%)',
    zIndex: 1000,
    fontSize: '2em',
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
} as const;


export const ShopRef: React.FC = () => {
    return (
        <a href={redirectUrl} target="_blank" rel="noreferrer" style={style}>
            <CiShoppingBasket/>
        </a>
    );
}