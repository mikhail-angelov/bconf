class BaseBot{

    constructor(RobotManager, id){
        this.RobotManager = RobotManager;
        this.type = 'bot';
        this.id = id;
        RobotManager.register(this);
    }
}

export default BaseBot;