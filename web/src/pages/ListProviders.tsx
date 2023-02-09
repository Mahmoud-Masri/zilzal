import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import map from "lodash/map";
import keys from "lodash/keys";
import { useEffect, useMemo, useState } from "react";
import listProviders from "../apis/listProviders";
import { UpdateProvide } from "../apis/provideHelp";
import { HelpProvider, RequestStatus } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";
import { CustomToolbar } from "./CustomToolbar";
import { services } from "./ProvideHelp";

const status: { value: RequestStatus; title: string }[] = [
    { value: "Canceled", title: "ألغيت" },
    { value: "Done", title: "منتهي" },
    { value: "New", title: "جديد" },
    { value: "InProgress", title: "في تَقَدم" },
];

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
        <div className="table-container">
            <div className="list-header">
                <FormControl>
                    <InputLabel>فلتر</InputLabel>
                    <Select
                        size="small"
                        style={{ maxWidth: 320, flex: 1, minWidth: 200 }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as RequestStatus)}
                        label="فلتر"
                    >
                        {map(status, (x) => (
                            <MenuItem key={x.value} value={x.value}>
                                {x.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={update}>
                    تحديث
                </Button>
            </div>

            <Box sx={{ width: "calc(100% - 16px)", alignSelf: "center", flex: 1 }}>
                <DataGridPremium
                    className="table"
                    getRowId={(row) => row._id}
                    rows={filteredData}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onCellEditCommit={(params) => {
                        const { id, value } = params;

                        UpdateProvide(id as string, { [params.field]: value }).catch(() => {
                            alert("فشل التحديث");
                        });
                    }}
                    columns={[
                        { field: "_id", headerName: "_id" },
                        {
                            field: "type",
                            headerName: "الخدمة",
                            type: "singleSelect",
                            valueOptions: keys(services),
                            editable: true,
                        },
                        {
                            field: "status",
                            headerName: "الحالة",
                            type: "singleSelect",
                            valueOptions: ["New", "InProgress", "Done", "Canceled"],
                            editable: true,
                        },
                        {
                            field: "hasCar",
                            headerName: "توفر عربية",
                            type: "boolean",
                            editable: true,
                        },
                        {
                            field: "internalNotes",
                            headerName: "ملاحظات داخلية",
                            editable: true,
                            minWidth: 300,
                        },
                        {
                            field: "phoneNumber",
                            headerName: "رقم الهاتف",
                            width: 150,
                            editable: true,
                        },
                        {
                            field: "address",
                            headerName: "العنوان",
                            width: 280,
                            editable: true,
                        },
                        {
                            field: "note",
                            headerName: "ملاحظات",
                            width: 300,
                            editable: true,
                        },

                        {
                            field: "actions",
                            headerName: "اجراءات",
                            width: 264,
                            renderCell: (params) => {
                                return (
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Button
                                            disabled={params.row.status === "Canceled"}
                                            variant="contained"
                                            color="error"
                                            onClick={() => deleteRow(params.row._id)}
                                        >
                                            حذف
                                        </Button>

                                        <Button
                                            disabled={params.row.status === "InProgress"}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => inProgress(params.row._id)}
                                        >
                                            قيد التنفيذ
                                        </Button>

                                        <Button
                                            disabled={params.row.status === "Done"}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => done(params.row._id)}
                                        >
                                            تم الانجاز
                                        </Button>
                                    </div>
                                );
                            },
                        },
                        {
                            field: "contactInfo",
                            headerName: "معلومات التواصل",
                            editable: true,
                        },
                        { field: "lat", headerName: "lat" },
                        { field: "lng", headerName: "lng" },
                        { field: "country", headerName: "الدولة(تلقائي)" },
                        { field: "region", headerName: "المحافظة(تلقائي)" },
                        { field: "city", headerName: "المنطقة(تلقائي)" },
                    ]}
                />
            </Box>
        </div>
    );
}
