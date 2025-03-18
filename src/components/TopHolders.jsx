import React from "react";

const TopHolders = ({ data }) => {
  if (!data) return null;

  const { topHolders } = data;

  if (!topHolders) {
    return (
      <div className="card-body align-items-center d-flex justify-content-center">
        No info on top holders
      </div>
    );
  }

  const sliceLength =
    topHolders && topHolders.length > 8 ? 8 : topHolders.length;

  return (
    <div className="card-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Wallet</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {topHolders &&
            topHolders.length > 0 &&
            topHolders.slice(0, sliceLength).map((holder) => {
              const { address, pct } = holder;
              return (
                <tr key={address}>
                  <th>
                    <a
                      href={`https://solscan.io/account/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {address.substring(0, 4) +
                        "..." +
                        address.substring(address.length - 4, address.length)}
                    </a>
                  </th>
                  <td>{Number(pct).toFixed(2)}%</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TopHolders;
