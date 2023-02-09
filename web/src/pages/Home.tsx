import React, { useCallback } from "react";

export default function Home() {
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
        <div className="container home-container">
            <h1 className="title">هذا الموقع لطلب وعرض المساعدة في ما يتعلق بالزلزال في الشمال السوري</h1>
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
