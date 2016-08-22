function debug(msg) {
    console.log(msg);
}

function error(msg, ex) {
    console.error(msg, ex.stack);
}

export default {
    debug,
    error
};