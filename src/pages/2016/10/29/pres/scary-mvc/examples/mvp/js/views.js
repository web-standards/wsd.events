function ListView(data) {
    var html;

    function init(initialData) {
        html = $("<div>" +
            "<h1>Awesome MVP task list</h1>" +
            "<fieldset><legend>Don't forget!</legend>" +
            "<ul id='tasklist'></ul>" +
            "</fieldset>" +
            "<h2>Add a new task:</h2>" +
            "What do you need to do? <input id='taskinput' placeholder='I need to do'/> <input id='submittask' type='submit' value='Add'/>" +
            "</div>");

        updateView(initialData);
    }

    function updateView(data) {
        var items = "";
        $.each(data, function(id, name) {
            items = items + getHtmlForTask(id, name);
        });
        html.find('#tasklist').html($(items));
    }

    function getHtmlForTask(id, name) {
        return "<li><input id='" + id + "' type='checkbox'/><label for='" + id + "'>" + name + "</label></li>"
    }

    var public = {
        getHtml: function() {
            return html;
        },
        addCreateTaskHandler: function(handler) {
            html.find("#submittask").click(function() {
                var newTaskTitle = html.find("#taskinput").val();
                html.find("#taskinput").val("");
                handler(newTaskTitle);
            });
        },
        addCheckedHandler: function(handler) {
            html.on('click', 'input', function() {
                handler($(this).attr('id'));
            });
        },
        updateView: updateView
    };

    init(data);
    return public;
}
