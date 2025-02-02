const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {

    origin: 'http://localhost:5173'
};


const PORT = 3000;
const authRouter = require("./routes/auth.js");




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

app.use("/api/auth", authRouter);

////


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

//// STATIC ROUTESn 

app.get("/", (req, res) => {

    res.send("Start")
});

app.get("/dashboard", (req, res) => {

    res.send("Dashboard");
});


////




//// DYNAMIC ROUTES




////






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
