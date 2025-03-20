import React from "react";

const About = () => {
  return (
    <>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          About
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Gm!</p>
        <p>
          After being rugged many times, I've decided to build a simple
          dashboard/tool, that will decrease the chance of this happening. It
          should serve you as a guidance before you make a decision of DLMM'ing
          or simply buying the token.
        </p>
        <p>
          This was mainly inspired by{" "}
          <a
            href="https://x.com/SebMontgomery"
            alt="SebMontgomery twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Seb Monty
          </a>
          , who mentioned{" "}
          <a
            href="https://x.com/NaojNc/status/1897708760027566562"
            target="_blank"
            rel="noopener noreferrer"
            alt="NaojNc twitter"
          >
            @NAOJ's twtter post
          </a>{" "}
          called "Token Sanity Check: How I Avoid Getting Rugged in Low Volume
          Markets". Make sure to give these guys a follow on twitter.
        </p>
        <p>
          You can contact me on{" "}
          <a
            href="https://x.com/LunchboxSolana/"
            alt="lunchbox.sol twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5"
          >
            @Lunchbox.Sol
          </a>
          or on telegram:{" "}
          <a
            href="https://t.me/lunchbox_sol"
            alt="lunchbox.sol telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5"
          >
            t.me/lunchbox_sol
          </a>
        </p>
        <p>tldr:</p>
        {/* Jupiter Card */}
        <div className="card">
          <div className="card-header">Jupiter</div>
          <div className="card-body">
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"Volume is not fake"}
              style={{ cursor: "help" }}
            >
              <span>High Organic Score</span>
            </div>
            <div
              className={`alert alert-success mt-1`}
              role="alert"
              data-toggle="tooltip"
              title={"Mint & Free disabled, holders < 15%"}
              style={{ cursor: "help" }}
            >
              <span>3/3 Checklist</span>
            </div>
            <div
              className={`alert alert-danger mt-1`}
              role="alert"
              data-toggle="tooltip"
              title={"Volume is fake"}
              style={{ cursor: "help" }}
            >
              <span>Low organic score</span>
            </div>
          </div>
        </div>
        {/* RugCheck Card */}
        <div className="card mt-2">
          <div className="card-header">Rug Check</div>
          <div className="card-body">
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"No contract exploits"}
              style={{ cursor: "help" }}
            >
              <span>Risk Analysis Good</span>
            </div>
            <div
              className={`alert alert-danger mt-1`}
              role="alert"
              data-toggle="tooltip"
              title={"Most likely will nuke the chart"}
              style={{ cursor: "help" }}
            >
              <span>Dev wallet has many tokens</span>
            </div>
            <div className={`alert alert-danger mt-1`} role="alert">
              <span>Shady tokenomics</span>
            </div>
          </div>
        </div>
        {/* RugCheck Card */}
        <div className="card mt-2">
          <div className="card-header">Trench Radar</div>
          <div className="card-body">
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"No contract exploits"}
              style={{ cursor: "help" }}
            >
              <span>Liquidity properly structured</span>
            </div>
            <div className={`alert alert-danger mt-1`} role="alert">
              <span>Big bundles</span>
            </div>
            <div className={`alert alert-danger mt-1`} role="alert">
              <span>Bundles haven't sold</span>
            </div>
          </div>
        </div>
        {/* BubbleMaps Card */}
        <div className="card mt-2">
          <div className="card-header">Bubble Maps</div>
          <div className="card-body">
            <div className={`alert alert-success`} role="alert">
              <span>Many Small Clusters</span>
            </div>
            <div className={`alert alert-danger mt-1`} role="alert">
              <span>Single Cluster</span>
            </div>
          </div>
        </div>
        {/* GMGN Card*/}
        <div className="card mt-2">
          <div className="card-header">GMGN</div>
          <div className="card-body">
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={
                "How many bots aped at launch? If too high, you're already exit liquidity"
              }
              style={{ cursor: "help" }}
            >
              <span>Low amount of snipers</span>
            </div>
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"Solid wallets holding"}
              style={{ cursor: "help" }}
            >
              <span>BlueChip holdings</span>
            </div>
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"Many wallets should control the supply"}
              style={{ cursor: "help" }}
            >
              <span>Top 10</span>
            </div>
            <div
              className={`alert alert-success`}
              role="alert"
              data-toggle="tooltip"
              title={"Should be Safe 4/4"}
              style={{ cursor: "help" }}
            >
              <span>Audit 4/4</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
