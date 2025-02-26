// your code goes here....
Array.prototype.listeners = {};

Array.prototype.addListener = function(eventName, callback) {
   if(!this.listeners[eventName]) {
    this.listeners[eventName] = [];
   } else {
    this.listeners[eventName].push(callback);
   }
}

Array.prototype.removeListener = function(eventName, callback) {
  if(this.listeners[eventName]) {
    this.listeners[eventName] = this.listeners.filter(listener => listener !== callback);
  }
}

Array.prototype.triggerEvent = function(eventName, items) {
  if(this.listeners[eventName]) {
    this.listeners[eventName].forEach(listener => listener(eventName, items, this));
  }
}
Array.prototype.popWithEvent = function(eventName, args) {
    this.pop(...args);
    this.triggerEvent(eventName, items);
}
Array.prototype.pushWithEvent = function(eventName, args) {
    this.push(...args);
    this.triggerEvent(eventName, items);
}
const arr = [];


arr.addListener('remove', (eventName, item, array) => {
  console.log(item, ' was removed');
});

arr.pushWithEvent('add', [1, 2, 3, 'a', 'b']);

arr.removeListener('add', onAddAgain); // removes the second listener

arr.pushWithEvent('add', [4, 5]);
arr.popWithEvent('remove');

console.log(arr);

// Output:
// "items were added" // [object Array] (5)
// [1,2,3,"a","b"]

// "items were added again" // [object Array] (5)
// [1,2,3,"a","b"]

// "items were added" // [object Array] (2)
// [4,5]

// 5 " was removed"

// // [object Array] (6)
// [1,2,3,"a","b",4]

