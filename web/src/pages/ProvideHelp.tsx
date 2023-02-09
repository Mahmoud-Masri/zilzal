import { Button, TextField } from "@mui/material"
import { useCallback, useState } from "react"
import requestHelp from "../apis/requestHelp"
import { useCurrentLocation } from "../hooks/useCurrentLocation"

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
            <TextField classes={{ root: "input" }} label="القدرات" variant="outlined" />
            <Button variant="contained" onClick={submit}>
                تسجيل
            </Button>
        </div>
    );
}


