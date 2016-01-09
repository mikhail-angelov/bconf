class BaseBot{

    constructor(RobotManager){
        this.RobotManager = RobotManager;
        this.type = 'bot';
        RobotManager.register(this);
    }
}

export default BaseBot;