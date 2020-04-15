import React, { useState } from 'react';
import { PrimaryButton, IButtonStyles } from 'office-ui-fabric-react';
import { StartConference } from "../StartConference/StartConference";
import { Login } from "../Login/Login";
import "./home.scss";


interface HomeProps {

};

const primaryButtonStyle: IButtonStyles = {
    root: {
        height: "32px",
        width: "calc(50% - 16px/2)",
        background: "#0078D4",
        borderRadius: "2px",
    },
    label: {
        fontWeight: 500,
    }
}

export const Home = (props: HomeProps) => {
    const [isStartConference, setIsStartConference] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const setLogin = () => {
        setIsStartConference(false);
        setIsLogin(true)
    }

    return (
        <div className="home-container">
            <div className="home-inner-container">
                <div className="home-top">
                    BConf - the Best Conference
                </div>
                {isStartConference ?
                    <StartConference
                        toHome={() => setIsStartConference(false)}
                        toLogin={() => setLogin()}
                    /> :
                    isLogin ?
                        <Login
                            toHome={() => setIsLogin(false)}
                        /> :
                        <div className="home-content">
                            <div className="home-main-text">
                                room: 1basdq3s
                            </div>
                            <div className="home-bottom">
                                <PrimaryButton
                                    text="Start free conference"
                                    styles={primaryButtonStyle}
                                    onClick={() => setIsStartConference(true)}
                                />
                                <PrimaryButton
                                    text="Login"
                                    styles={primaryButtonStyle}
                                    onClick={() => setIsLogin(true)}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};