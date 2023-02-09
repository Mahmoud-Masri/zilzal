import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import map from "lodash/map";
import { useEffect, useMemo, useState } from "react";
import listProviders from "../apis/listProviders";
import { UpdateProvide } from "../apis/provideHelp";
import { HelpProvider, RequestStatus } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";
import { CustomToolbar } from "./CustomToolbar";

const status: RequestStatus[] = ["Canceled", "Done", "New", "InProgress"];

export default function ListProviders() {
    const [data, setData] = useState<HelpProvider[]>([]);
    const [filter, setFilter] = useState<RequestStatus>("New");
    const [updateId, setUpdateId] = useState<number>(() => Math.random());

    useEffect(() => {
        listProviders().then((data) => {
            setData(data);
        });
    }, [updateId]);

    const update = () => {
        setUpdateId(Math.random());
    };

    useHideTableStamp();
    const filteredData = useMemo(() => data.filter((x) => x.status === filter), [data, filter]);

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

            <Button variant="contained" color="primary" onClick={update}>
                تحديث
            </Button>

            <DataGridPremium
                className="table"
                getRowId={(row) => row._id}
                rows={filteredData}
                components={{
                    Toolbar: CustomToolbar,
                }}
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
