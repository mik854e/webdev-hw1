module.exports = function(req, res, next) {
    console.log("In rejectDuplicates");
    console.log(req.app);
    var cont = false;
    var inUUID = req.headers.uuid;
    var knownUUID = req.app.UUIDs[inUUID];

    console.log("Known UUIDS = " + JSON.stringify(req.app.UUIDs));

    // has no UUID
    if (inUUID === undefined) {
        cont = false;
        console.log("In rejectDuplicates: inUUID = " + inUUID + ", cont = " + cont);
    }

    // UUID hasn't been seen before
    if (knownUUID === undefined) {
        cont = true;
        console.log("In rejectDuplicates: inUUID = " + inUUID + ", cont = " + cont);
    }

    if (cont === true) {
        req.app.UUIDs[inUUID] = inUUID;
        console.log("rejectDuplicates: proceed");
        next();
    } else {
        res.status(403).send("Duplicate request or no uuid");
    }
};
