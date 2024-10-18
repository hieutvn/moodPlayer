
const loginBtn = document.getElementById('login-btn');
const clientId = "fdcfef66b1fd4e439fc6a2064e3541fb";
const callbackUri = "http://localhost:3000/callback";

function redirectToAuthentication() {

    const redirectURL = new URLSearchParams();
    
    redirectURL.append("client_id", clientId);
    redirectURL.append("response_type", "code");
    redirectURL.append("redirect_uri", callbackUri);
    redirectURL.append("state", generateRandomString(16));
    redirectURL.append("scope", "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state");

    document.location = `https://accounts.spotify.com/authorize?${redirectURL.toString()}`;
}

function generateRandomString(length) {

    let text            = '';
    let possible        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

loginBtn.addEventListener('click', redirectToAuthentication);