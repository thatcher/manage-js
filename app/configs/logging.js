/**
 * @author thatcher
 */

(function($){ 
    
   $.logging([
        { category:"MyProject",                    level:"INFO" },
        { category:"MyProject.Filters",            level:"INFO" },
        { category:"MyProject.Models",             level:"INFO" },
        { category:"MyProject.Views",              level:"INFO"  },
        { category:"MyProject.Controllers",        level:"INFO"  },
        { category:"MyProject.Services",           level:"INFO" },
        { category:"Claypool.Router",              level:"INFO"  },
        { category:"Claypool.MVC",                 level:"WARN"  },
        { category:"Claypool.Server",              level:"INFO"  },
        { category:"Claypool.Models",              level:"INFO" },
        { category:"Claypool",                     level:"ERROR"  },
        { category:"Manage",                       level:"INFO"  },
        { category:"jQuery.plugins.gdb",           level:"INFO" },
        { category:"jQuery.E4X",                   level:"INFO"  },
        { category:"jQuery",                       level:"INFO"  },
        { category:"root",                         level:"NONE"  }
    ]);     
	
})(jQuery);