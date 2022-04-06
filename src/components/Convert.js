import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(translated);

  useEffect(() => {
    if (!text) return;
    const timeout = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  useEffect(() => {
    if (!debouncedText) return;

    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: process.env.REACT_APP_TRANSLATE_API_KEY,
          },
        }
      );
      setTranslated(data.data.translations.at(0).translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);

  return <div className="ui header">{translated}</div>;
};

export default Convert;
