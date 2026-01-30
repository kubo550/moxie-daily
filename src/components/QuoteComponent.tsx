import { CSSProperties, FC } from 'react';

interface QuoteProps {
  text: string;
  caption?: string;
}

const quoteStyles = {
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    maxWidth: '90vw',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    backdropFilter: 'blur(15px) contrast(0.9) brightness(1.1)',
    WebkitBackdropFilter: 'blur(15px) contrast(0.9) brightness(1.1)',
    textAlign: 'center',
    zIndex: 10,
  } as CSSProperties,
  textMobile: {
    fontFamily: "'Arial', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#ffffff',
    margin: 0,
    lineHeight: '1.6',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)',
  },
  textDesktop: {
    fontFamily: "'Arial', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#ffffff',
    margin: 0,
    lineHeight: '1.8',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)',
  },
  quoteMarksMobile: {
    fontSize: '1.5rem',
    color: '#ffffff',
  },
  quoteMarksDesktop: {
    fontSize: '2rem',
    color: '#ffffff',
  },
};

function fixQuote(text = '') {
  return text.replace(/"/g, '');
}

export const QuoteComponent: FC<QuoteProps> = ({ text, caption }) => {
  return (
    <div
      style={quoteStyles.container}
      className="rounded-[15px] mx-4 md:max-w-[600px]"
    >
      <h2 className="md:hidden" style={quoteStyles.textMobile}>
        <span style={quoteStyles.quoteMarksMobile}>"</span>
        {fixQuote(text)}
        <span style={quoteStyles.quoteMarksMobile}>"</span>

        {caption && (
          <p className="text-sm text-gray-300 mt-2 ml-25 italic font-light">
            {caption}
          </p>
        )}
      </h2>
      <h2 className="hidden md:block" style={quoteStyles.textDesktop}>
        <span style={quoteStyles.quoteMarksDesktop}>"</span>
        {fixQuote(text)}
        <span style={quoteStyles.quoteMarksDesktop}>"</span>

        {caption && (
          <p className="text-sm text-gray-300 mt-2 ml-25 italic font-light">
            {caption}
          </p>
        )}
      </h2>
    </div>
  );
};
