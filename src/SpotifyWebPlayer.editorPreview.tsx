import { ReactElement, createElement } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import { SpotifyWebPlayerPreviewProps } from "../typings/SpotifyWebPlayerProps";

export function preview({token, uri  }: SpotifyWebPlayerPreviewProps): ReactElement {
    return (
        <SpotifyPlayer
            token={token}
            uris={uri}
        />
        );
}

export function getPreviewCss(): string {
    return require("./ui/SpotifyWebPlayer.css");
}
