import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { map } from "lodash"
import { useCallback, useState } from "react"
import requestHelp from "../apis/requestHelp"
import { RequestSeverity, RequestType } from "../db"
import generateUniqueId from "../generateUniqueId"
import { useCurrentLocation } from "../hooks/useCurrentLocation"
import { token } from "../token"
import { services } from "./ProvideHelp"


const severity: Record<RequestSeverity, string> = {
    unclassified: "غير مصنف",
    critical: "حرج",
    low: "منخفض",
    normal: "متوسطة",
};

export default function RequestHelp() {
    const [phone, setPhone] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [service, setService] = useState<RequestType>("Clothing");
    const [note, setNote] = useState("");
    const [reportedSeverity, setReportedSeverity] = useState<RequestSeverity>("unclassified");

    const [status, location] = useCurrentLocation();

    const submit = useCallback(async () => {
        const _id = generateUniqueId();
        const res = await requestHelp({
            phoneNumber: phone,
            address,
            type: service,
            note,
            contactInfo,
            lat: location?.lat,
            lng: location?.lng,
            token: token,
            _id,
            severity: "unclassified",
            status: "New",
            reportedSeverity,
            props: {},
        });

        if (res.ok) {
            alert("تم الإرسال بنجاح");
        } else {
            alert("حدث خطأ");
        }
    }, [address, contactInfo, location?.lat, location?.lng, note, phone, reportedSeverity, service]);

    return (
        <div className="container">
            <h1>طلب مساعدة</h1>
            <TextField
                classes={{ root: "input" }}
                label="رقم الهاتف"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
                classes={{ root: "input" }}
                label="العنوان"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <FormControl classes={{ root: "input" }}>
                <InputLabel>اختر خدمة</InputLabel>
                <Select value={service} onChange={(e) => setService(e.target.value)}>
                    {map(services, (name, type) => (
                        <MenuItem key={name} value={type}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl classes={{ root: "input" }}>
                <InputLabel>الخطورة</InputLabel>
                <Select value={reportedSeverity} onChange={(e) => setReportedSeverity(e.target.value)}>
                    {map(severity, (name, type) => (
                        <MenuItem key={name} value={type}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                classes={{ root: "input" }}
                label="شرح"
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <TextField
                classes={{ root: "input" }}
                label="معلومات تواصل أخرى (اختياري))"
                variant="outlined"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
            />

            <Button variant="contained" onClick={submit}>
                تسجيل
            </Button>
        </div>
    );
}
