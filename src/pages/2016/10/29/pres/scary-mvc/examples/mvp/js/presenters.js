function ListPresenter() {
    var view;
    var model;

    function init() {
        model = new TasksModel();
        view = new ListView(model.get());

        view.addCreateTaskHandler(function(taskTitle) {
            model.add(taskTitle);
        });
        view.addCheckedHandler(function(id) {
            model.delete(id);
        });

        customEvents.registerEvent('TimeToUpdateList');
        customEvents.addEventListener('TimeToUpdateList', function() {
            view.updateView(model.get());
        });
    }

    var public = {
        getView: function() {
            return view;
        }
    };

    init();
    return public;
}
