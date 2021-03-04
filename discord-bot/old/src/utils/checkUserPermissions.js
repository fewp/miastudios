const roles = require("../assets/roles.json");

module.exports = {
    do: function (member, guild) {
        let user = guild.members.cache.get(member.id);

        if (user.roles.cache.some(x => x.id === roles.management)) {
            return true;
        } else {
            return false;
        }
    }
}





