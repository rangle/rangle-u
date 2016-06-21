# TypeScript 101

A Rangle-U Presentation

seth@rangle.io

---

# What is TypeScript?

* A superset of ES6
* Adds static typing to the language
* Catches a lot of errors at build time
* Made by Microsoft (https://www.typescriptlang.org/)
* Opt-in typing

---

# Opt-In Typing

This is valid TypeScript (also valid ES6 and valid ES5):

```javascript
function sum(a, b) {
  return a + b;
}
```

It has some issues:

```javascript
sum(1, '2'); // Valid syntax, probably not the right result.
```

* Normally this unexpected behaviour happens at runtime.
* Would be better to catch it at build-time.

---

# Opt-In Typing

This is also valid TypeScript (but not ES6):

```TypeScript
function sum(a: number, b: number): number {
  return a + b;
}
```

This is better:

```TypeScript
sum(1, '2'); // Blows up at build time:
```

```sh
⨯ Unable to compile TypeScript
sum.ts (3,8): Argument of type 'string' is not assignable to
parameter of type 'number'. (2345)
```
* We can catch (some of) our dumb typos _before_ they blow up in a demo

---

# Type Inference

Typescript will figure out some types in your code, even if you don't put
`: number` anywhere:

```TypeScript
let foo = 3; // TypeScript knows that 'foo' is a number.

foo = 'hello';
```

Nope:

```sh
⨯ Unable to compile TypeScript
foo.ts (2,1): Type 'string' is not assignable to type
'number'. (2322)
```

---

# Type Inference

It works for function return values, too.

```TypeScript
// TypeScript infers that this function returns a string:
function foo() {
  return 'foo';
}

let bar = 1;

bar = foo();
```

Nope:

```sh
⨯ Unable to compile TypeScript
[eval].ts (3,1): Type 'string' is not assignable to
type 'number'. (2322)
```

---

# What Types Can I Use?

TypeScript has a few built-in types:

```TypeScript
let a: number;
let b: string;
let c: Object;
let d: Function;
let e: boolean;
let f: any;
```

You can also make arrays, tuples, enums, and unions:

```TypeScript
let g: number[];
let h: [ string, number ];            // Tuple
let i: enum Color {Red, Green, Blue}; // Enum
let j: number | string;               // Union
```

---

# Function Tricks

Here are few more things you can do:

```TypeScript
// Optional params:
function optionals(arg1?: number) {
  return arg1;
}

// Explicit no return value:
function noReturnValue(): void {
  // I do nothing
}

// Variable arity
function sumAll(...args: number[]): number {
  return args.reduce((sum, n) => sum + n);
}

// Rest-arg destructuring:
function fancy(firstThing: string, ...otherStuff: number[]) {}
```

---

# What Types Can I Use?

Or you can define more complex, 'structural types':

```TypeScript
interface IFoo {
  aNumberField: number;
  aStringField: string;
}

// OK
const foo: IFoo = {
  aNumberField: 3,
  aStringField: 'three',
};

// Nope:
const bar: IFoo = {
  name: 'I am definitely not an IFoo'
};
```

---

# Structural Typing

Typescript uses structural typing, A.K.A. 'shape typing' or 'Duck Typing':

> In other words, don't check whether it IS-a
> duck: check whether it QUACKS-like-a duck,
> WALKS-like-a duck, etc.
>
> -- Alex Martelli

---

# Fancy Types

Interfaces can be extended:

```TypeScript
interface IBar extends IFoo {
  somethingElse: boolean;
}

const bar: IBar = {
  aNumberField: 3,
  aStringField: 'three',
  somethingElse: true,
};
```

And you can have optional fields:

```TypeScript
interface IQuux {
  myOptionalField?: string;
}
```

---

# Fancy Function Types

You can also define function types, via an interface:

```TypeScript
interface IMyFunction {
  (arg1: number, arg2: string): Object;
}
```

Or inline:

```TypeScript
let fn: (aNumber: number, aString: string) => Object;
```

Either way:

```TypeScript
// Good:
fn = (aNumber: number, aString: string) => {
  return {};
}

// Bad:
fn = (a) => 3;
```

---

# Generics

Typescript also supports generics:

```Typescript
function identity<T>(arg: T): T {
  return arg;
}

function identity<T extends IFoo>(arg: T): T {
  return arg;
}
```

---

# Classes

Typescript includes some special stuff for classes:

Implied interface types for your classes:

```Typescript
// This will give you an ES6 constructor function, new Class().
// But Typescript will also give you an implicit interface, Class.
class Foo {
  member1: boolean,
  member2: string,
}
```

Private access modifiers:

```typescript
class Foo {
  private member1: boolean,
}

const myFoo: Foo = new Foo();
// Error at build time (the generated code will
// still allow it though)
myFoo.member1 = 3;
```

---

# Classes

Unlike ES6, TypesScript requires that we explicitly declare class members:

```Typescript
class Foo {
  constructor(member1: boolean) {
    this.member1 = member1; // Error.
  }
}
```

But to ease the pain, it gives us a convenient shorthand syntax:

```Typescript
class Foo {
  constructor(
    private member1: boolean,
    public member2: string) {}
}
```

---

# Cool, How do I Use It?

Typescript is a transpiler, similar in concept to Babel.

You can use it from the command line:

```sh
npm install typescript
tsc inputFile.ts
```

Or you can use it as a webpack loader (see our
[starter projects](https://github.com/rangle/rangle-starter) for examples).

Or for quick-dirty experiments there's a REPL:

```sh
npm install ts-node
```

---

# TSC Settings

TypeScript tools have a number of config options that they get from a
`.tsconfig.json` file in [your project](https://github.com/rangle/angular2-starter/blob/master/tsconfig.json)

The control things like:
* output format: ES5 or ES6
* module type: (CJS, SystemJS, AMD, etc.)
* experimental features like decorators
* etc.

---

# 3rd-Party Libraries

So having types in my code is all fine and dandy, but what about other people's
code?

TypeScript introduces the concept of 'type definition files', or 'typings'.

* Some libraries (ImmutableJS, Ng2-Redux) include their typings in '.d.ts' files.
* The community has stepped up and written type-definition files for other
popular libs.

These typings are managed by the `typings` tool:

```sh
npm install typings
typings install --save --global ~dt:moment
```

It manages these in a file called 'typings.json' in your project. Once they
there, VS Code will now how to intellisense your code, and `tsc` will be able
to check your usage of the libs.

Unfortunately TypeScript changes the meaning of `import` such that it gives you
an error if a lib has no typings.

In extreme cases (no community typings), you'll have to work around this by
dropping back to `require()`.
* This only works if you're in a CJS environment like NodeJS or Webpack.

---

# Resources

If you want to play around with TS, the easiest thing is to mess around with
our starter projects, which have the toolchain already set up for you:

* [Angular 2 with TypeScript](https://github.com/rangle/angular2-starter)
* [Angular 2 with TypeScript and Redux](https://github.com/rangle/angular2-redux-starter)
* [React with TypeScript and Redux](https://github.com/rangle/typescript-react-redux-starter)
* [Angular 1 with TypeScript and Redux](https://github.com/rangle/angular-redux-starter)

And don't forget the official TypeScript docs:

* [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
