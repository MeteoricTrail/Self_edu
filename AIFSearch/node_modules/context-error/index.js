module.exports = function(message, stackNumber) {
    var err = new Error(message);
    if (err.stack) {
        var parts = err.stack.split("\n");
        if (parts[stackNumber]) {
            var addon = parts[stackNumber].split("(")[1].split(")")[0];
            return new Error(err.message + " from " + addon);
        }
    }
    return err;
}