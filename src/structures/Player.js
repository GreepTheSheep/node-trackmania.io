class Player {
    constructor(client, data){
        this.client = client;

        Object.assign(this, data);
    }

}

module.exports = Player;