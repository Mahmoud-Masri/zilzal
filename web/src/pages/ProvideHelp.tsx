import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { map } from "lodash";
import { useCallback, useState } from "react";
import provideHelp from "../apis/provideHelp";
import { RequestType } from "../db";
import generateUniqueId from "../generateUniqueId";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { token } from "../token";

export const services: Record<RequestType, string> = {
    Food: "طعام",
    Medical: "طبي",
    Medicine: "دواء",
    Transportation: "نقل",
    Other: "أخرى",
    Residence: "سكن",
    Warming: "تدفئة",
    Clothing: "ملابس",
};

export default function ProvideHelp() {
    const [phone, setPhone] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [service, setService] = useState<RequestType>("Clothing");
    const [note, setNote] = useState("");
    const [hasCar, setHasCar] = useState(false);

    const [status, location] = useCurrentLocation();

    const submit = useCallback(async () => {
        const _id = generateUniqueId();
        const res = await provideHelp({
            phoneNumber: phone,
            address,
            type: service,
            note,
            contactInfo,
            hasCar,
            lat: location?.lat,
            lng: location?.lng,
            token: token,
            _id,
            status: "New",
        });

        if (res.ok) {
            alert("تم الإرسال بنجاح");
        } else {
            alert("حدث خطأ");
        }
    }, [address, contactInfo, hasCar, location?.lat, location?.lng, note, phone, service]);

    return (
        <div className="container">
            <h1>عرض مساعدة</h1>
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
            <TextField
                classes={{ root: "input" }}
                label="شرح"
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <FormControlLabel
                control={<Checkbox checked={hasCar} onChange={(e) => setHasCar(e.target.checked)} />}
                label="توفر سيارة"
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
