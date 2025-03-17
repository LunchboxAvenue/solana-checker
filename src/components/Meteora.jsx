import React from "react";

const formatDollarValue = (value) => {
  if (!value) return "N/A";

  return (
    "$" +
    Number(value)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

const Meteora = ({ data }) => {
  if (!data) return null;

  const { pairs } = data;

  return (
    <>
      {!pairs ||
        (pairs.length === 0 && (
          <div
            className="card-body h-100 d-flex justify-content-center align-items-center col-12 mb-3"
            style={{ minHeight: "200px" }}
          >
            No pools exist for this token yet
          </div>
        ))}
      {pairs && pairs.length > 0 && (
        <div className="card-body">
          <div
            className="col-12 table-responsive"
            style={{ maxHeight: "370px", minHeight: "200px", paddingRight: 0 }}
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Pool</th>
                  <th scope="col">Bin Step</th>
                  <th scope="col">Base Fee</th>
                  <th scope="col">Dynamic Fee</th>
                  <th scope="col">Liquidity</th>
                  <th scope="col">Fees 24h</th>
                  <th scope="col">24hr fee / TVL</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((pair) => {
                  const {
                    name,
                    address,
                    bin_step,
                    base_fee_percentage,
                    max_fee_percentage,
                    liquidity,
                    fees_24h,
                    apr,
                    fees,
                    volume,
                  } = pair;

                  const {
                    min_30: min_30_fees,
                    hour_1: hour_1_fees,
                    hour_24: hour_24_fees,
                  } = fees;
                  const {
                    min_30: min_30_volume,
                    hour_1: hour_1_volume,
                    hour_24: hour_24_volume,
                  } = volume;

                  if (Number(liquidity) > 1) {
                    return (
                      <tr key={address}>
                        <th>
                          <a
                            href={`https://app.meteora.ag/dlmm/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {name}
                          </a>
                        </th>
                        <td>{bin_step}</td>
                        <td>{base_fee_percentage}%</td>
                        <td>{max_fee_percentage}%</td>
                        <td>{formatDollarValue(liquidity)}</td>
                        <td>{formatDollarValue(fees_24h)}</td>
                        <td>{apr ? Number(apr).toFixed(2) + "%" : "N/A"}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Meteora;
