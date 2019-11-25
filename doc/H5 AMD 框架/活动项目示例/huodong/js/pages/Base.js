define(function(require) {

    var  viewContainer = null;
    function getViewContainer() {
        return viewContainer ? viewContainer : viewContainer = $('.view-container')[0];
    }
    return {
        getViewContainer: getViewContainer
    }
});