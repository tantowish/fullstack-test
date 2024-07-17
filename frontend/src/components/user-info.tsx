'use client'

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function UserInfo() {
    const [name, setName] = useState("");
    const [cookies] = useCookies(['user']);
    useEffect(() => {
        if (cookies.user && cookies.user.Name) {
            setName(cookies.user.Name);
        }
    }, [cookies.user]);
    return (
        <div>Sign In as: {name || "Guest"}</div>
    );
}
