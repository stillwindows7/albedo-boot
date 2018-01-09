(function ($) {
    $(document).ajaxSend(function (event, jqxhr, settings) {
        // $.blockUI({
        //     animate: true,
        //     overlayColor: 'none'
        // });
        mApp.blockPage({
            overlayColor: '#000000',
            state: 'primary'
        });
        var token = 'Bearer' + albedo.getToken();
        settings.header = {"Authorization": token};
        jqxhr.setRequestHeader("Authorization", token);
    });
    $(document).ajaxComplete(function (event, xhr, settings) {
        mApp.unblockPage();
    });
    $(document).ajaxError(function (event, xhr, settings) {
        mApp.unblockPage();
        try {
            toastr && toastr.error('网络异常，请检查您的网络连接！', {closeButton: true, positionClass: 'toast-bottom-right'})
        } catch (e) {
        }
    });
})(jQuery);
