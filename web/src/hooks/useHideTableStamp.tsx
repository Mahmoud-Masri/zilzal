import { useEffect } from "react";

export function useHideTableStamp() {
    useEffect(() => {
        const num = setInterval(() => {
            const tables = Array.from(document.getElementsByClassName("MuiDataGrid-main"));
            for (const table of tables) {
                const stamp = Array.from(table.children).find((x) => x.innerText === "MUI X: Missing license key");
                if (stamp) {
                    stamp.style.display = "none";
                }
            }
        }, 1000);
        return () => clearInterval(num);
    }, []);
}
