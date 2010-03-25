/**
 * @author thatcher
 */
(function($,  $S){
    
    var log,
        Items;
    
    $S.Manage = function(options){
        log = $.logger('MyProject.Services.Manage');
        Items = $.$('#itemsModel');
        $.extend(true, this, options);
    };
    
    $.extend($S.Manage.prototype,{
        
        dumpdata: function(event){
            event.response.body = '';
            log.debug('dumpdata.');
            var dump = [];
            Items.get({
                async:false,
                success: function(results){
                    var data = results.data,
                        length = data.length,
                        i = 1;
                    
                    log.debug('loading %s items from db', length);
                    if(i < length){
                        dumpItem();
                    }
                    
                    function dumpItem(){
                        Items.get({
                            async:false,
                            id: data[i]+'',
                            success: function(results){
                                if(i == 1){
                                    event.writeln('[\n');
                                }
                                log.debug('writing to response for %s', data[i]);
                                event.writeln(jsPath.js2json(results.data[0], null, '\t')+'\n');
                                i++;
                                if(i<length){
                                    event.writeln(',\n');
                                    try{
                                        dumpItem();
                                    }catch(e){
                                        log.exception(e);
                                    }
                                }else{
                                    event.writeln('\n]');
                                    event.response.headers =  {
                                        status:   200,
                                        'Content-Type':'application/json'
                                    };
                                }
                            },
                            error: function(xhr, status, e){
                                log.error('failed to dump item %s', data[i]).
                                    exception(e);
                                i++;
                                dumpItem();
                            }
                        });
                    };
                    
                },
                error: function(xhr, status, e){
                     log.error('failed to load items').
                        exception(e);
                }
            });
        }
        
    });
    
})(jQuery, MyProject.Services );
