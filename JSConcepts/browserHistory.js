const BrowserHistory = function(){
  this.history = [];
  this.index = -1;

  this.visit = function(url) {
    this.history[++this.index] = url;
  }

  this.current = function() {
    return this.history[this.index];
  } 
  this.backward = function() {
    this.index = Math.max(0, this.index-1);
  } 
  this.forward = function() {
    this.index = Math.max(this.index+1, this.history.length-1);
  }
}

const bh = new BrowserHistory();

bh.visit('A');
console.log(bh.current());

bh.visit('B');
console.log(bh.current());

bh.visit('C');
console.log(bh.current());

bh.backward();
console.log(bh.current());

bh.visit('D');
console.log(bh.current());

bh.backward();
console.log(bh.current());

bh.forward();
console.log(bh.current());

// Output:
// "A"
// "B"
// "C"
// "B"
// "D"
// "B"
// "D"