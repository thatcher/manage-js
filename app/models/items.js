/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
(function($, $M){ 
    
    var log, _;
    
    $M.Items = function(options){
        log = $.logger('MyProject.Models.Items');
        _   = jsPath||$;
        $.extend(true, this, options, $.model('items', {
            $id:{
                msg:'Unique identifier for this item.',
                pattern:/[^\s]{1,256}$/,
                not:[null]
            },
            image:{
                msg:'Absolute uri for an image representation of the item.',
                pattern:/^.{1,1024}$/,
                not:[null]
            },
            title:{
                msg:'The title of this item.',
                pattern:/^.{1,1024}$/,
                not:[null],
            },
            description:{
                msg:'describes the release. any valid string, but cannot be \
                    empty or null, upto 1024 characters',
                pattern:/^.*$/,
                not:[null]
            },
            resources:{
                msg:'A list of uris representing the geographic resource \
                    associated with this item.',
                pattern:/^.{1,1024}$/
            },
            collections:{
                msg:'This item may belong to any number of collections',
                pattern:/^.{1,1024}$/
            },
            tags:{
                msg:'A list of words or several words very briefly summarizing\
                    this item.',
                pattern:/^.{1,64}$/
            },
            notes:{
                msg:'Notes added over time describing changes or new info \
                    about this item.',
                pattern:/^.{1,512}$/
            },
            deleted:{
                msg:'timestamp when record was removed or null for an active\
                    record',
                pattern:/^[0-9]{32}$/
            }
        }));
    };
    
    $.extend( $M.Items.prototype, {
        all:function(callback){
            var _this = this;
            this.find({
                async:false,
                select:"new Query('items')",//.addFilter('deleted', $EQUAL, '')",
                success:function(results){
                    log.debug('loaded all %s items', results.data.length );
                    callback(results.data);
                },
                error: function(xhr, status, e){
                    log.error('failed to load all items %s.', e);
                }
            });
        },
        forCollection:function(id, callback){
            this.find({
                async:false,
                select:"new Query('items').addFilter('collections', $EQUAL, '"+id+"')",
                success:function(results){
                    log.debug('Found %s collection for item %s', results.data.length, id);
                    callback(results.data);
                },
                error: function(xhr, status, e){
                    log.error('failed to load all collections for item %s.', e);
                }
            });
        },
        forId: function(id, callback){
            var _this = this;
            this.get({
                async: false,
                id:id,
                success: function(results){
                    if(results.data.length){
                        callback(results.data[0]);
                    }else{
                        callback(_this.template(id));
                    }
                },
                error:function(xhr, status, e){
                    log.error('failed to find item for id %s', id);
                }
            });
        },
        template: function(options){
            log.debug('generating template item');
            return $.extend({
                $id:'item_'+$.uuid(),
                deleted:'',
                image:'http://MyProject.org/images/'+_.words(1,false),
                title:_.titled(3, false),
                description:_.paragraphs(2, false),
                resources:[
                    'http://MyProject.org/resources/'+_.words(1,false),
                    'http://MyProject.org/resources/'+_.words(1,false)
                ],
                collections:[
                    'http://MyProject.org/collection/'+_.words(1,false),
                    'http://MyProject.org/collection/'+_.words(1,false)
                ],
                tags:_.words(20, false).split(' '),
                notes:[
                    _.sentence(false),
                    _.sentence(false),
                    _.sentence(false)
                ]
            },  options);
        },
        saveForm: function(options){
            var form = options.form,
                item = {
                    $id: options.id,
                    deleted: form.item_deleted.value,
                    image: form.item_image.value,
                    title: form.item_title.value,
                    description: form.item_description.value,
                    resources: form.item_resources.value.split('\n'),
                    collections: form.item_collections.value.split('\n'),
                    tags: form.item_tags.value.split(', '),
                    notes: form.item_notes.value.split('||\n')
                };
            this.save({
                id:item.$id,
                data:item,
                success: options.success,
                error: options.error
            });
        }
    });
    
    
})(jQuery, MyProject.Models);
 