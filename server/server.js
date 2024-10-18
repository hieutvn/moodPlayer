const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {

    origin: 'http://localhost:3000'
};

require('dotenv').config();

const PORT = 3000;

//const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, CALLBACK_URI } = process.env;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CALLBACK_URI = process.env.CALLBACK_URI;


//// MIDDLEWARE

async function transferToken(req, res, next) {

    const authCode = req.authCode;

    const spotifyAccess = await requestAccessToken(authCode)

    // REFRESH, EXPIRES bleibt übrig
    const { accessToken, refreshToken, expiresIn } = spotifyAccess;

    req.accessToken = accessToken;

    //checkExpiry(expiresIn);
    next();
}

//app.use(transferToken);

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '..', 'server', 'statics')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy({

    directives: {

        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://sdk.scdn.co"],
        frameSrc: ["'self'", "https://sdk.scdn.co"],
        connectSrc: ["'self'", "https://sdk.scdn.co", "https://api.spotify.com"]
    }

})
);

////


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

//// STATIC ROUTES

app.get("/", (req, res) => {

    res.send("Hello")
})

app.get("api/auth/login", (req, res) => {

    //res.render("login");
    console.log('Redirecting to external auth provider');

    const redirectURL = redirectToAuthentication();

    res.redirect(`https://accounts.spotify.com/authorize?${redirectURL.toString()}`);
});

app.get("/callback", async (req, res, next) => {

    const authCode = req.query.code;
    const authState = req.query.state;

    req.authCode = authCode;

    next();
},
    transferToken,
    (req, res) => {

        // => TOKEN RECEIVED
        res.cookie('recentAccessToken', req.accessToken, { httpOnly: false })
        res.redirect("/player");
    }
);

app.get("/player", (req, res) => {

    res.render("player")
});


////




//// DYNAMIC ROUTES



////



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

    const redirectURL = new URLSearchParams();

    redirectURL.append("client_id", SPOTIFY_CLIENT_ID);
    redirectURL.append("response_type", "code");
    redirectURL.append("redirect_uri", CALLBACK_URI);
    redirectURL.append("state", generateRandomString(16));
    redirectURL.append("scope", "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state");

    //document.location = `https://accounts.spotify.com/authorize?${redirectURL.toString()}`;
    return redirectURL;
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
        // 
        const data = await response.json();
        const responseData = {

            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        }

        return responseData;
    }
    catch (error) { console.error('Error', error) }
}

function checkExpiry(expiry) {

    const expiryTime = Date.now() + expiresIn * 1000;

}



////



//// TESTING
async function getAlbum(accessToken) {

    const res = await fetch('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {

        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }

    })

    const data = res.json();

    return data;
}
////


app.listen(PORT || 3000, () => {

    console.log(`Server is running on port ${PORT}`)
});
