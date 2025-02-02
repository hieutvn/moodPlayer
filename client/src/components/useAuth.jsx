import { useState, useEffect } from 'react';

export default async function useAuth() {

    const [access_token, setAccessToken] = useState('');
    const [refresh_token, setRefreshToken] = useState('');
    const [expires_in, setExpirey] = useState('');

    useEffect(() => {

        const fetchToken = async () => {

            try {

                const request_token = await fetch("http://localhost:3000/api/auth/get-token");

                const data = await request_token.json();

                console.log(data)

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