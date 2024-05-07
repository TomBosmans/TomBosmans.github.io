---
title: Understanding JavaScript Generators
date: 2024-05-07
tags: javascript,  iterators,  generators
---

JavaScript generators offer a powerful way to define iterable sequences in a concise and readable manner. To fully grasp generators, it's crucial to understand the underlying concepts of iterators and iterable objects. Let's explore these concepts step by step, building towards the final `times` function.

## Iterators and Iterable Objects

Iterators are objects that provide a way to access elements sequentially. They have a `next()` method that returns the next element in the sequence along with information about whether the iteration has finished. Here's a basic example of an iterator:

```javascript
function createIterator() {
  let count = 0;
  return {
    next() {
      return { value: count++, done: count > 3 };
    }
  };
}

const iterator = createIterator();
console.log(iterator.next()); // Output: { value: 0, done: false }
console.log(iterator.next()); // Output: { value: 1, done: false }
console.log(iterator.next()); // Output: { value: 2, done: false }
console.log(iterator.next()); // Output: { value: undefined, done: true }
```
Iterable objects are objects that implement the Symbol.iterator method, allowing them to be iterated over using constructs like for...of loops. Let's modify our iterator to make it iterable:

```javascript
function createIterable() {
  let count = 0;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { value: count++, done: count > 3 };
        }
      };
    }
  };
}

for (const value of createIterable()) {
  console.log(value);
}
// Output:
// 0
// 1
// 2
```

## Generators
Generators are special functions that can be paused and resumed. They allow you to define an iterative algorithm using the yield keyword, which pauses the function and returns a value to the caller. Here's a simple generator example:

```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorFunction();
console.log(generator.next()); // Output: { value: 1, done: false }
console.log(generator.next()); // Output: { value: 2, done: false }
console.log(generator.next()); // Output: { value: 3, done: false }
console.log(generator.next()); // Output: { value: undefined, done: true }
```

## Building the times Function
Now, let's build the times function step by step, starting with a simpler version and gradually adding functionality:

### Version 1: Basic Generator Function
```javascript
function* times(times) {
  let count = 0;
  while (count < times) {
    yield count++;
  }
}

const generator = times(3);
for (const value of generator) {
  console.log(value);
}
// Output:
// 0
// 1
// 2
```

### Version 2: Adding Step and Start Parameters
```javascript
function* times(times, step = 1, start = 0) {
  let count = start;
  while (count < start + times) {
    yield count;
    count += step;
  }
}

const generator = times(5, 2, 1);
for (const value of generator) {
  console.log(value);
}
// Output:
// 1
// 3
// 5
// 7
// 9
```
### Version 3: Making it an Iterable Object
```javascript
function times(times, { step = 1, start = 0 } = {}) {
  return {
    [Symbol.iterator]: function* () {
      let count = start;
      while (count < start + times * step) {
        yield count;
        count += step;
      }
    }
  };
}

for (const value of times(5, { step: 2, start: 1 })) {
  console.log(value);
}
// Output:
// 1
// 3
// 5
// 7
// 9
```

### Final Version: Using Array.from()
```javascript
function times(times, { step = 1, start = 0 } = {}) {
  return Array.from({
    times,
    step,
    start,
    iteration: start,
    get until() {
      return this.start + this.times * this.step;
    },
    [Symbol.iterator]: function* () {
      while (this.iteration < this.until) {
        yield this.iteration;
        this.iteration += this.step;
      }
    },
  });
}

console.log(times(5, { step: 2, start: 1 }));
// Output: [1, 3, 5, 7, 9]

times(5, { step: 2, start: 1 }).forEach((index) => console.log(index))
// Output:
// 1
// 3
// 5
// 7
// 9
```

## Great sources
Great talk about generators: [The Power of JS Generators by Anjana Vakil](https://www.youtube.com/watch?v=gu3FfmgkwUc)
