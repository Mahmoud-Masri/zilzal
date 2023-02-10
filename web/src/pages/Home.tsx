import React, { useCallback } from "react";

export default function Home() {
    const requestHelp = useCallback(() => {
        window.location.href = "/request-help";
    }, []);
    const provideHelp = useCallback(() => {
        window.location.href = "/provide-help";
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
            {/* <a
                className="card"
                href="https://hypatiatech.notion.site/54bfd1f4f64b4d6f855e808f748dffc5?v=22f85b570ffe41f39a62b5bd0f4848ae"
            >
                <div>
                    <span>روابط مفيدة</span>
                </div>
            </a> */}
        </div>
    );
}
