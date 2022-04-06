import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  // console.log(' I run with every render ');
  // console.log(results);
  // debugger;
  useEffect(() => {
    if (!term) return;
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          format: 'json',
          origin: '*',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  // useEffect(() => {
  //   if (!term) return;
  //   // console.log(
  //   //   setTimeout(() => {
  //   //     console.log('hi');
  //   //   }, 10000)
  //   // );

  //   const search = async () => {
  //     const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         format: 'json',
  //         origin: '*',
  //         srsearch: term,
  //       },
  //     });

  //     setResults(data.query.search);
  //   };

  //   if (term && !results.length) {
  //     search();
  //   } else {
  //     const timeoutId = setTimeout(() => {
  //       search();
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui inverted secondary button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div className="ui container">
      <div className="ui form">
        <div className="field"></div>
        <label>Enter Search Term</label>
        <input
          className="input"
          value={term}
          type="text"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
