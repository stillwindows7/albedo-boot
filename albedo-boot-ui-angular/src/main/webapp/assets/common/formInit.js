//== Class definition

var BootstrapSelect = function () {

    //== Private functions
    var selects = function () {
        // minimum setup
        $('.m_selectpicker').selectpicker();
    }

    return {
        // public functions
        init: function() {
            selects();
        }
    };
}();

jQuery(document).ready(function() {
    BootstrapSelect.init();
});
