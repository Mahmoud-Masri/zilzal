import { Button } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import listRequests from "../apis/listRequests";
import { UpdateRequest } from "../apis/requestHelp";
import { HelpRequest } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";

export default function ListRequests() {
    const [data, setData] = useState<HelpRequest[]>([]);
    useEffect(() => {
        listRequests().then((data) => {
            console.log(data);
            setData(data);
        });
    }, []);

    useHideTableStamp();

    const deleteRow = (id) => {
        UpdateRequest(id, { status: "Canceled" }).then(() => {
            setData(data.map((row) => (row._id === id ? { ...row, status: "Canceled" } : row)));
        });
    };

    const inProgress = (id) => {
        UpdateRequest(id, { status: "InProgress" }).then(() => {
            setData(data.map((row) => (row._id === id ? { ...row, status: "InProgress" } : row)));
        });
    };

    const done = (id) => {
        UpdateRequest(id, { status: "Done" }).then(() => {
            setData(data.map((row) => (row._id === id ? { ...row, status: "Done" } : row)));
        });
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
                    { field: "phoneNumber", headerName: "رقم الهاتف", width: 300 },
                    { field: "address", headerName: "العنوان" },
                    { field: "note", headerName: "ملاحظات" },
                    { field: "lat", headerName: "lat" },
                    { field: "lng", headerName: "lng" },
                    { field: "country", headerName: "الدولة(تلقائي)" },
                    { field: "region", headerName: "المحافظة(تلقائي)" },
                    { field: "city", headerName: "المنطقة(تلقائي)" },
                    {
                        field: "delete",
                        headerName: "حذف",
                        renderCell: (params) => {
                            return (
                                <Button
                                    disabled={params.row.status === "Canceled"}
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteRow(params.row._id)}
                                >
                                    حذف
                                </Button>
                            );
                        },
                    },
                    {
                        field: "inProgress",
                        headerName: " قيد التنفيذ",
                        renderCell: (params) => {
                            return (
                                <Button
                                    disabled={params.row.status === "InProgress"}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => inProgress(params.row._id)}
                                >
                                    قيد التنفيذ
                                </Button>
                            );
                        },
                    },
                    {
                        field: "done",
                        headerName: "تم الانجاز",
                        renderCell: (params) => {
                            return (
                                <Button
                                    disabled={params.row.status === "Done"}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => done(params.row._id)}
                                >
                                    تم الانجاز
                                </Button>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
