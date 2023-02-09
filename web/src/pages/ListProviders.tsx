import { DataGridPremium } from "@mui/x-data-grid-premium"
import { useEffect, useState } from "react"
import listProviders from "../apis/listProviders"
import { HelpProvider } from "../db"

export default function ListProviders() {
    const [data, setData] = useState<HelpProvider[]>([]);
    useEffect(() => {
        listProviders().then((data) => {
            setData(data);
        });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container table-container">
            <DataGridPremium
                className="table"
                getRowId={(row) => row._id}
                rows={data}
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
