/**
 * @author thatcher
 */
(function($, $C){
    
    var log,
        Items;
    
    $C.Site = function(options){
        $.extend(true, this, options);
        log = $.logger('MyProject.Controllers.Site');
        Items = $.$('#itemsModel');
    };
    
    $.extend($C.Site.prototype, {
        manage: function(event){
            event.m({ 
                page:    'manage',
                message: 'complete' 
            }).render();
        },
        items: function(event){
            event.m({ message: 'loading items' }).render();
            Items.get({
                success: function(response){
                    event.m({
                        data: response.data,
                        page: 'items',
                        message: 'complete'
                    }).render();
                },
                error: function(){
                    event.m({message: 'error' }).render();
                }
            });
        },
        item: function(event){
            var id = event.params('id');
            event.m({ message: 'loading item'+ id }).render();
            Items.get({
                id: id,
                success: function(response){
                    event.m({
                        data: response.data,
                        page: 'item',
                        message: 'complete'
                    }).render();
                },
                error: function(){
                    event.m({message: 'error' }).render();
                }
            });
        }
    });
    
    
})(jQuery, MyProject.Controllers);


