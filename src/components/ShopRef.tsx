import {CiShoppingBasket, CiShare2} from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import {FC, useState} from "react";
import {Tooltip} from "react-tooltip";

const redirectUrl = 'https://moxieimpact.com/pages/qr-apparel';
const style = {
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


const buttonStyles = {
    ...style,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '60px',
} as const


export const ShopRef: React.FC = () => {
    return (
        <a href={redirectUrl} target="_blank" rel="noreferrer" className="shop button" style={style}>
            <Tooltip anchorSelect=".shop" style={{fontSize: '0.5em'}} place="top">
                Shop
            </Tooltip>
            <CiShoppingBasket/>
        </a>
    );
}


export const NextQuoteButton:FC<{ onNextQuote: () => Promise<void> }> = ({onNextQuote}) => {
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);
        await onNextQuote();
        setLoading(false);
    }

    return (
        <button style={buttonStyles} className={loading ? 'loading next' : 'next'} onClick={handleClick}>
            <Tooltip anchorSelect=".next" style={{fontSize: '0.5em'}} place="top">
                Next
            </Tooltip>
            <LiaRandomSolid/>
        </button>
    );
}


export const ShareButton = () => {
    const [tooltipText, setTooltipText] = useState('Share');

    const onClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setTooltipText('Copied!');
        setTimeout(() => {
            setTooltipText('Share');
        }, 1000);
    }

    return (
        <button style={buttonStyles} onClick={onClick} className="share">
            <Tooltip anchorSelect=".share" style={{fontSize: '0.5em'}} place="top">
                {tooltipText}
            </Tooltip>
            <CiShare2/>
        </button>
    )
}

const styles = {
    position: 'fixed',
    bottom: '28px',
    right: '50%',
    transform: 'translateX(50%)',
    zIndex: 1000,
    fontSize: '2em',
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

} as const
type ButtonsContainerProps = { onNextQuote: () => Promise<void> };
export const ButtonsContainer: FC<ButtonsContainerProps> = ({onNextQuote}) => {
    return (
        <div style={styles}>
            <ShareButton />
            <ShopRef />
            <NextQuoteButton onNextQuote={onNextQuote} />
        </div>
    );
}