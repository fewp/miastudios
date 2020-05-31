const roles      = require("../assets/roles.json"); 

module.exports = {
    do: async function(member, guild) {
        let role = guild.roles.cache.find(x => x.id === roles.member);
        let user = guild.members.cache.get(member);
        
        if (user.roles.cache.some(x => x.id === roles.member)){
            console.log("usuário já verificado")
        } else {
            console.log("usuário verificado")
            user.roles.add(role);
        } 
    }
}

