import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import requestHelp from "../apis/requestHelp";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { makeStyles } from "tss-react/mui";

const services = ["food", "medicine", "transportation", "other"];

export default function ProvideHelp() {
    const { classes } = useStyle();

    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [service, setService] = useState("");
    const [note, setNote] = useState("");

    const [status, location] = useCurrentLocation();

    console.log(status, location);
    const submit = useCallback(() => {
        requestHelp({ type: "", contactInfo: "" });
    }, []);

    return (
        <div className={classes.container}>
            <h1>عرض مساعدة</h1>
            <TextField type='number' label="رقم الهاتف" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="المدينة" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
            <FormControl>
                <InputLabel >اختر خدمة</InputLabel>
                <Select
               
                value={service} onChange={(e) => setService(e.target.value)}>
                    {services.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="ملاحظة" variant="outlined" value={note} onChange={(e) => setNote(e.target.value)} />
            <Button variant="contained" onClick={submit}>
                تسجيل
            </Button>
        </div>
    );
}

const useStyle = makeStyles()((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 24,
    },
}));
