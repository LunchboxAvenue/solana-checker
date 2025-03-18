import React from "react";

const Resources = () => {
  return (
    <>
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="card">
          <div className="card-header">DLMM Resources</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a
                href={`https://thewise.trade/dlmm-guide/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprehensive DLMM Guide
              </a>
            </li>
            <li class="list-group-item">
              <a
                href="https://solmeteor.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solmeteor (meteora trending pools)
              </a>
            </li>
            <li class="list-group-item">
              <a
                href="https://dlmm.geeklad.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Geeklad DLMM opportunities
              </a>
            </li>
            <li class="list-group-item">
              <a
                href="https://lookerstudio.google.com/u/0/reporting/95755595-a3b9-44bb-bb1a-8615c77059f7/page/wmP0D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Goosedao DLMM opportunities
              </a>
            </li>
            <li class="list-group-item">
              <a
                href="https://todamun.xyz/meteora-monitor"
                target="_blank"
                rel="noopener noreferrer"
              >
                Todamun (meteora trending pools)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Resources;
