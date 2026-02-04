var ListViewModel = function(items) {
    var self = this;
    self.items = ko.observableArray(items);
    self.itemToAdd = ko.observable("");
    self.addItem = function() {
        if (self.itemToAdd() != "") {
            self.items.push(self.itemToAdd());
            self.itemToAdd("");
        }
    };
    self.removeItem = function() {
        var toRemove = this;
        self.items.remove(function(item) {
            return item == toRemove.toString();
        });
    };
};

ko.applyBindings(new ListViewModel([]));
