import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import map from "lodash/map";
import { useEffect, useMemo, useState } from "react";
import listRequests from "../apis/listRequests";
import { UpdateRequest } from "../apis/requestHelp";
import { HelpRequest, RequestStatus } from "../db";
import { useHideTableStamp } from "../hooks/useHideTableStamp";
import { CustomToolbar } from "./CustomToolbar";

const status: { value: RequestStatus; title: string }[] = [
    { value: "Canceled", title: "ألغيت" },
    { value: "Done", title: "منتهي" },
    { value: "New", title: "جديد" },
    { value: "InProgress", title: "في تَقَدم" },
];

export default function ListRequests() {
    const [data, setData] = useState<HelpRequest[]>([]);
    const [filter, setFilter] = useState<RequestStatus>("New");
    const [updateId, setUpdateId] = useState<number>(() => Math.random());
    useEffect(() => {
        listRequests().then((data) => {
            console.log(data);
            setData(data);
        });
    }, [updateId]);

    const update = () => {
        setUpdateId(Math.random());
    };

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

    const filteredData = useMemo(() => data.filter((x) => x.status === filter), [data, filter]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="table-container">
            <div className="list-header">
                <FormControl classes={{ root: "input" }}>
                    <InputLabel>فلتر</InputLabel>
                    <Select
                        size="small"
                        style={{ maxWidth: 320, flex: 1, minWidth: 200 }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as RequestStatus)}
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

                        UpdateRequest(id as string, { note: value }).catch(() => {
                            alert("فشل التحديث");
                        });
                    }}
                    columns={[
                        { field: "_id", headerName: "_id" },
                        { field: "type", headerName: "الخدمة" },
                        { field: "status", headerName: "الحالة" },
                        { field: "reportedSeverity", headerName: "الاهمية المطلوبة" },
                        { field: "severity", headerName: "الاهمية" },
                        { field: "contactInfo", headerName: "معلومات التواصل" },
                        { field: "phoneNumber", headerName: "رقم الهاتف", width: 300 },
                        { field: "address", headerName: "العنوان" },
                        {
                            field: "note",
                            headerName: "ملاحظات",
                            editable: true,
                            minWidth: 300,
                        },
                        { field: "lat", headerName: "lat" },
                        { field: "lng", headerName: "lng" },
                        { field: "country", headerName: "الدولة(تلقائي)" },
                        { field: "region", headerName: "المحافظة(تلقائي)" },
                        { field: "city", headerName: "المنطقة(تلقائي)" },
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
                    ]}
                />
            </Box>
        </div>
    );
}
