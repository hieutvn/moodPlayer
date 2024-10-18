const accessToken = getCookie('recentAccessToken');


window.onSpotifyWebPlaybackSDKReady = () => {

    const player = new window.Spotify.Player({

        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(accessToken) },
        volume: 0.5
    });


    player.addListener('ready', ({ device_id }) => {

        console.log(`Ready with device ${device_id}`);

        playTrack(device_id, accessToken, "spotify:track:11dFghVXANMlKmJXsNCbNl")

        //getTrack("11dFghVXANMlKmJXsNCbNl", accessToken);

    });

    document.getElementById('play').addEventListener('click', () => {

        player.resume().then(() => console.log('Track resumed.'));
    });

    document.getElementById('pause').addEventListener('click', () => {
        player.pause().then(() => {
            console.log('Paused playback!');
        });
    });


    player.connect().then(success => {

        if (success) console.log("Success")
    });


    //// ERROR HANDLING
    player.on('initialization_error', ({ message }) => console.log("Initialization error", message));
    player.on('authentication_error', ({ message }) => console.log("Authentication error", message));
    player.on('account_error', ({ message }) => console.log("Account error", message));
    player.on('playback_error', ({ message }) => console.log("Playback error", message));
}


function getCookie(name) {

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    return (parts.length === 2) ? parts.pop().split(';').shift() : null;
}



async function playTrack(deviceId, accessToken, trackUri) {

    const request = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {

        method: 'PUT',
        body: JSON.stringify({

            uris: [trackUri],

        }),
        headers: {

            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

        .then(response => {
            if (response.status === 204) {
                console.log('Track is playing!');

            } else {
                console.error('Failed to play the track:', response);
            }
        })
        .catch(error => console.error('Error:', error));
}


async function getTrack(accessToken) {

    const resp = await fetch()
}   