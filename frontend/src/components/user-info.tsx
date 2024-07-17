'use client'

import { apiUrl } from "@/lib/env-variable";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";


export default function UserInfo() {
    const [name, setName] = useState("");
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(cookies.token)
                const response = await fetch(`${apiUrl}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const userData = await response.json();
                setName(userData.data.Name);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [cookies.token]);

    return (
        <div>Sign In as: {name || "Guest"}</div>
    );
}
