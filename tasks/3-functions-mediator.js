'use strict';
 
var mediator = (function () {
    var subscribtions = {};
 
    return {
        trigger: function (eventName, data) {
            if (subscribtions.hasOwnProperty(eventName)) {
                for (var i = 0; i < subscribtions[eventName].length; i += 1) {
                    subscribtions[eventName][i].call(window, data);
                }
            }
        },
		
        subscribe: function (eventName, handler) {
            if (subscribtions.hasOwnProperty(eventName)) {
                subscribtions[eventName].push(handler);
            } else {
                subscribtions[eventName] = [handler];
            }
        },
		
        unsubscribe: function(eventName, handlerReference) {
          if (!subscribtions.hasOwnProperty(eventName)) {
            return;
          }

		  var events = subscribtions[eventName];
		  
          if (handlerReference !== undefined) {
            events = []
          } else {
            var ind = events.indexOf(handlerReference);
            if (ind > 0) {
              events[ind] = events[events.length - 1]
              events.length--;
            }
          }
          
        }
    };
}());
 
 
 
// usage example
mediator.trigger('complete'); // nothing happens
mediator.subscribe('complete', function (completionTime) {
    console.log('Complete subscriber. Fired at' + completionTime);
});
 
mediator.subscribe('complete', function () {
     console.info('Another complete subscriber');
});
 
setTimeout(function () {
    mediator.trigger('complete', new Date()); // both subscribers fired
}, 3000);




var logger = function (data) {
	console.log(data);
};

mediator.subscribe('log', logger);
mediator.trigger('log', 'startLogging'); // console.log message
setTimeout(function () {
	mediator.unsubscribe('log', logger);
	mediator.trigger('log', 'startLogging'); // nothing
}, 999);


