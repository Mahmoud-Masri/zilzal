import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import requestHelp from "../apis/requestHelp";

export default function ProvideHelp() {
    const [phone, setPhone] = useState("");

    const [status, location] = useCurrentLocation();

    console.log(status, location);
    const submit = useCallback(() => {
        requestHelp({ type: "", contactInfo: "" });
    }, []);

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
            <TextField classes={{ root: "input" }} label="طريقة التواصل" variant="outlined" />
            <TextField classes={{ root: "input" }} label="القدرات" variant="outlined" />
            <Button variant="contained" onClick={submit}>
                تسجيل
            </Button>
        </div>
    );
}

export function useCurrentLocation() {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
    const [location, setLocation] = useState({});
    useEffect(() => {
        if (navigator.geolocation) {
            const cb = (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setStatus("loaded");
            };
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            setStatus("error");
        }
    }, []);

    return [status, location];
}
