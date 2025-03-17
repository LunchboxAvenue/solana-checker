import { useState } from "react";
import Jupiter from "./components/Jupiter";
import Meteora from "./components/Meteora";
import InfoTable from "./components/InfoTable";
import RugCheck from "./components/RugCheck";
import TopHolders from "./components/TopHolders";

function App() {
  const [jupiterData, setJupiterData] = useState(null);
  const [meteoraData, setMeteoraData] = useState(null);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [rugCheckData, setRugCheckData] = useState(null);
  const [rugCheckError, setRugCheckError] = useState(null);
  const [meteoraIsLoading, setMeteoraIsLoading] = useState(false);
  const [rugCheckIsLoading, setRugCheckIsLoading] = useState(false);
  const [jupiterIframeIsLoading, setJupiterIframeIsLoading] = useState(false);
  const [trenchBotIframeIsLoading, setTrenchBotIframeIsLoading] =
    useState(false);

  const handleJupiterIframeIsLoaded = () => {
    setJupiterIframeIsLoading(false);
  };

  const handleTrenchBotIframeIsLoaded = () => {
    setTrenchBotIframeIsLoading(false);
  };

  const getTokenData = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const tokenCA = formData.get("contractAddress");

    if (!tokenCA) return;

    setMeteoraIsLoading(true);
    setRugCheckIsLoading(true);
    setJupiterIframeIsLoading(true);
    setTrenchBotIframeIsLoading(true);

    setTokenAddress(tokenCA);

    await fetch(`https://api.jup.ag/tokens/v1/token/${tokenCA}`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setJupiterData(data);
      });

    await fetch(
      `https://dlmm-api.meteora.ag/pair/all_with_pagination?include_pool_token_pairs=${tokenCA}-So11111111111111111111111111111111111111112`,
      {
        headers: { Accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMeteoraData(data);
        setMeteoraIsLoading(false);
      })
      .catch((error) => {
        // Todo error
        setMeteoraIsLoading(false);
      });

    await fetch(`https://api.rugcheck.xyz/v1/tokens/${tokenCA}/report`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setRugCheckData(data);
        setRugCheckIsLoading(false);
      })
      .catch((error) => {
        setRugCheckIsLoading(false);
        setRugCheckError(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center col-12 pt-4">
          <div className="col-3"></div>
          <div className="col-6">
            <form method="post" onSubmit={getTokenData}>
              <div className="mb-3">
                <input
                  id="contractAddress"
                  type="text"
                  placeholder="Solana CA"
                  name="contractAddress"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                id="findButton"
              >
                Find
              </button>
            </form>
          </div>
          <div className="col-3"></div>
        </div>

        {/* First row (Jupiter, RugCheck, Info*/}
        <div className="row mt-5">
          <div className="col-4">
            {tokenAddress && (
              <div className="card">
                <div class="card-header" style={{ textAlign: "center" }}>
                  <a
                    href={`https://jup.ag/id/tokens/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jupiter
                  </a>
                </div>
                <div
                  className={`card-body ${
                    jupiterIframeIsLoading
                      ? "align-items-center d-flex justify-content-center"
                      : ""
                  }`}
                  style={
                    jupiterIframeIsLoading ? { minHeight: "407.5px" } : null
                  }
                >
                  {jupiterIframeIsLoading && (
                    <div class="spinner-border text-secondary" role="status" />
                  )}
                  <iframe
                    style={{
                      height: "370px",
                      position: "relative",
                      width: "100%",
                    }}
                    onLoad={handleJupiterIframeIsLoaded}
                    scrolling="no"
                    hidden={jupiterIframeIsLoading}
                    src={`https://jup.ag/id/tokens/${tokenAddress}`}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="col-4">
            {tokenAddress && (
              <div className="card" style={{ height: "451px" }}>
                <div class="card-header" style={{ textAlign: "center" }}>
                  <a
                    href={`https://rugcheck.xyz/tokens/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RugCheck
                  </a>
                </div>
                {rugCheckIsLoading && (
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <div class="spinner-border text-secondary" role="status" />
                  </div>
                )}
                {!rugCheckIsLoading && rugCheckError && (
                  <div children="card-body">{rugCheckError}</div>
                )}
                {!rugCheckIsLoading && !rugCheckError && (
                  <RugCheck data={rugCheckData} />
                )}
              </div>
            )}
          </div>
          <div className="col-4" style={{ maxHeight: "408px" }}>
            {tokenAddress && (
              <div className="card" style={{ height: "451px" }}>
                <div class="card-header" style={{ textAlign: "center" }}>
                  <a
                    href={`https://app.bubblemaps.io/sol/token/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bubble Maps
                  </a>
                </div>
                {rugCheckIsLoading && (
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <div class="spinner-border text-secondary" role="status" />
                  </div>
                )}
                {!rugCheckIsLoading && <TopHolders data={rugCheckData} />}
              </div>
            )}
          </div>
        </div>

        {/* Second row (trenchbot iframe)*/}
        <div className="row mt-5" style={{ height: "676px" }}>
          <div className="col-12">
            {tokenAddress && (
              <div className="card">
                <div class="card-header" style={{ textAlign: "center" }}>
                  <a
                    href={`https://trench.bot/bundles/${contractAddress.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Trench Bot
                  </a>
                </div>
                <div
                  className={`card-body ${
                    trenchBotIframeIsLoading
                      ? "align-items-center d-flex justify-content-center"
                      : ""
                  }`}
                  style={
                    trenchBotIframeIsLoading ? { minHeight: "637.23px" } : null
                  }
                >
                  {trenchBotIframeIsLoading && (
                    <div class="spinner-border text-secondary" role="status" />
                  )}
                  <iframe
                    className="w-100"
                    style={{ height: "600px" }}
                    onLoad={handleTrenchBotIframeIsLoaded}
                    scrolling="no"
                    hidden={trenchBotIframeIsLoading}
                    src={`https://trench.bot/bundles/${tokenAddress}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Third row (meteora table)*/}
        <div className="row mt-5 mb-5">
          <div className="col-12">
            {tokenAddress && (
              <div className="card">
                {meteoraIsLoading && (
                  <div
                    className="card-body align-items-center d-flex justify-content-center"
                    style={{ minHeight: "200px" }}
                  >
                    <div class="spinner-border text-secondary" role="status" />
                  </div>
                )}
                {!meteoraIsLoading && <Meteora data={meteoraData} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
