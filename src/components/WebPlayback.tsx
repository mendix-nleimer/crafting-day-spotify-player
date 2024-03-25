import { ReactElement, createElement, useState, useEffect } from "react";

export interface WebPlaybackProps {
    token: string;
}

const WebPlayback = ({ token }: WebPlaybackProps): ReactElement => {

    const [_player, setPlayer] = useState(undefined);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        const myWindow = window as any;
        myWindow.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = myWindow.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb: any)  => { cb(token); },
                volume: 0.5
            });
    
            setPlayer(player);
    
/*             player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            }); */
    
    
            player.connect();
    
        };


        
    }, []);
    
    return (
        <div className="container">
            <div className="main-wrapper">{token}</div>
        </div>
    );
};

export default WebPlayback;