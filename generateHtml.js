const generateJupHTML = (data) => {
  const { logoURI, symbol, name } = data;
  return `<div>
            <img src=${logoURI} alt='token image' class='token-logo mr-2'>
            <span><strong>${symbol}</strong></span>
            <span> (${name})</span>
            <span><a href='https://x.com/search?q=$${symbol}&src=typed_query' target="_blank" rel="noopener noreferrer">twitter</span>
        </div>`;
};

const generateMeteoraHtml = (data) => {
  const { pairs } = data;

  const tableResult = pairs.map((pair) => {
    const {
      address,
      bin_step,
      base_fee_percentage,
      max_fee_percentage,
      liquidity,
      fees_24h,
      apr,
    } = pair;

    if (Number(liquidity) > 1) {
      return `<tr>
            <th><a href='https://app.meteora.ag/dlmm/${address}' target="_blank" rel="noopener noreferrer"'>link</th>
            <td>${bin_step}</td>
            <td>${base_fee_percentage} %</td>
            <td>${max_fee_percentage} %</td>
            <td>${liquidity ? Number(liquidity).toFixed(2) + " $" : "N/A"}</td>
            <td>${fees_24h ? Number(fees_24h).toFixed(2) + " $" : "N/A"}</td>
            <td>${apr ? Number(apr).toFixed(2) + " %" : "N/A"}</td>
        </tr>`;
    }
  });

  return `
    <table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">Meteora Pool</th>
            <th scope="col">Bin Step</th>
            <th scope="col">Base Fee</th>
            <th scope="col">Max Fee</th>
            <th scope="col">Liquidity</th>
            <th scope="col">Fees 24h</th>
            <th scope="col">APR</th>
        </tr>
        </thead>
        <tbody>
        ${tableResult.join("")}
        </tbody>
    </table>
    `;
};

const generateLinkHtml = (urls) => {
  return urls
    .map(({ url, name }) => {
      return `<span><a href='${url}' target="_blank" rel="noopener noreferrer">${name}</a>&nbsp;&nbsp;</span>`;
    })
    .join("");
};
