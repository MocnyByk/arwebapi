module.exports = {
    log: function(msg){
        console.log(msg);
    },

    buildMessageJson: function(msg){
        return { message: msg };
    }
}