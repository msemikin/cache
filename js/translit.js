
function encode(text){
    return unescape(encodeURIComponent(text));
}
function decode(text){
    return decodeURIComponent(escape(text));
}
