import React from "react";
import { Outlet } from "react-router-dom";
import "./style.css";

export default function Root() {
    return <Outlet />;
}
