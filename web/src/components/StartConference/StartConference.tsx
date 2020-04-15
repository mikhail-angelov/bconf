import React, { useState } from 'react';
import { TextField, ImageIcon, PrimaryButton, IButtonStyles } from 'office-ui-fabric-react';
import Speaker from "../../../assets/speaker-icon.svg"
import "./startConference.scss";

interface Props {
    toHome: () => void;
};

const primaryButtonStyle: IButtonStyles = {
    root: {
        height: "32px",
        background: "#0078D4",
        borderRadius: "2px",
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

export const StartConference = ({ toHome }: Props) => {
    return (
        <div className="start-conference-content">
            <div className="fields">
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
            <div className="icons">
                <ImageIcon imageProps={{ src: Speaker }} />
                <ImageIcon imageProps={{ src: Speaker }} />
                <ImageIcon imageProps={{ src: Speaker }} />
                <ImageIcon imageProps={{ src: Speaker }} />
            </div>
            <div className="buttons">
                <div className="forgetPassword">Forget password</div>
                <PrimaryButton
                    text="Login"
                    styles={primaryButtonStyle}
                />
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