import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';


interface HomeProps {

};

export const Home = (props: HomeProps) => {
    return (
        <div className="home-container">
            <div className="home-inner-container">
                <div className="home-top">
                    BConf - the Best Conference
                </div>
                <div className="home-main-text">
                    room: 1basdq3s
                </div>
                <div className="home-bottom">
                    <PrimaryButton
                        text="Start free conference"
                        allowDisabledFocus
                    />
                    <PrimaryButton
                        text="Login"
                        allowDisabledFocus
                    />
                </div>
            </div>
        </div>
    );
};