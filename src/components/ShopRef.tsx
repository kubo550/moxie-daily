import {CiShoppingBasket, CiShare2} from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import {FC, useState} from "react";
import {Tooltip} from "react-tooltip";
import {buttonStyle, buttonStyles} from "./styles.ts";

const redirectUrl = 'https://moxieimpact.com/pages/qr-apparel';



export const ShopRef: React.FC = () => {
    return (
        <a href={redirectUrl} target="_blank" rel="noreferrer" className="shop button" style={buttonStyle}>
            <Tooltip anchorSelect=".shop" style={{fontSize: '0.45em'}} place="top">
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
            <Tooltip anchorSelect=".next" style={{fontSize: '0.45em'}} place="top">
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
            <Tooltip anchorSelect=".share" style={{fontSize: '0.4em'}} place="top">
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