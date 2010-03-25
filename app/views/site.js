/**
 * @author thatcher
 */
(function($, $V){
    
    var log,
        itemsTemplate,
        itemTemplate;
    
    $V.Site = function(options){
        $.extend(true, this, options);
        log = $.logger('MyProject.Views.Site');
    };
    
    $.extend($V.Site.prototype, {
        render: function(model){
            this.write(document.innerHTML);
        },
        update: function(model){
            $('#status .message').text(model.message);
            
            if('complete' == model.message){
                setTimeout(function(){
                    $('#status').fadeOut();
                },250);
            }else{
                $('#status').fadeIn();
            }
            $('#main > div').hide();
            switch(model.page){
                case 'items':
                    render_items(this, model.data);
                    break;
                case 'item':
                    render_item(this, model.data[0]);
                    break;
            }
            $('#'+model.page).show();
        }
    });
    
    function render_items(page, data){
        var i,
            columns = $('#items > div > ul'),
            item;
        itemsTemplate = itemsTemplate||$('#items_template').remove();
        itemsTemplate.id = '';
        $(columns).each(function(){
            $(this).html('');
        });
        for(i=0;i<data.length;i++){
            item = $(itemsTemplate).clone();
            $('a', item).text(data[i]).
                attr('href', '#item/'+data[i]);
            $(columns[i%4]).append(item);
        }
    };
    
    function render_item(page, data){
        itemTemplate = itemTemplate||$('#item_template').remove();
        var form = $(itemTemplate).clone(),
            item = data;
        
        $(form).attr('action', '/edit/items/'+item.$id);
        form.id = '/edit/items/'+item.$id;
        $('#item_id', form).text(item.$id);
        $('#item_image', form).attr('value', item.image);
        $('#item_title', form).attr('value', item.title);
        $('#item_deleted', form).attr('value', item.deleted);
        $('#item_description', form).attr('value',item.description);
        $('#item_resources', form).attr('value',item.resources.join('\n'));
        $('#item_collections', form).attr('value',item.collections.join('\n'));
        $('#item_tags', form).attr('value',item.tags.join(', '));
        $('#item_notes', form).attr('value',item.notes.join('||\n'));
        $('#item > div').empty().append(form);
        $('#item').show();
    };
    
})(jQuery, MyProject.Views);
