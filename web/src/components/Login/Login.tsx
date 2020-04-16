import React from 'react';
import { TextField, PrimaryButton, IButtonStyles } from 'office-ui-fabric-react';
import "./login.scss";

interface Props {
    toHome: () => void;
};

const primaryButtonStyle: IButtonStyles = {
    root: {
        height: "32px",
        background: "#0078D4",
        borderRadius: "2px",
        marginRight: "7px",
    },
    label: {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "19px",
    }
};

const cancelButtonStyle: IButtonStyles = {
    root: {
        height: "32px",
        background: "#FFFFFF",
        border: "1px solid #8A8886",
        borderRadius: "2px",
    },
    label: {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "19px",
        color: "#323130",
    },
    rootHovered: {
        border: "1px solid #8A8886",
        background: "#F1F1F1"
    }
};

export const Login = ({ toHome }: Props) => {
    return (
        <div className="login-content">
            <div className="fields">
                <TextField
                    label="name"
                    placeholder="Placeholder"
                />
                <TextField
                    label="email"
                    type="email"
                    placeholder="Placeholder"
                />
                <TextField
                    label="password"
                    type="password"
                    placeholder="Placeholder"
                />
            </div>
            <div className="buttons">
                <PrimaryButton
                    text="SignUp"
                    styles={primaryButtonStyle}
                />
                <PrimaryButton
                    text="Cancel"
                    styles={cancelButtonStyle}
                    onClick={toHome}
                />
            </div>
        </div>
    );
};