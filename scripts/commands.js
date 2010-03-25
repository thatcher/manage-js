/**
 * @author thatcher
 */

(function($){
    var log;
    MyProject.Commands = {
        help: function(){
            log = log || $.logger('MyProject.Commands');
            var help = $('#_help');
            log.debug('clicking help %s %s', help);
            help.click();
            log.debug('clicked help %s', help);
        },
        load: function(){
            $('#_load').click();
        },
        reset: function(){
            $('#_reset').click();
        },
        syncdb: function(){
            $('#_syncdb').click();
        },
        dumpdata: function(outfile){
            var dumpurl = $('#_dumpdata').attr('href');
            log = log || $.logger('MyProject.Commands');
            log.info('dumping data from %s', dumpurl);
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: dumpurl,
                success: function(text){
                    log.debug('successfully loaded %s', dumpurl);
                    try{
                        if(outfile)
                            Envjs.writeToFile(text, outfile);
                        else
                            log.info('\n %s \n', text);
                    }catch(e){
                        log.error('failed to write to file %s', outfile).
                            exception(e);
                    }
                },
                error: function(xhr, status, e){
                    log.error('failed to dumpdata %s', status).
                        exception(e);
                    log.debug('response %s', xhr.responseText);
                }
            })
        }
    };
})(jQuery);