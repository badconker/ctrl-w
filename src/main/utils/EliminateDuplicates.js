Main.k.EliminateDuplicates = function(arr) {
    var i, len=arr.length, out=[], obj={};
    for (i=0;i<len;i++) obj[arr[i]]=0;
    for (i in obj){
        if (obj.hasOwnProperty(i)) {
            out.push(i);
        }
    }
    return out;
};