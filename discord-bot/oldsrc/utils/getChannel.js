module.exports = {
    do: function(guild, id){
        let channel = guild.channels.cache.get(id);
        return channel;
    }
}