import React from "react";

const Jupiter = ({ data }) => {
  if (!data) return null;

  const { logoURI, symbol, name } = data;

  return (
    <div>
      <img src={logoURI} alt="token image" className="token-logo mr-2" />
      <span>
        <strong>${symbol}</strong>
      </span>
      <span> (${name})</span>
      <span>
        <a
          href={`https://x.com/search?q=$${symbol}&src=typed_query`}
          target="_blank"
          rel="noopener noreferrer"
        />
        twitter
      </span>
    </div>
  );
};

export default Jupiter;
