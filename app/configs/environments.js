/**
 * @author thatcher
 */
(function($){
    //dummy aws settings if none provided
    //AWS=AWS||{};
    
	//------------------------------------------------------------------------//
	//  -   ENVIRONMENTAL CONFIGURATION   -
	//________________________________________________________________________//
	$.env({
	    defaults:{
            root:'/',
			templates:'app/templates/',
            data:'http://localhost:8080/data/',
            host:'sdb.amazonaws.com',
            dataType:'text',
            db:'jQuery.gdb',
            dbclient:'direct',
            dbconnection:{'default':{
                /*
                endpoint:'https://sdb.amazonaws.com/',
                accessKeyId:AWS.accessKeyId,
                secretKey:AWS.secretKey,
                method:'POST'
                */
                //raw:true //returns raw aws response
            }}
	    },
	    //--------------------------------------------------------------------//
	    //  -   APPENGINE CONFIGURATION   -
	    //____________________________________________________________________//
	    appengine:{
	        server:{
                root:'/',
	            templates:'http://manage-js.appspot.com/app/templates/',
                //data:'http://tadeusz.appspot.com/app/data/'
	            data:'http://manage-js.s3.amazonaws.com/'
	        }
	    },
	    //--------------------------------------------------------------------//
	    //  -   DEVELOPMENT CONFIGURATION   -
	    //____________________________________________________________________//
	    dev:{
	        server:{
	        },
            client:{
                dbclient:'rest',
                initial_data: 'file:///opt/tomcat/webapps/manage-js/data/initial_data.json'
            }
	    },
	    //--------------------------------------------------------------------//
	    //  -   PRODUCTION CONFIGURATION   -
	    //____________________________________________________________________//
	    prod:{
	        server:{

	        }
	    },
	    //--------------------------------------------------------------------//
	    //  -   TEST CONFIGURATION   -
	    //____________________________________________________________________//
	    test:{
	        server:{

	        }
	    }
	}); 
    
})(jQuery);
    
