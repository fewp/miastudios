const roles = require("../assets/roles.json");


module.exports = {
    do: function (member) {
        if (member.roles.cache.get(roles.management)) {
            return true;
        } else {
            return false;
        }
    }
}





