Template.calendar.helpers({
    calendarOptions: {
        // Standard fullcalendar options
        height: 700,
        slotDuration: '01:00:00',
        minTime: '08:00:00',
        maxTime: '19:00:00',
        // Function providing events reactive computation for fullcalendar plugin
        events: function (start, end, timezone, callback) {

            var events = dummyEvents()

            var todos = Todos.find().fetch()

            todos.forEach(function (todo) {
                //      console.log("todo", todo.text, todo.when)

                var color = todo.dateAsText ? "red" : "green"

                var event = {
                    title: todo.text,
                    start: todo.date,
                    color: color,
                    //        className: "calendarEvent",
                    editable: true
                    //     end: "2016-03-30T12:59:00",
                    //     allDay: false,
                }

                events.push(event)

            })

            callback(events);
        },
        // Optional: id of the calendar
        id: "calendar1",
        // Optional: Additional classes to apply to the calendar
        addedClasses: "col-md-8",
        // Optional: Additional functions to apply after each reactive events computation
        autoruns: [
            function () {
                console.log("user defined autorun function executed!");
            }
        ]
    },
});

//-----------------------------------------------------------------
function dummyEvents() {
    var e1 = {
        title: "Hello1",
        start: "2016-03-30T12:00:00",
        end: "2016-03-30T12:59:00",
        allDay: false,
        className: "calendarEvent",
        editable: true,
        startEditable: true,
        durationEditable: true

    }

    var e2 = {
        title: "Hello2",
        start: "2016-03-14",
        end: "2016-03-14",

    }

    var e3 = {
        title: "Hello3",
        start: "2016-03-14",
        end: "2016-03-16",

    }

    var e4 = {
        title: "Hello4",
        start: "2016-03-14",
        end: "2016-03-16",

    }
    var e5 = {
        title: "Hello5",
        start: "2016-03-14",
        end: "2016-03-16",
    }


    var e6 = {
        title: "Hello6",
        start: "2016-03-14",
        end: "2016-03-16",

    }

    var e7 = {
        title: "Hello7",
        start: "2016-03-14",
        end: "2016-03-26",

    }
    var e8 = {
        title: "Hello8",
        start: "2016-02-1",
        end: "2016-03-16",

    }

    var events = [e1, e2, e3, e4, e5, e6, e7, e8]
    return events
}