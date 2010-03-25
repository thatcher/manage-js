/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
//debugger;
(function($){
        
    var log = $.logger('MyProject');
    
    $(document).ready(function(){

        try{
            //select an environment
            $.env('defaults', "dev.client"); 
            //$.env('defaults', "appengine.server");
            $.boot(function(){
                if(window.location.hash == "#"){
                    $('#manage').click();
                }
                log.debug('commandline args %s', $.args);
                if($.args.length){
                    try{
                        setTimeout(function(){
                            log.debug('executing %s', $.args[0]);
                            var f = $.resolve('MyProject.Commands')[$.args.shift()];
                            log.debug('applying to %s with arguments %s', f, $.args);
                            f.apply(this, $.args);
                         },20);
                    }catch(e){
                        log.error('command failed %s', $.args.join(' '));
                    }   
                }
            });
            
            
        }catch(e){
            log.error("Environmental selection is invalid!").exception(e);
        }finally{
            //other initialization code like event listeners not associated
            //with routers
            //TODO:
        }
            
    });

})(jQuery);