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

// Irina
Meteor.methods({
    addTodo: function (listId, text) {
        console.log("**** add todo")
        var now = new Date()
        var d = toDate(text, now)
        var dateAsText = d.text
        console.log("To date is", d)

        Todos.insert({
            listId: listId,
            text: text,
            date: d.start,
            dateAsText: d.text,
            createdAt: now
        });

        Lists.update(listId, {$inc: {incompleteCount: 1}});
    },


    checked: function (listId, id, checked) {
        Todos.update(id, {$set: {checked: checked}});
        Lists.update(listId, {$inc: {incompleteCount: checked ? -1 : 1}});
    },

    updateTodo: function (id, text) {
        var todo = Todos.find(id)
        var now = new Date()
        var d = toDate(text, now)  // todo.createdAt


        Todos.update(id, {
            $set: {
                text: text,
                date: d.start,
                dateAsText: d.text,
                modifiedAt: now
            }
        });
    },

    // TODO: don't pass listId from client, get it on server
    removeTodo: function (listId, id) {
        Todos.remove(id);
        if (!this.checked)
            Lists.update(listId, {$inc: {incompleteCount: -1}});
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