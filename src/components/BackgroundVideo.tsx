import backgroundVideo from "/moxie_background.mp4";
import {CSSProperties} from "react";

const styles = {
    videoContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
    } as CSSProperties,
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    } as CSSProperties,
}

export const BackgroundVideo = () => {
    return (
        <div style={styles.videoContainer}>
            <video autoPlay loop muted style={styles.video}>
                <source src={backgroundVideo} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}