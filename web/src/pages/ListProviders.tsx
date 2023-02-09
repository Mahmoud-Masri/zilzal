import React, { useEffect, useState } from "react";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import listProviders from "../apis/listProviders";

export default function ListProviders() {
    const [data, setData] = useState([]);
    useEffect(() => {
        listProviders().then((data) => {
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
