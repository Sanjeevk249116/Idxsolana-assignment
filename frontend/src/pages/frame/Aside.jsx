import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { logOut } from "../redux/action/auth";

function Aside({ openAside, setOpenAside }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);

  const isMatchingRoute = (pathname, routes) => {
    return routes.some((route) => {
      const regex = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
      return regex.test(pathname);
    });
  };

  const buyerRoutes = ["/", "/single-auction/:id/:accountType"];
  const buyerRoute = isMatchingRoute(location.pathname, buyerRoutes);

  const menuItemsForRoutes = [
    { route: "/", label: "Dashboard", icon: "dashboard", active: buyerRoute },
    {
      route: "/profile",
      label: "Profile",
      icon: "account_circle",
      active: location.pathname === "/profile",
    },
  ];
  console.log(openAside);
  return (
    <aside className={openAside ? "aside-list-open" : "aside-list"}>
      <ul className="aside-items-list">
        {menuItemsForRoutes?.map((item, index) => (
          <li
            style={{ width: openAside && "90%" }}
            key={item?.route}
            className={item.active ? "active-aside-items-list pointer" : "pointer"}
            onClick={() => {
              navigate(item.route);
              setOpenAside(false);
            }}
            data-tooltip-id={`tooltip-${index}`}
          >
            <span className="material-icons-outlined">{item.icon}</span>
            {openAside && <p className="semi-bold">{item.label}</p>}
          </li>
        ))}
      </ul>
      {!openAside &&
        menuItemsForRoutes?.map((item, index) => (
          <ReactTooltip
            key={item?.route}
            id={`tooltip-${index}`}
            place="right"
            content={<p>{item.label}</p>}
          />
        ))}
      {/* <div
        className="flex mb-5 ml-3 align-center full-width  hover"
        href="#modal1"
        onClick={() => setLogout(!logout)}
      >
        <span
          className="material-symbols-outlined icon pointer"
          data-tooltip-id={`${!openAside && "tooltip-logout"}`}
        >
          logout
        </span>
        {openAside && <p className="semi-bold">Logout</p>}
        <Modal
          actions={[]}
          id="modal1"
          open={logout}
          options={{
            onCloseEnd: () => setLogout(false),
          }}
        >
          <b className="normal-size">Confirm Logout </b>
          <p className="semi-bold">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-1">
            <button
              className="green btn-small "
            //   onClick={() => dispatch(logOut())}
            >
              Yes
            </button>

            <button className="red btn-small" onClick={() => setLogout(false)}>
              No
            </button>
          </div>
        </Modal>
      </div> */}
      <ReactTooltip
        id={`tooltip-logout`}
        place="right"
        content={<p>Logout</p>}
      />
    </aside>
  );
}

export default Aside;
