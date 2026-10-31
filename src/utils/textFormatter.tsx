import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Parses text containing HTML-style formatting tags like <u>...</u>, <ins>...</ins>, <b>...</b>
 * and renders them with high-contrast, beautiful CSS styles for dark mode.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Replace BBCode style [u]...[/u] or [b]...[/b] with HTML equivalents if present
  let normalizedText = text
    .replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>')
    .replace(/\[b\](.*?)\[\/b\]/gi, '<b>$1</b>');

  // Regex to match <u>...</u>, <ins>...</ins>, <b>...</b>, <strong>...</strong>, <i>...</i>, <em>...</em>
  const tagRegex = /(<u(?:.*?)>.*?<\/u>|<ins(?:.*?)>.*?<\/ins>|<b(?:.*?)>.*?<\/b>|<strong(?:.*?)>.*?<\/strong>|<i(?:.*?)>.*?<\/i>|<em(?:.*?)>.*?<\/em>)/gi;

  const parts = normalizedText.split(tagRegex);

  return (
    <div className={`formatted-text-container ${className}`}>
      {parts.map((part, index) => {
        if (!part) return null;

        const lowerPart = part.toLowerCase();

        // Underline tag handling: <u>...</u> or <ins>...</ins>
        if (lowerPart.startsWith('<u') || lowerPart.startsWith('<ins')) {
          const innerContent = part.replace(/<\/?(?:u|ins)(?:.*?)>/gi, '');
          return (
            <span
              key={index}
              className="inline-block px-1.5 py-0.5 my-0.5 font-semibold text-amber-200 bg-amber-500/20 border-b-2 border-amber-400 rounded shadow-sm tracking-wide transition-all hover:bg-amber-500/30"
              title="Altı çizili metin"
            >
              {innerContent}
            </span>
          );
        }

        // Bold tag handling: <b>...</b> or <strong>...</strong>
        if (lowerPart.startsWith('<b') || lowerPart.startsWith('<strong')) {
          const innerContent = part.replace(/<\/?(?:b|strong)(?:.*?)>/gi, '');
          return (
            <strong key={index} className="font-bold text-indigo-300">
              {innerContent}
            </strong>
          );
        }

        // Italic tag handling: <i>...</i> or <em>...</em>
        if (lowerPart.startsWith('<i') || lowerPart.startsWith('<em')) {
          const innerContent = part.replace(/<\/?(?:i|em)(?:.*?)>/gi, '');
          return (
            <em key={index} className="italic text-slate-300">
              {innerContent}
            </em>
          );
        }

        // Regular text: split by newlines to render multi-line paragraphs cleanly
        return (
          <span key={index} className="whitespace-pre-line">
            {part}
          </span>
        );
      })}
    </div>
  );
};
