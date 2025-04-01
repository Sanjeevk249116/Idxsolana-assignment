import React from "react";
import { useMediaQuery } from "react-responsive";

function WeclomeSection() {
  const isLaptop = useMediaQuery({ query: "(max-width: 999px)" });
  return (
    <div
      className="pin-top setup-page valign-wrapper justify-center full-width"
      style={{ display: isLaptop && "none" }}
    >
      <div>
        <h1 className="">👋 Welcome to my note Taking Application!</h1>

        <p
          className="font-cercular-light mb-2 mt-2"
          style={{
            letterSpacing: "0.8px",
            width: "320px",
            lineHeight: "30px",
          }}
        >
          Effortlessly store, organize, and access your notes anytime, anywhere.
          Keep your thoughts secure and never forget important ideas. Sign up
          now to experience a smarter way to manage your notes.
        </p>
      </div>
    </div>
  );
}

export default WeclomeSection;
