console.log("Loading date.js")

//var chrono = Npm.require('chrono-node')
// chrono is public for debug purposes, TODO
chrono = require('chrono-node')

//------------------------------------------------
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

//-------------------------------------------
parseDate = function(text, refDate) {
    var d = toDate(text, refDate)
    console.log("To date is", d)
    var date = d ? d.start.date() : null
    var dateAsText = d ? d.text : null
    return {date, dateAsText }
}

//-------------------------------------------------
toDate = function (text, ref) {
    var parsed = chrono.parse(text, ref)

    // If sentence does not contain date, default to the date an hour from the reference date
    // (usually, an hour from now)
    //   if (parsed.length == 0)
    //       return {text:null, start:new Date(ref).addHours(1)}

    var d = parsed[0]
    console.log("D is", JSON.stringify(d))
    return d;

}

//---------------------------------------------------
allowDrop = function(ev) {
    ev.preventDefault();
}

//Irina
 drag = function(ev) {
    console.log("drag called", ev.target.id, "aaa", ev)
    ev.dataTransfer.setData("text",  ev.target.id);
}

drop = function(ev) {
    console.log("drop called", ev.target.id, "aaa", ev)
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}




