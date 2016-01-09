import BaseBot from './baseBot.js'

class Echo extends BaseBot{

    constructor(RobotManager){
        this.id ='echo';
        this.name = 'Echo';
        this.avatar = 'assets/material/share-arrow.svg';
        super(RobotManager);
    }

    dispatch(client, message){
        this.RobotManager.send(client, message);
    }

}

export default Echo;