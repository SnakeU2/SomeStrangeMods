// Some "strange" mods

/**
* Convert snake_case || kebab-case to camelCase
*
* @return {String}
*/
String.prototype.toCamel = function(){

    return this.replace(/([\_\-]\w)/g, function(m){return m[1].toUpperCase();});
    
}

/** 
* Mixin for events trigger 
*/



var Observe = {   
    
    
    /**
    * Attach handler to instanse event
    *
    * @param eventName {String}
    *
    * @param handler {Function}
    *
    * @return {void}
    */     
    'on': function(eventName,handler){

        
        if (!this.eventHandlers) this.eventHandlers = {};
        
        // Create event if not exists
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        // Attach handler to event
        this.eventHandlers[eventName].push(handler);
        
    },

    /**
    * Detach event from instance
    *
    * @param eventName {String}
    *
    * @param handler {Function}
    *
    * @return {void}
    */
    
    'off': function(eventName, handler) {
    
        let handlers = this.eventHandlers && this.eventHandlers[eventName];

        if (!handlers) return;

        for(let i=0; i<handlers.length; i++) {

          if (handlers[i] == handler) {

            handlers.splice(i--, 1);

          }

        }
        
    },

    /**
    * Detach all handlers from instance event
    *
    * @param eventName {String}
    *    
    * @return {void}
    */

    'offAll': function(eventName){

        let handlers = this.eventHandlers[eventName];

        if (!handlers) return;

        this.eventHandlers[eventName] = [];
        
    },

    /**
    * Fire event for all handlers
    *
    * @param eventName {String}
    *    
    * @param 1..n {Mixed}
    *
    * @return {void}
    */
    'trigger': function(eventName) {

        if (!this.eventHandlers || !this.eventHandlers[eventName]) {
        
            return; // No event or no handlers

        }

        // Call handler
        let handlers = this.eventHandlers[eventName];

        for (let i = 0; i < handlers.length; i++) {

            // Call handler with params 1..n
            handlers[i].apply(this, [].slice.call(arguments, 1));

        }
    }

}

/**
* Set mixin to Class
*
* @param obj {Object}
*
* @param mixinName {String}
*
* @return {void}
*/

function setMixin(obj, mixinName)
{
    if (window[mixinName] == 'undefined') return;

    for (let key in window[mixinName]){
        obj.prototype[key] = window[mixinName][key];
    }
    
}
