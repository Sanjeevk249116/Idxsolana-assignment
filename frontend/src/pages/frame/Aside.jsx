import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { logOut } from "../redux/action/auth";

function Aside({ openAside, setOpenAside }) {
    const location = useLocation();
    const navigate = useNavigate();

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
            <div
                className="flex mb-5 ml-3 align-center full-width  hover"
            >
                <span
                    className="material-symbols-outlined icon pointer"
                    data-tooltip-id={`${!openAside && "tooltip-logout"}`}
                    onClick={() => {
                        localStorage.removeItem("notes-token")
                        window.location.href = "/";
                    }}
                >
                    logout
                </span>
                {openAside && <p className="semi-bold">Logout</p>}

            </div>
            <ReactTooltip
                id={`tooltip-logout`}
                place="right"
                content={<p>Logout</p>}
            />
        </aside>
    );
}

export default Aside;
