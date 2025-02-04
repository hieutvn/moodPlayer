const express = require('express');
const router = express.Router();

require('dotenv').config();


const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CALLBACK_URI = process.env.CALLBACK_URI;

let tokenStorage = {

    accessToken: null,
    refreshToken: null,
    expiresIn: null
};
let tokenId;


router.get("/", (req, res) => {

    console.log("Route at: /");
    res.send("Start")
});

router.get("/login", (req, res) => {

    console.log("Route at: /login")

    const redirectURL = redirectToAuthentication();

    if (!redirectURL) {

        res.status(500).json({ error: "Invalid redirect URL" });

    }


    res.json({ redirectURL: redirectURL });
    res.status(200);
});

router.get("/callback",

    async (req, res) => {

        console.log("Route at: /callback")

        let authCode = '';

        try {
            authCode = req.query.code;

            const spotifyAccess = await requestAccessToken(authCode);

            if (spotifyAccess) {

                const { accessToken, refreshToken, expiresIn } = spotifyAccess;

                tokenStorage.accessToken = accessToken,
                    tokenStorage.refreshToken = refreshToken,
                    tokenStorage.expiresIn = expiresIn


                res.status(200).redirect(`http://localhost:5173/play?`);
            }

        }
        catch (error) {

            console.error("Error fetching Spotify access token:", error);
        }
    },
);

router.post('/store', (req, res) => {

    tokenStorage = req.body;

    res.json({ message: "Data stored successfully." });
});

router.get("/get-token", (req, res) => {

    console.log("Route at: /get-token");

    console.log("storage", tokenStorage)


    res.json(tokenStorage.accessToken !== null ? tokenStorage : { message: "no data available." })
});



module.exports = router;








//// MIDDLEWARE





//// FUNCTIONS

function generateRandomString(length) {

    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function redirectToAuthentication() {

    const scopes = [

        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing"
    ];

    const redirectURL = new URLSearchParams();

    redirectURL.append("client_id", SPOTIFY_CLIENT_ID);
    redirectURL.append("response_type", "code");
    redirectURL.append("redirect_uri", CALLBACK_URI);
    redirectURL.append("state", generateRandomString(16));
    //redirectURL.append("scope", "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-currently-playing");
    redirectURL.append("scope", scopes.join('%20'))

    return `https://accounts.spotify.com/authorize?${redirectURL.toString()}`;
}

async function requestAccessToken(code) {

    try {

        const authCode = await code;

        let accessUrl = new URLSearchParams();

        accessUrl.append("code", authCode);
        accessUrl.append("redirect_uri", CALLBACK_URI);
        accessUrl.append("grant_type", "authorization_code");

        const response = await fetch('https://accounts.spotify.com/api/token', {

            method: "POST",
            headers: {
                "Authorization": 'Basic ' + (new Buffer.from(SPOTIFY_CLIENT_ID + `:` + SPOTIFY_CLIENT_SECRET).toString('base64')),
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: accessUrl.toString()
        });

        const data = await response.json();

        const responseData = {

            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        };



        return responseData;
    }
    catch (error) { console.error('Error', error.message) }
}

function checkExpiry(expiry) {

    const expiryTime = Date.now() + expiresIn * 1000;

}



/* 
router.get(/callback, async (req, res) =>> {

try {
    const authCode = req.query.code;
    const spotify_access = await requestAccessToken(code);

    if (spotify_access) 
    
        const { access_token, refresh_token, expires_in } = spotifyAccess;
        res.sendStatus.json({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in
        });
    

}
catch (error) {
console.error('Failed to fetch token.', error)
res.sendStatus(400);
}
})



router.get("/get-token", (req, res) => {

    console.log("Route at: /get-token");

    console.log(tokenStorage)


    res.json({

        accessToken: tokenStorage.accessToken,
        refreshToken: tokenStorage.refreshToken,
        expiresIn: tokenStorage.expiresIn
    });
});

*/