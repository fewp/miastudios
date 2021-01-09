const emojis = require("../assets/emojis.json");

module.exports = {
    do: function(reaction){
        var x = 0;
        var i = 0;
        var text = "";
        if(reaction.emoji.id === emojis[1].id) x = 1;
        if(reaction.emoji.id === emojis[2].id) x = 2;
        if(reaction.emoji.id === emojis[3].id) x = 3;
        if(reaction.emoji.id === emojis[4].id) x = 4;
        if(reaction.emoji.id === emojis[5].id) x = 5;

        do{
            text += `${emojis.star.text} `;
            i++;
        } while (i < x);

        return text;
    }
}