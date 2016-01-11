import BaseBot from './baseBot.js'

class Echo extends BaseBot{

    constructor(RobotManager){
        super(RobotManager, 'echo');
        this.name = 'Echo';
        this.avatar = 'assets/material/share-arrow.svg';
    }

    dispatch(client, message){
        this.RobotManager.send(client, message);
    }

}

export default Echo;