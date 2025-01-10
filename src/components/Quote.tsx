import {CSSProperties, FC} from "react";

interface QuoteProps {
    text: string
}

const quoteStyles = {
    container: {
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto 6rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
        backdropFilter: "blur(15px) contrast(0.9) brightness(1.1)",
        WebkitBackdropFilter: "blur(15px) contrast(0.9) brightness(1.1)",
        textAlign: "center",
    } as CSSProperties,
    text: {
        fontFamily: "'Arial', sans-serif",
        fontSize: "1.5rem",
        fontWeight: "500",
        color: "#ffffff",
        margin: 0,
        lineHeight: "1.8",
        textShadow: "0px 0px 5px rgba(255, 255, 255, 0.3)",
    },
    quoteMarks: {
        fontSize: "2rem",
        color: "#ffffff",
    },
};

function fixQuote(text = '') {
    return text.replace(/"/g, '');
}

export const Quote: FC<QuoteProps> = ({text}) => {
    return (
        <div style={quoteStyles.container} className="slide-in">
            <h2 style={quoteStyles.text}>
                <span style={quoteStyles.quoteMarks}>“</span>
                {fixQuote(text)}
                <span style={quoteStyles.quoteMarks}>“</span>
            </h2>
        </div>
    );
}