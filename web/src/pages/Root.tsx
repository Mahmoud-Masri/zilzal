import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Container/Map";
import "./style.css";

export default function Root() {
    return (
        <div>
            <Outlet />
            <Map/>
        </div>
    );
}
