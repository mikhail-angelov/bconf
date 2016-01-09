
class RobotManager{

    constructor(bus){
        this.bots = {};
        this.eventBus = bus;
        this.eventBus.on(this.eventBus.SOCKET_MESSAGE, (client, message)=>this.dispatch(client, message));
    }

    register(bot){
        this.bots[bot.id] = bot;
    }

    dispatch(client, message){
        if(client.type === 'bot') {
            let bot = this.bots[client.id];
            if (bot) {
                bot.dispatch(message);
            }
        }
    }

    send(client, message){
        this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, message);
    }
}

export default RobotManager;