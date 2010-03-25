/**
 * MyProject @VERSION - 
 *
 * Copyright (c) 2008-2009 MyProject
 * @author thatcher
 */
var MyProject = {
	Models:{},
	Views:{},
	Controllers:{},
	Services:{}
};

(function($){
 	
    $.scan([
        "MyProject.Models",    
        "MyProject.Views",    
        "MyProject.Controllers",      
        "MyProject.Services",
        "GAE.Services"
    ]);
    
})(jQuery);
    
