/**
 * Created by brian on 6/7/16.
 */
import * as eventBus from '../helpers/event-bus';
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
    console.log('touchmove()==>event:', event);
    eventBus.triggerEvent('touch',{event});
}, false);