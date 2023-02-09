import React, { useCallback } from "react";

export default function Home() {
    const requestHelp = useCallback(() => {
        window.location.href = '/request-help'
    }, [])
    const provideHelp = useCallback(() => {
        window.location.href = '/provide-help'
    }, [])
    return (
        <div className="container">
            <div className="card" onClick={requestHelp}>
                <span>طلب مساعدة</span>
            </div>
            <div className="card" onClick={provideHelp}>
                <span>تقديم مساعدة</span>
            </div>
        </div>
    );
}
