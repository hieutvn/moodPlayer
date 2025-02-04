import { useState, useEffect } from 'react';

export default function useAuth() {

    const [access_token, setAccessToken] = useState(null);
    const [refresh_token, setRefreshToken] = useState(null);
    const [expires_in, setExpirey] = useState(null);

    useEffect(() => {

        const fetchToken = async () => {

            try {

                const request_token = await fetch("http://localhost:3000/api/auth/get-token");

                const data = await request_token.json();

                const { accessToken, refreshToken, expiresIn } = data;

                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setExpirey(expiresIn);

            }
            catch (error) {
                console.error("Failed to fetch token from server.", error);

            }
        }
        fetchToken();

    }, []);

    return access_token;
}

/*
                        setAccessToken(res.data.accessToken);
                        setRefreshToken(res.data.refreshToken);
                        setExpirey(res.data.expiresIn);
*/