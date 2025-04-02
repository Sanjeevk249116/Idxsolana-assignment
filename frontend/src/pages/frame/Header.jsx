import React from "react";
import { useMediaQuery } from "react-responsive";

import { useSelector } from "react-redux";

function Header({ setOpenAside, openAside, userInfo }) {
  const isDastop = useMediaQuery({ query: "(max-width: 1500px)" });
  const { profile } = useSelector((state) => state.profile);

  return (
    <header className="flex align-center space-between white full-width  header ph-1">
      <div className="flex align-center">
        <div
          className={
            openAside ? "open-menu-icon pointer" : "menu-icon p-1 pointer"
          }
          onClick={() => setOpenAside(!openAside)}
        >
          {openAside ? (
            <span className="material-symbols-outlined menu-icon icon hover ml-2 mr-1 ">
              close
            </span>
          ) : (
            <span className="material-symbols-outlined menu-icon icon hover ">
              segment
            </span>
          )}
        </div>
        <div className="company-profile flex mr-1  align-center ">
          <h5 className="margin-0px font-16px">Welcome to Note Making</h5>
        </div>
      </div>
      <div className="valign-wrapper align-center ">
        <div
          className="user-profile flex align-center mr-1"
          style={{ minWidth: isDastop && "250px" }}
        >
          <div className="flex align-center gap-1">
            <img
              style={{ border: "1px solid purple", borderRadius: "50px" }}
              width={"40px"}
              height={"40px"}
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile "
            />

            <span>
              <b className="semi-bold">{profile?.name}</b>
              <p className="small-size grey-text ">{profile?.email}</p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
