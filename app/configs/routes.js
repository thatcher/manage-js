/**
 * @author thatcher
 */

(function($){

    if(window["server-side"]){
        //server routes
        $.routes({
            "hijax:server": [{
                id: "#MyProject-rest-routes",
                hijaxMap:
                    [{ urls :"/rest/$",                                         controller:"#restService"},
                     { urls :"/rest/<:domain(\\w+):>/?$",                       controller:"#restService"},
                     { urls :"/rest/<:domain(\\w+):>/<:id(\\w+):>/?$",          controller:"#restService"},
                     { urls :"/manage/dumpdata/?$", controller:"#manageService",    action:'dumpdata'}]    
            },{
                id: "#MyProject-admin-routes",
                hijaxMap:
                    [
                     { urls :"/admin/|:action|/?$",                             controller:"#adminService"},
                     { urls :"/admin/|:action|/|:domain|/?$",                   controller:"#adminService"},
                     { urls :"/admin/|:action|/|:domain|/|:id|/?$",             controller:"#adminService"}] 
            },{
                id:"#MyProject-site-routes",
                hijaxMap:
                    [{ urls :"/jsx/$",                    controller:"#siteService",   action:"manage"},
                     { urls :"/items$",    	              controller:"#siteService",   action:"items"},
                     { urls :"/item/|:id|/?$",            controller:"#siteService",   action:"item"}]
            },{
                id:"#MyProject-proxy-routes",
                hijaxMap:
                    [{ urls :"/sdb/$",                                          controller:"#sdbProxyService"}]
            }]   
        });
    }else{
        //client routes
       $.routes({
            "hijax:a":[{
                id:'hash-routes',
                filter:'[href^=#]',
                hijaxMap:
                    [{ urls :"manage/?$",           controller:"#siteController",     action:'manage'},
                     { urls :"items/?$",            controller:"#siteController",     action:'items'},
                     { urls :"item/|:id|/?$",       controller:"#siteController",     action:'item'},
                     { urls :"manage/help/?$",      controller:"#manageController",   action:'help'},
                     { urls :"manage/load/?$",      controller:"#manageController",   action:'load'},
                     { urls :"manage/reset/?$",     controller:"#manageController",   action:'reset'},
                     { urls :"manage/syncdb/?$",    controller:"#manageController",   action:'syncdb'},
                     { urls :"manage/dumpdata/?$",  controller:"#manageController",   action:'dumpdata'}]
            }],
            "hijax:form":[{
                id:'submit-routes',
                hijaxMap:
                    [{ urls :"/edit/<:model(\\w+):>/<:id(.*):>/?$",   controller:"#manageController",   action:'edit'}]
            }]
        });
    }
    
})(jQuery);
