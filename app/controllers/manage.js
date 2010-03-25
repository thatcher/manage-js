/**
 * @author thatcher
 */
(function($, $C){
    
    var log,
        models = [
            'items'
        ],
        total = 100,
        Items,
        itemFormTemplate;
    
    $C.Manage = function(options){
        $.extend(true, this, options);
        log = $.logger('MyProject.Controllers.Manage');
        Items = $.$('#itemsModel');
    };
    $.extend($C.Manage.prototype, {
        edit: function(event){
            var model = event.params('model'),
                id = event.params('id');
            log.debug('captured form submission for %s %s', model, id);
            event.m({ message: 'saving '+model+' : '+id}).render();
            $.$('#'+model+'Model').saveForm({
                id: id,
                form: event.target,
                success: function(){
                    event.m({ message: 'complete'}).render();
                },
                error: function(){
                    event.m({ message: 'error'}).render();
                }
            });
        },
        help: function(event){
            log.debug('handling help');
            event.m({
                message: 'help',
                help: [
                    'help       -- displays this information',
                    'load       -- generates and saves items to database',
                    'reset      -- removes all data from the database',
                    'dumpdata   -- provides a json dump of the current database',
                    'syncdb     -- loads a previous state of the database from /data/inital_data.json'
                ]
            }).render(function(){
                event.m({
                    message: 'complete',
                }).render();
            });
        },
        load: function(event){
            var Items = $.$('#itemsModel'),
                items = [],
                item,
                i=0;
            
            event.m({
                items: items,
                total: total,
                message: 'load',
                current: i
            }).render();
                
            Items.create({});
            parseAndPost();
            
            function parseAndPost(){
                item = Items.template();
                event.m({
                    message: 'loading '+item.$id,
                    current: i
                }).render();
                Items.save({
                    id: item.$id,
                    data: item,
                    success: function(){
                        log.debug('loaded item : %s', item.$id);
                        if(i<total){
                            event.m({
                                message: 'success',
                                current: i
                            }).render(function(){
                                i++;
                                parseAndPost();
                            });
                        }else{
                            event.m({
                                message: 'complete',
                            }).render();
                        }
                    },
                    error: function(){
                        event.m({
                            message: 'error',
                        }).render();
                    }
                });
            };
        },
        reset: function(event){
            //drops domains (tables) for each model
            //should probably use a dialog to double check...
            event.m({
                message: 'reset'
            }).render();
            
            Items.destroy({});
            
            event.m({
                message: 'complete'
            }).render();
        },
        dumpdata: function(event){
            event.m({
                message: 'dumpdata'
            }).render();
            
            Items.get({
                success: function(results){
                    var data = results.data,
                        length = data.length,
                        i = 0;
                    
                    if(i < length){
                        dumpItem();
                    }
                    
                    function dumpItem(){
                        event.m({
                            message: 'dumping item '+data[i]
                        }).render();
                        Items.get({
                            id: data[i],
                            success: function(results){
                                if(i<length){
                                    event.m({
                                        index: i,
                                        message: 'dump',
                                        data: results.data[0],
                                        total: length
                                    }).render(function(){
                                        i++;
                                        dumpItem();
                                    });
                                }else{
                                    event.m({
                                        message: 'complete',
                                    }).render();
                                }
                            },
                            error: function(){
                                event.m({
                                    message: 'error dumping',
                                }).render();
                            }
                        });
                    };
                    
                },
                error: function(){
                    event.m({
                        message: 'error dumping',
                    }).render();
                }
            });
            
            event.m({
                message: 'complete'
            }).render();
        },
        syncdb: function(event){
            
            event.m({
                message: 'syncdb'
            }).render();
            
            $.ajax({
                url:'/data/initial_data.json',
                dataType: 'json',
                type: 'GET',
                success: function(results){
                    Items.save({
                        batch: true,
                        data: results,
                        success: function(){
                            event.m({
                                message: 'synced',
                            }).render(function(){
                                event.m({
                                    message: 'complete',
                                }).render();
                            });
                        },
                        error: function(){
                            event.m({
                                message: 'error syncing',
                            }).render();
                        } 
                    });
                },
                error: function(){
                    event.m({
                        message: 'error syncing',
                    }).render();
                }
            });
            
        }
    });
    
    
})(jQuery, MyProject.Controllers);


