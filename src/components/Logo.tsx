import { CSSProperties } from "react";
import logo from "../assets/logo.svg";

const styles = {
    logoContainer: {
        position: "absolute",
        top: "10px",
        left: "10px",
        width: "9vw",
        maxWidth: "120px",
        minWidth: "100px",
    } as CSSProperties,

    logo: {
        width: "100%",
        height: "auto",
        borderRadius: "30%",
    } as CSSProperties,
};

export const Logo = () => (
    <div style={styles.logoContainer}>
        <a href="https://moxieimpact.com/pages/qr-apparel" target='_blank' rel='noreferrer'>
            <img src={logo} alt="Company Logo" style={styles.logo} />
        </a>
    </div>
);
