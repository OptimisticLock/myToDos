Meteor.publish('publicLists', function () {
    return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function () {
    if (this.userId) {
        return Lists.find({userId: this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish('todos', function (listId) {
    check(listId, String);

    return Todos.find();
    //  return Todos.find({listId: listId});
});

//-------------------------------------------
function parseDate(text, refDate) {
    var d = toDate(text, refDate)
    console.log("To date is", d)
    var date = d ? d.start.date() : null
    var dateAsText = d ? d.text : null
    return {date, dateAsText }
}

// Irina
//---------------------------------------------------
Meteor.methods({
    addTodo: function (listId, text) {
        var now = new Date()
        var {date, dateAsText} = parseDate(text, now)
        var todo = {listId, text, date, dateAsText, createdAt: now}
        Todos.insert(todo);
        Lists.update(listId, {$inc: {incompleteCount: 1}});
    },


    updateTodo: function (id, text) {
        var todo = Todos.find(id)
        var now = new Date()
        var {date, dateAsText} = parseDate(text, todo.createdAt)

        Todos.update(id, {
            $set: {text, date, dateAsText, modifiedAt: now}
        });
    },

    // TODO: don't pass listId from client, get it on server
    removeTodo: function (listId, id) {
        Todos.remove(id);
        if (!this.checked)
            Lists.update(listId, {$inc: {incompleteCount: -1}});
    },

    checked: function (listId, id, checked) {
        Todos.update(id, {$set: {checked: checked}});
        Lists.update(listId, {$inc: {incompleteCount: checked ? -1 : 1}});
    },

    removeList: function (listId) {
        Todos.find({listId: listId}).forEach(function (todo) {
            Todos.remove(todo._id);
        });
        Lists.remove(listId);
    },

    togglePrivacy: function (listId) {

    }


})