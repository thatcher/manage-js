/**
 *
 * Copyright (c) 2008-2009 ClaypoolJS
 *
 */
(function($, _){

    var log,
        out;
    
    $.filters([{
        id        : "#requestResponseParamFilter",
        target    : "MyProject.Services.*",
        before    : "([a-z]*)",
        advice    : function(event){
            log = log||$.logger('MyProject.Filters');
            log.debug('Adding normalized event state to event scoped model');
            var params = event.params('parameters');
            event.m({admin:('admin' in params)?true:false}).
                m(params);
        }
    },{
        id        : "#viewSystemOutFilter",
        target    : "MyProject.Views.*",
        around    : "(update)",
        advice    : function(invocation){
            out = out||$.logger('MyProject.Commands');
            out.debug('Intercepted call to render');
            var model = invocation.arguments[0];
            if(model.message)
                out.info(model.message);
            return invocation.proceed();
        }
    },{
        id        : "#contentNegotiationFilter",
        target    : "MyProject.Views.*",
        around    : "(render)",
        advice    : function(invocation){
            log = log||$.logger('MyProject.Filters');
            log.debug('Intercepted call to render');
            var model = invocation.arguments[0],
                view = invocation.object;
            if(model.fo == 'json'){
                model.headers['Content-Type']='text/javascript';
                return view.write(_.json(model, null, '\t'));
                //do not proceed
            }else if(model.fo == 'xml'){
                model.headers['Content-Type']='application/xml';
                return view.write(_.x({x:model}));
                //do not proceed
            }else{
                if('template' in model)
                    model.template += '?'+new Date().getTime();
                return invocation.proceed();
            }
        }
    }]);

})(jQuery, jsPath);
    
