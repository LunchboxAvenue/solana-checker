import React from "react";

const riskEnum = {
  danger: "alert-danger",
  warn: "alert-warning",
};

const RugCheck = ({ data }) => {
  if (!data) return null;

  const { risks, error } = data;

  if (error)
    return (
      <div className="card-body align-items-center d-flex justify-content-center">
        {error}
      </div>
    );

  if (!risks || risks.length === 0)
    return (
      <div className="card-body align-items-center d-flex justify-content-center">
        <div
          className={`alert alert-success`}
          role="alert"
          key={name}
          data-toggle="tooltip"
          title={"Rugcheck shows no risks"}
          style={{ cursor: "help" }}
        >
          <span>Good</span>
        </div>
      </div>
    );

  return (
    <div className="card-body">
      {risks.length > 0 &&
        risks.map((risk) => {
          const { level, name, description } = risk;
          return (
            <div
              className={`alert ${riskEnum[level]} mb-1`}
              role="alert"
              key={name}
              data-toggle="tooltip"
              title={description}
              style={{ cursor: "help" }}
            >
              <span>{name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default RugCheck;
