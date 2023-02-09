import { DataGridPremium } from "@mui/x-data-grid-premium"
import { useEffect, useState } from "react"
import listRequests from "../apis/listRequests"

export default function ListRequests() {
    const [data, setData] = useState([]);
    useEffect(() => {
        listRequests().then((data) => {
            setData(data);
        });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <DataGridPremium rows={data} columns={[{ field: "id", headerName: "ID", width: 70 }]} />
        </div>
    );
}
