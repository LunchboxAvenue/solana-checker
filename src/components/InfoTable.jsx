const InfoTable = () => {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#Platform</th>
          <th scope="col">#Green Flags</th>
          <th scope="col">#Red Flags</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">jupiter</th>
          <td>
            <span class="badge text-bg-success rounded-pill">
              Organic Score
            </span>
          </td>
          <td>
            <span class="badge text-bg-warning rounded-pill">Check List</span>
          </td>
        </tr>
        <tr>
          <th scope="row">gmgn</th>
          <td>
            <span class="badge text-bg-success rounded-pill">Audit</span>
            <span class="badge text-bg-success rounded-pill">Top 10</span>
            <span class="badge text-bg-success rounded-pill mt-1">
              Low Snipers
            </span>
          </td>
          <td>
            <span class="badge text-bg-warning rounded-pill">
              Twitter Rename
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">bubblemaps</th>
          <td>
            <span class="badge text-bg-success rounded-pill">
              Many Small Clusters
            </span>
          </td>
          <td>
            <span class="badge text-bg-danger rounded-pill">
              Single Cluster
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">rugcheck</th>
          <td>
            <span class="badge text-bg-success rounded-pill">
              Risk Analysis Good
            </span>
          </td>
          <td>
            <span class="badge text-bg-danger rounded-pill">
              Contract Exploits
            </span>
            <span class="badge text-bg-danger rounded-pill">
              Dev wallet many tokens
            </span>
            <span class="badge text-bg-danger rounded-pill mt-1">
              Shady tokenomics
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">trenchbot</th>
          <td>
            <span class="badge text-bg-success rounded-pill">
              Liquidity properly structured
            </span>
          </td>
          <td>
            <span class="badge text-bg-danger rounded-pill">Big bundles</span>
            <span class="badge text-bg-danger rounded-pill">
              Bundles haven't sold
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default InfoTable;
