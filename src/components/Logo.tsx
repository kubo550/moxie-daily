import { CSSProperties } from "react";
import logo from "../assets/logo.svg";

const styles = {
    logoContainer: {
        position: "absolute",
        top: "10px",
        left: "10px",
        width: "9vw",
        maxWidth: "100px",
        minWidth: "50px",
    } as CSSProperties,

    logo: {
        width: "100%",
        height: "auto",
        borderRadius: "50%",
    } as CSSProperties,
};

export const Logo = () => (
    <div style={styles.logoContainer}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
    </div>
);
