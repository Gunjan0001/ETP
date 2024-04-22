import React from "react";
import { PacmanLoader } from "react-spinners";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <PacmanLoader
        color={"#e80707"}
        // loading={loading}
        height={200}
        width={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
