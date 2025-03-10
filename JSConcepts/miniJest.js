function MiniJest() {
    this.tests = [];
    this.currentGroup = '';
    setTimeout(() => this.executeTests(), 0); // Ensure tests register before execution
  }
  
  MiniJest.prototype.describe = function(title, callback) {
    const previousGroup = this.currentGroup; // Store previous group for nested describe blocks
    this.currentGroup = title;
    console.log(`\n${title}`);
    callback();
    this.currentGroup = previousGroup; // Restore previous group
  };
  
  MiniJest.prototype.it = function(title, callback) {
    this.tests.push({ group: this.currentGroup, title, callback });
  };
  
  MiniJest.prototype.test = function(title, callback) {
    this.it(title, callback);
  };
  
  MiniJest.prototype.expect = function(value) {
    return {
      toBe: (expected) => {
        if (value !== expected) {
          throw new Error(`Expected ${value} to be ${expected}`);
        }
      },
      toEqual: (expected) => {
        if (!this.deepEqual(value, expected)) {
          throw new Error(`Expected ${JSON.stringify(value)} to equal ${JSON.stringify(expected)}`);
        }
      },
    };
  };
  
  MiniJest.prototype.deepEqual = function(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  };
  
  MiniJest.prototype.executeTests = function() {
    let passed = 0;
    let failed = 0;
    this.tests.forEach(({ group, title, callback }) => {
      try {
        callback();
        console.log(`  ✅ ${group} - ${title}`);
        passed++;
      } catch (error) {
        console.log(`  ❌ ${group} - ${title}`);
        console.log(`    ${error.message}`);
        failed++;
      }
    });
    console.log(`\nTest Summary: ${this.tests.length} tests, ${passed} passed, ${failed} failed.`);
  };
  
  const miniJest = new MiniJest();
  const describe = miniJest.describe.bind(miniJest);
  const it = miniJest.it.bind(miniJest);
  const test = miniJest.test.bind(miniJest);
  const expect = miniJest.expect.bind(miniJest);
  
  // Example Tests
  describe('MiniJest Framework', () => {
    it('should pass when toBe matches', () => {
      expect(2 + 2).toBe(4);
    });
  
    it('should fail when toBe does not match', () => {
      expect(2 + 2).toBe(5);
    });
  
    it('should pass when toEqual matches for objects', () => {
      expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
    });
  
    it('should fail when toEqual does not match for objects', () => {
      expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 3 });
    });
  });