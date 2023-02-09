import React, { useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import Map from "../Container/Map";

export default function Home() {
    const {classes} = useStyles();

    const requestHelp = useCallback(() => {
        window.location.href = "/request-help";
    }, []);
    const provideHelp = useCallback(() => {
        window.location.href = "/provide-help";
    }, []);
    const goToMap = useCallback(() => {
        window.location.href = "/map";
    }, []);


    return (
        <div className={classes.container}>
            <div className="card" onClick={requestHelp}>
                <span>طلب مساعدة</span>
            </div>
            <div className="card" onClick={provideHelp}>
                <span>تقديم مساعدة</span>
            </div>
            <div className="card" onClick={goToMap}>
                <span>الخريطة</span>
            </div>
        </div>
    );
}

const useStyles = makeStyles()((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        height: "100%",
    },
}));
