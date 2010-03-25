/**
 * @author thatcher
 */
window['server-side'] = true;

//debugger;
(function($){
        
    var log = $.logger('MyProject');
    
    $(document).ready(function(){

        try{
            //select an environment
            $.env('defaults', "dev.server"); 
            //$.env('defaults', "appengine.server");
            $.boot()
        }catch(e){
            log.error("Environmental selection is invalid!").exception(e);
        }finally{
            //other initialization code like event listeners not associated
            //with routers
            //TODO:
        }
            
    });

})(jQuery);