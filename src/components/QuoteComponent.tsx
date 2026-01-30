import { CSSProperties, FC } from 'react';

interface QuoteProps {
  text: string;
  caption?: string;
}

const quoteStyles = {
  container: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.04))',
    padding: '20px',
    maxWidth: '90vw',
    boxShadow: '0 0 24px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    textAlign: 'center',
    zIndex: 10,
  } as CSSProperties,
  textMobile: {
    fontFamily: "'Arial', sans-serif",
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#ffffff',
    margin: 0,
    lineHeight: '1.75',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)',
  },
  textDesktop: {
    fontFamily: "'Arial', sans-serif",
    fontSize: '1.75rem',
    fontWeight: '500',
    color: '#ffffff',
    margin: 0,
    lineHeight: '2',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)',
  },
};

function fixQuote(text = '') {
  return text.replace(/"/g, '');
}

export const QuoteComponent: FC<QuoteProps> = ({ text, caption }) => {
  return (
    <div
      style={quoteStyles.container}
      className="rounded-[20px] mx-4 md:max-w-[600px]"
    >
      <h2 className="md:hidden" style={quoteStyles.textMobile}>
        {fixQuote(text)}

        {caption && (
          <p className="text-sm text-gray-300 mt-3 italic font-light">
            {caption}
          </p>
        )}
      </h2>
      <h2 className="hidden md:block" style={quoteStyles.textDesktop}>
        {fixQuote(text)}

        {caption && (
          <p className="text-base text-gray-300 mt-4 italic font-light">
            {caption}
          </p>
        )}
      </h2>
    </div>
  );
};
