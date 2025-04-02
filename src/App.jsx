import { useState } from "react";
import Meteora from "./components/Meteora";
import RugCheck from "./components/RugCheck";
import TopHolders from "./components/TopHolders";
import About from "./components/About";
import Resources from "./components/Resources";
import { Analytics } from "@vercel/analytics/react";

const donationWalletAddress = "3k1czCx2S8hTRSzwwCDtszvwNKnmwkNfGJ59h9ffsD4G";

function App() {
  const [meteoraData, setMeteoraData] = useState(null);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [rugCheckData, setRugCheckData] = useState(null);
  const [rugCheckError, setRugCheckError] = useState(null);
  const [meteoraIsLoading, setMeteoraIsLoading] = useState(false);
  const [rugCheckIsLoading, setRugCheckIsLoading] = useState(false);
  const [jupiterIframeIsLoading, setJupiterIframeIsLoading] = useState(false);
  const [trenchBotIframeIsLoading, setTrenchBotIframeIsLoading] =
    useState(false);
  const [gmGnIframeIsLoading, setGmGnIframeIsLoading] = useState(false);
  const [addressIsCopied, setAddressIsCopied] = useState(false);
  const [jupData, setJupData] = useState(null);
  const [jupDataLoading, setJupDataLoading] = useState(false);

  const handleJupiterIframeIsLoaded = () => {
    setJupiterIframeIsLoading(false);
  };

  const handleTrenchBotIframeIsLoaded = () => {
    setTrenchBotIframeIsLoading(false);
  };

  const handleGmGnIframeIsLoaded = () => {
    setGmGnIframeIsLoading(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(donationWalletAddress);
    setAddressIsCopied(true);
    setTimeout(() => {
      setAddressIsCopied(false);
    }, 2000);
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
    setGmGnIframeIsLoading(true);
    setJupDataLoading(true);

    setTokenAddress(tokenCA);

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

    // get organic score
    await fetch(`https://fe-api.jup.ag/api/v1/tokens/search?query=${tokenCA}`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.tokens && data.tokens.length) {
          setJupData(data.tokens[0]);
        }
        setJupDataLoading(false);
      })
      .catch((error) => {
        setJupDataLoading(false);
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
        <div id="helpButtons">
          <div
            style={{ position: "absolute", right: "0", marginRight: "25px" }}
            className="mt-2"
            id="aboutButton"
          >
            <button
              className="btn btn-primary-outline"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <span
                style={{ fontSize: "x-large" }}
                className="bi-question-square"
              ></span>
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              right: "0",
              marginRight: "25px",
            }}
            className="mt-5"
            id="resourceButton"
          >
            <button
              className="btn btn-primary-outline"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRightResources"
              aria-controls="offcanvasRightResources"
            >
              <span style={{ fontSize: "x-large" }} className="bi-book"></span>
            </button>
          </div>
        </div>

        <div className="row justify-content-center pt-4">
          <div className={`${tokenAddress ? "" : "col-1 col-xl-3"}`}></div>
          <div className={`${tokenAddress ? "col-8" : "col-10 col-xl-6"}`}>
            <form method="post" onSubmit={getTokenData}>
              <div className="input-group">
                <input
                  id="contractAddress"
                  type="text"
                  placeholder="Solana CA"
                  name="contractAddress"
                  className="form-control"
                  aria-describedby="findButton"
                  style={{ paddingRight: "41px" }}
                />
                {tokenAddress && (
                  <button
                    type="reset"
                    className="btn bg-transparent"
                    style={{ marginLeft: "-41px", zIndex: 100 }}
                  >
                    <i className="bi-x-circle"></i>
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-success"
                  id="findButton"
                >
                  Find
                </button>
              </div>
            </form>
          </div>
          <div className={`${tokenAddress ? "col-4" : "col-1 col-xl-3"}`}>
            {tokenAddress && (
              <>
                {!jupDataLoading && (
                  <div
                    className={`alert organic-score-alert ${
                      jupData.organicScore > 75
                        ? "alert-success"
                        : jupData.organicScore <= 0
                        ? "alert-danger"
                        : "alert-warning"
                    }`}
                    role="alert"
                    style={{ cursor: "help" }}
                    data-toggle="tooltip"
                    title={"Jupiter trenches organic score"}
                  >
                    <span>
                      Organic score:{" "}
                      {jupData && Number(jupData.organicScore).toFixed()}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* First row (Jupiter, RugCheck, Info*/}
        <div className="row mt-4">
          <div className="col-12 col-lg-4">
            {tokenAddress && (
              <div className="card">
                <div className="card-header" style={{ textAlign: "center" }}>
                  <img
                    src="https://portfolio.jup.ag/logo.svg"
                    alt="Bubblemaps Logo"
                    className="company-logo"
                  />
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
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
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

          <div className="col-12 col-lg-4">
            {tokenAddress && (
              <div className="card" style={{ height: "451px" }}>
                <div className="card-header" style={{ textAlign: "center" }}>
                  <img
                    src="https://rugcheck.xyz/favicon.jpg"
                    alt="Rugcheck Logo"
                    className="company-logo"
                  />
                  <a
                    href={`https://rugcheck.xyz/tokens/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rug Check
                  </a>
                </div>
                {rugCheckIsLoading && (
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
                  </div>
                )}
                {!rugCheckIsLoading && rugCheckError && (
                  <div children="card-body">
                    Getting data from rugcheck failed
                  </div>
                )}
                {!rugCheckIsLoading && !rugCheckError && (
                  <RugCheck data={rugCheckData} />
                )}
              </div>
            )}
          </div>
          <div className="col-12 col-lg-4" style={{ maxHeight: "408px" }}>
            {tokenAddress && (
              <div className="card" style={{ height: "451px" }}>
                <div className="card-header" style={{ textAlign: "center" }}>
                  <img
                    src="https://app.bubblemaps.io/img/bubblemaps.51902376.svg"
                    alt="Bubblemaps Logo"
                    className="company-logo"
                  />
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
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
                  </div>
                )}
                {!rugCheckIsLoading && <TopHolders data={rugCheckData} />}
              </div>
            )}
          </div>
        </div>

        {/* 1.5 row (gmgn iframe)*/}
        <div className="row mt-4" style={{ height: "676px" }} id="gmgnIframe">
          <div className="col-12">
            {tokenAddress && (
              <div className="card">
                <div className="card-header" style={{ textAlign: "center" }}>
                  <img
                    src="/gmgn.png"
                    alt="Gmgn Logo"
                    className="company-logo"
                  />
                  <a
                    href={`https://gmgn.ai/sol/token/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GMGN
                  </a>
                </div>
                <div
                  className={`card-body ${
                    gmGnIframeIsLoading
                      ? "align-items-center d-flex justify-content-center"
                      : ""
                  }`}
                  style={gmGnIframeIsLoading ? { minHeight: "637.23px" } : null}
                >
                  {gmGnIframeIsLoading && (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
                  )}
                  <iframe
                    className="w-100"
                    style={{ height: "600px" }}
                    onLoad={handleGmGnIframeIsLoaded}
                    scrolling="no"
                    hidden={gmGnIframeIsLoading}
                    src={`https://www.gmgn.cc/kline/sol/${tokenAddress}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Second row (trenchbot iframe)*/}
        <div
          className="row mt-4"
          style={{ height: "676px" }}
          id="trenchRadarIframe"
        >
          <div className="col-12">
            {tokenAddress && (
              <div className="card">
                <div className="card-header" style={{ textAlign: "center" }}>
                  <img
                    src="https://trench.bot/logo.webp"
                    alt="Bubblemaps Logo"
                    className="company-logo"
                    style={{ height: "25px", paddingBottom: "3px" }}
                  />
                  <a
                    href={`https://trench.bot/bundles/${contractAddress.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Trench Radar
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
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
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
        <div className="row mt-4 mb-2">
          <div className="col-12">
            {tokenAddress && (
              <div className="card">
                {meteoraIsLoading && (
                  <div
                    className="card-body align-items-center d-flex justify-content-center"
                    style={{ minHeight: "200px" }}
                  >
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    />
                  </div>
                )}
                {!meteoraIsLoading && <Meteora data={meteoraData} />}
              </div>
            )}
          </div>
        </div>

        {/* Thank you*/}
        {tokenAddress && (
          <div className="row mt-3" id="thankYou">
            <div
              className="col-12 align-items-center d-flex justify-content-center"
              style={{ cursor: "pointer" }}
              onClick={copyAddress}
            >
              <span style={{ fontSize: "large" }} className="bi-cup-hot"></span>
              <span></span>
              <span style={{ paddingLeft: "8px" }}>
                {donationWalletAddress}
              </span>
              {addressIsCopied && (
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{ marginLeft: "15px" }}
                >
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <About />
      </div>

      {/* Resources */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRightResources"
        aria-labelledby="offcanvasRightResourcesLabel"
      >
        <Resources />
      </div>

      <Analytics />
    </>
  );
}

export default App;
