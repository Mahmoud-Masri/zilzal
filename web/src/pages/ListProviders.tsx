import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useEffect, useMemo, useState } from "react";
import listProviders from "../apis/listProviders";
import { HelpProvider, RequestStatus } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";
import map from "lodash/map";

const status: RequestStatus[] = ["Canceled", "Done", "New", "InProgress"];

export default function ListProviders() {
    const [data, setData] = useState<HelpProvider[]>([]);
    const [filter, setFilter] = useState<RequestStatus>("New");

    useEffect(() => {
        listProviders().then((data) => {
            setData(data);
        });
    }, []);
    useHideTableStamp();
    const filteredData = useMemo(() => data.filter((x) => x.status === filter), [data, filter]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container table-container">
            <FormControl classes={{ root: "input" }}>
                <InputLabel>فلتر</InputLabel>
                <Select
                    style={{ maxWidth: 320 }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as RequestStatus)}
                >
                    {map(status, (x) => (
                        <MenuItem key={x} value={x}>
                            {x}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <DataGridPremium
                className="table"
                getRowId={(row) => row._id}
                rows={filteredData}
                experimentalFeatures={{ newEditingApi: true }}
                columns={[
                    { field: "_id", headerName: "_id" },
                    { field: "type", headerName: "الخدمة" },
                    { field: "hasCar", headerName: "توفر عربية" },
                    { field: "contactInfo", headerName: "معلومات التواصل" },
                    { field: "phoneNumber", headerName: "رقم الهاتف" },
                    { field: "address", headerName: "العنوان" },
                    { field: "note", headerName: "ملاحظات" },
                    { field: "status", headerName: "الحالة" },
                    { field: "lat", headerName: "lat" },
                    { field: "lng", headerName: "lng" },
                    { field: "country", headerName: "الدولة(تلقائي)" },
                    { field: "region", headerName: "المحافظة(تلقائي)" },
                    { field: "city", headerName: "المنطقة(تلقائي)" },
                ]}
            />
        </div>
    );
}
