let userToken; 
const clientId = '62b1bca7208b414fa1d02debc3b8eed3';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (userToken) {
            return userToken;
        } else {
            const accessToken = window.location.href.match(/access_token=([^&]*)/);
            const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
            
            if (accessToken && expiresIn) {
                userToken = accessToken[1];
                const expireTime = Number(expiresIn[1]);

                window.setTimeout(() => userToken = '', expireTime * 1000);
                window.history.pushState('Access Token', null, '/');     
                return userToken;   
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
                window.location = accessUrl;
            }
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then (jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
            }));
        });
    },
    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => {return response.json();})
        .then (jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/user/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/user/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;