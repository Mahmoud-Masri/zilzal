import { DataGridPremium } from "@mui/x-data-grid-premium"
import { useEffect, useState } from "react"
import listRequests from "../apis/listRequests"
import { HelpRequest } from "../db"
import { useHideTableStamp } from "../hooks/useHideTableStamp"

export default function ListRequests() {
    const [data, setData] = useState<HelpRequest[]>([]);
    useEffect(() => {
        listRequests().then((data) => {
            setData(data);
        });
    }, []);

    useHideTableStamp()

    const deleteRow = (id) => {
        console.log(id);
    };

    const inProgress = (id) => {
        console.log(id);
    };

    const done = (id) => {
        console.log(id);
    };
    

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container table-container">
            <DataGridPremium
                className="table"
                getRowId={(row) => row._id}
                rows={data}
                columns={[
                    { field: "_id", headerName: "_id" },
                    { field: "type", headerName: "الخدمة" },
                    { field: "status", headerName: "الحالة" },
                    { field: "reportedSeverity", headerName: "الاهمية المطلوبة" },
                    { field: "severity", headerName: "الاهمية" },
                    { field: "contactInfo", headerName: "معلومات التواصل" },
                    { field: "phoneNumber", headerName: "رقم الهاتف" },
                    { field: "address", headerName: "العنوان" },
                    { field: "note", headerName: "ملاحظات" },
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
