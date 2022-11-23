import { TextField } from "@mui/material";
import { useState } from "react";

export default function Input({ label, name, onError }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState({ error: false, msg: "" });

    function handleChange(e) {
        const value = e.target.value;
        setValue(value);
    }

    function verifyError() {
        if (value.length === 0) {
            setError({
                error: true,
                msg: "Esse campo não pode ser vazio!",
            });
            return;
        }

        setError({
            error: false,
            msg: "",
        });
    }

    return (
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            name={name}
            type="number"
            value={value}
            onChange={(e) => handleChange(e)}
            onBlur={verifyError}
            error={error.error}
            helperText={error.msg}
        />
    );
}