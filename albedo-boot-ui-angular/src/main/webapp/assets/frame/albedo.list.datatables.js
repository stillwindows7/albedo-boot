
var albedoList = function(){
    var _mapData={};
    var _getData = function (key) {
        return _mapData ? _mapData[key] : null;
    }
    var _setData = function (key, data) {
        _mapData[key] = data;
    }
    var handleInitTable = function($table, $formSearch, options){
        var  $table = $table && $table.length>0 ? $table : $(document).find('.m_datatable'),$formSearch = $formSearch && $formSearch.length>0 ? $formSearch : $(document).find('.search-form');
        options = $.extend(true, {// datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        map: function(raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true,
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            formSearch: $formSearch,
            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100],
                    },
                },
            }
        }, options);
        setTimeout(function() {
            $table.each(function (index, item) {
                var dataTable = $(item).mDatatable(options);
                console.log(dataTable);
                _setData($(item).attr("id"), dataTable);
                $formSearch.find(".search-form-btn").click(function() {
                    _getData($(item).attr("id")).loadFilterGird();
                })
            })

        }, 100)

    }
    var handleConfirmAjax = function ($target) {
        var $target = $target && $target.length>0 || $(document);
        $target.off("click.confirm").on("click.confirm", "a.confirm", function () {
                var el = $(this);
                $(document).off("keydown");
                mApp.confirm({
                    content: el.data("title") || "确认删除？",
                    confirm: function ($modal) {
                        $.ajax({
                            url: el.attr("data-url"),
                            type: el.data("method") || "POST",
                            dataType: "json",
                            timeout: 15000,
                            success: function (re) {
                                albedoForm.alertDialog($modal, re, el);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest);
                                albedoForm.alertDialog($modal, null, el);
                            }
                        });
                    }
                });
            });
        }

    //* END:CORE HANDLERS *//

    return {
        getDataTable: function(tableId){
            return _getData(tableId);
        },
        initTable: function($table, $formBtn, options){
            handleInitTable($table, $formBtn, options)
        },
        confirmAjax: function ($target) {
            handleConfirmAjax($target);
        },
        //main function to initiate the theme
        init: function ($target) {
            handleConfirmAjax($target);
        }
    }
}();
