/**
 * @author thatcher
 */
(function($,  $S){
    
    var log,
        Items;
    
    $S.Site = function(options){
        log = $.logger('MyProject.Services.Site');
        Items = $.$('#itemsModel');
        $.extend(true, this, options);
    };
    
    $.extend($S.Site.prototype,{
        
        items: function(event){
            log.debug('Serving items page.');
            Items.all(function(results){
                event.
                    m({
                        items:   results,
                        template:  'html/items.html'
                    }).
                    render();
            });
        },
        
        item: function(event){
            var id = event.params('id');
                
            log.debug('Serving item %s page.', id);
                
            Items.forId(id, function(result){
                event.
                    m({
                        id:         id,
                        item:       result,
                        template:   'html/item.html'
                    }).
                    render();
            });
        }
        
    });
    
})(jQuery, MyProject.Services );
