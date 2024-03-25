import { ReactElement, createElement } from "react";

import WebPlayback from "./components/WebPlayback";


import { SpotifyWebPlayerContainerProps } from "../typings/SpotifyWebPlayerProps";

import "./ui/SpotifyWebPlayer.css";

export function SpotifyWebPlayer({ token }: SpotifyWebPlayerContainerProps): ReactElement {
    return (
    <WebPlayback
        token={token.displayValue}
    />
    );
}
