/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
(function($, $V){
    
    var log,
        template,
        dumpFrame;
    
    $V.Manage = function(options){
        $.extend(true, this, options);
        log = $.logger('MyProject.Views.Manage');
    };
    
    $.extend($V.Manage.prototype, {
        update: function(model){
            var _this = this;
            log.debug("updating manage console");
            $('#status .message').text(model.message);
            
            if('complete' == model.message){
                setTimeout(function(){
                    $('#status').fadeOut();
                },250);
            }else{
                $('#status').fadeIn();
            }
            
            if( 'dumpdata' == model.message || 
                'syncdb' == model.message ||
                'reset' == model.message ||
                'load' == model.message ||
                'help' == model.message ){
                dumpFrame = dumpFrame||$('#dump')[0].contentDocument;
                $('#dump').parent().hide();
            }
            
            if('help' == model.message && dumpFrame){
                log.info('\n\n%s\n\n',model.help.join('\n'));
                dumpFrame.open();
                dumpFrame.write(model.help.join('<br/>'));
                dumpFrame.close();
                $(dumpFrame.body).css({
                    color: '#FFF',
                    backgroundColor:'#000',
                    fontSize:'12px'
                })
                $('#dump').parent().show();
            }
            
            if('dump' == model.message){
                dumpFrame = dumpFrame||$('#dump')[0].contentDocument;
                if(0 == model.index){
                    dumpFrame.open();
                    dumpFrame.writeln('\n[\n');
                }
                dumpFrame.writeln(
                    jsPath.js2json(model.data, null, '\t')
                );
                if((model.index + 1) == model.total){
                    dumpFrame.writeln('\n]\n');
                    dumpFrame.close();
                    $(dumpFrame.body).css({
                        color: '#FFF',
                        backgroundColor:'#000',
                        fontSize:'12px'
                    });
                    $('#dump').parent().show();
                }else{
                    dumpFrame.writeln(',\n');
                }
            }
        },
        render: function(model){
            log.debug('rendering manage view');
        }
    });
    
})(jQuery, MyProject.Views);
