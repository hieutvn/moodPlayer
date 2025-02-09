import { useState, useEffect } from 'react';

export default function useAuth() {

    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpirey] = useState(null);

    useEffect(() => {

        const fetchToken = async () => {

            try {

                const requestToken = await fetch("http://localhost:3000/api/auth/get-token");

                const data = await requestToken.json();

                if (!data) return;

                console.log("Setting access")
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

    // SETTING REFRESH TOKEN
    useEffect(() => {

        const interval = setInterval(async () => {

            const fetchRefreshToken = async () => {
                if (refreshToken === null || expiresIn === null) return;

                try {

                    const requestRefreshToken = await fetch("http://localhost:3000/api/auth/get-refresh");

                    const data = await requestRefreshToken.json();

                    if (!data) return;

                    console.log("Setting refresh")
                    const { newAccessToken, newExpiresIn } = data;

                    setAccessToken(newAccessToken);
                    setExpirey(newExpiresIn);

                }
                catch (error) {

                    console.error("Failed to send refresh token to client.", error);
                }

            }
        }, (expiresIn - 60) * 1000); // EXPIRES 60 SEC BEFORE EXPIREY

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
