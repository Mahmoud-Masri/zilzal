import { Button } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import listProviders from "../apis/listProviders";
import { UpdateProvide } from "../apis/provideHelp";
import { HelpProvider } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";

export default function ListProviders() {
    const [data, setData] = useState<HelpProvider[]>([]);
    useEffect(() => {
        listProviders().then((data) => {
            setData(data);
        });
    }, []);
    useHideTableStamp();

    const deleteRow = (id) => {
        UpdateProvide(id, { status: "Canceled" }).then(() => {
            setData(data.map((row) => (row._id === id ? { ...row, status: "Canceled" } : row)));
        });
    };

    const inProgress = (id) => {
        UpdateProvide(id, { status: "InProgress" }).then(() => {
            setData(data.map((row) => (row._id === id ? { ...row, status: "InProgress" } : row)));
        });
    };

    const done = (id) => {
        UpdateProvide(id, { status: "Done" }).then(() => {
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
                experimentalFeatures={{ newEditingApi: true }}
                columns={[
                    { field: "_id", headerName: "_id" },
                    { field: "type", headerName: "الخدمة" },
                    { field: "hasCar", headerName: "توفر عربية" },
                    { field: "contactInfo", headerName: "معلومات التواصل" },
                    { field: "phoneNumber", headerName: "رقم الهاتف", width: 300 },
                    { field: "address", headerName: "العنوان" },
                    { field: "note", headerName: "ملاحظات" },
                    { field: "status", headerName: "الحالة" },
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
