module.exports = {
    do: function(array){
        var cleanArray1 = array.filter(function (nulos) {
            return nulos != " ";
        });
        var cleanArray = cleanArray1.filter(function (nulos) {
            return nulos != "";
        });
        return cleanArray;
    }
}