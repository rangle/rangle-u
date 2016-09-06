# React Native Navigation

A Rangle-U Presentation

- ram.bansal@rangle.io
- varun@rangle.io

---

# Outline

- Types of Mobile Navigation
- Stack Based Navigation
  + Exercises
- Navigation Experimental
  + Exercises
- NavigationTransitioner

---

<div class="flex items-center justify-center" style="height: 100%;">
  <h1>Types of Mobile Navigation</h1>
</div>

---

## Hierarchical Navigation

<img src="react-native-navigation/hierarchical-navigation.png"
  style="border: none; width: 315px;" />

> Make one choice per screen until you reach a destination. To go to another destination, you must retrace your steps or start over from the beginning and make different choices. Settings and Mail use this navigation style.

» <a href="https://developer.apple.com/ios/human-interface-guidelines/interaction/navigation">
  human-interface-guidelines/navigation
</a>

» <a href="https://material.google.com/patterns/navigation.html#navigation-hierarchy">
  material/navigation-hierarchy
</a>

---

## Flat Navigation

<img src="react-native-navigation/flat-navigation.png"
  style="border: none; width: 315px;" />

> Switch between multiple content categories. Music and App Store use this navigation style.

» <a href="https://developer.apple.com/ios/human-interface-guidelines/interaction/navigation">
  human-interface-guidelines/navigation
</a>

» <a href="https://material.google.com/patterns/navigation.html#navigation-hierarchy">
  material/navigation-hierarchy
</a>

---

## Experience-driven Navigation

<img src="react-native-navigation/experience-driven-navigation.png"
  style="border: none; width: 315px;" />

> Move freely through content, or the content itself defines the navigation. Games, books, and other immersive apps generally use this navigation style.

» <a href="https://developer.apple.com/ios/human-interface-guidelines/interaction/navigation">
  human-interface-guidelines/navigation
</a>

» <a href="https://material.google.com/patterns/navigation.html#navigation-hierarchy">
  material/navigation-hierarchy
</a>

---

## Links

<img src="react-native-navigation/links.png"
  style="border: none; width: 360px;" />

> Links allow users to move quickly between scenes that aren’t navigationally adjacent.

» <a href="https://developer.apple.com/ios/human-interface-guidelines/interaction/navigation">
  human-interface-guidelines/navigation
</a>

» <a href="https://material.google.com/patterns/navigation.html#navigation-hierarchy">
  material/navigation-hierarchy
</a>

---

## Navigation Patterns

+ Embedded navigation
+ Tabs
+ Bottom navigation bar
+ Navigation drawer
+ Nested navigation
+ Expanding navigation drawer
+ Cascading navigation drawer (desktop)
+ Gestural

» <a href="https://material.google.com/patterns/navigation.html#navigation-patterns">
  material/navigation-patterns
</a>

---

<div class="flex items-center justify-center" style="height: 100%;">
  <h2>Navigation Patterns ≠ Navigation Types</h2>
</div>

---

# Stack Based Navigation

```
                        _ . - - -- .. _
    ||||            .-'      /```\     `'-_             /|
    ||||           (     /`` \___/ ```\    )           | |
    \__/           |`"-//..__     __..\\-"`|           | |
     ||            |`"||...__`````__...||"`|           | |
     ||            |`"||...__`````__...||"`|           \ |
     ||       _,.--|`"||...__`````__...||"`|--.,_       ||
     ||    .'`     |`"||...__`````__...||"`|     `'.    ||
     ||   '.        `/ |...__`````__...| \         .'   ||
     ||     `'-..__  ``      `````      ``  __..-'`     ||
                   `""---,,,_______,,,---""`
```

<p class="mb4 italic">
  Image from <a href="https://github.com/thejameskyle/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js#L644">itsy-bitsy-data-structures</a>
</p>

- [MDN/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [HTML5 Example](http://html5doctor.com/demos/history/bob)
- [$ionicHistory](http://ionicframework.com/docs/api/service/$ionicHistory)

---

## Navigation State (Stack)
### Initial State

```js
{
  index: 0,                     // starts with first route focused
  routes: [{ key: 'Welcome' }], // starts with only one route
}
```

???

Initial state of the navigation stack. We pre-populate with the default route.

---

## Navigation State (Stack)

<div class="flex">
  <div class="flex-auto">
<pre lang="js"><code class="js hljs javascript remark-code">{
  "index": 4,
  "routes": [
    {
      "key": "Welcome"
    },
    {
      "key": "route-1473354942439"
    },
    {
      "key": "route-1473354943938"
    },
    {
      "key": "route-1473354944908"
    },
    {
      "key": "route-1473354945808"
    }
  ]
}</code></pre>
  </div>
  <div class="flex-auto">
    <img src="react-native-navigation/stack-basic.gif" width="189px" />
  </div>
</div>

???

The state of the stack after pushing 4 states.

---

## Exercise #1

<div class="flex">
  <div class="flex-auto">
    <p>Complete the initial state for a pager style navigator.</p>

<pre lang="js"><code class="js hljs javascript remark-code">{
  index: 0,
  routes: [ ?? ],
}
</code></pre>
  </div>
  <div class="flex-auto">
    <img src="react-native-navigation/pages.gif" width="189px" />
  </div>
</div>

---

## Solution for Exercise #1

```js
{
  index: 0,
  routes: [
    {key: 'Step 1', color: '#ff0000'},
    {key: 'Step 2', color: '#ff7f00'},
    {key: 'Step 3', color: '#ffff00'},
    {key: 'Step 4', color: '#00ff00'},
    {key: 'Step 5', color: '#0000ff'},
    {key: 'Step 6', color: '#4b0082'},
    {key: 'Step 7', color: '#8f00ff'},
  ],
}
```

---

## Exercise #2

<div class="flex">
  <div class="flex-auto">
    <p>Complete the initial state for a tab style navigator.</p>

<pre lang="js"><code class="js hljs javascript remark-code">{
  index: 0,
  routes: [ ?? ],
}
</code></pre>
  </div>
  <div class="flex-auto">
    <img src="react-native-navigation/tabs-header.gif" width="189px" />
  </div>
</div>

---

<h2 class="m0">Solution for Exercise #2</h2>

```js
{
  // The three tabs
  tabs: {
    index: 0,
    routes: [
      {key: 'apple'},
      {key: 'banana'},
      {key: 'orange'},
    ],
  },
  // Scenes for the apple tab.
  apple: {
    index: 0,
    routes: [{ key: 'Apple Home' }],
  },
  // Scenes for the banana tab.
  banana: {
    index: 0,
    routes: [{ key: 'Banana Home' }],
  },
  // Scenes for the orange tab.
  orange: {
    index: 0,
    routes: [{ key: 'Orange Home' }],
  },
}
```

???

Has one `NavigationCardStack` but with 4 stacks in the state: tab container & 3 tabs. We use `jumpTo` to go between the tabs so, no transition animation. And `push`/`pop` within each tab so there is transition animation.

---

# Navigation Experimental

- NavigationCardStack
- NavigationHeader
- NavigationStateUtils

---

## NavigationCardStack

```
                          +------------+
                        +-|            |
                      +-| |            |
                      | | |            |
                      | | |   Active   |
                      | | |    Scene   |
                      | | |            |
                      +-| |            |
                        +-|            |
                          +------------+
```

<p class="mt4 h3">A controlled navigation view that renders a stack of cards.</p>

```js
{
  index: 0,                     // starts with first route focused
  routes: [{ key: 'Welcome' }], // starts with only one route
}
```

---

## Header Inside the Card/Route

<pre class="inline-block m0 absolute"
  style="top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0);">
    +------------+
  +-|   Header   |
+-| |------------|
| | |            |
| | |  Focused   |
| | |   Card     |
| | |            |
+-| |            |
  +-|            |
    +------------+
<pre>

???

The intention here is to describe how if the header is inside the card then it will transition with the rest of the card.

---

## NavigationHeader

<pre class="inline-block m0 absolute"
  style="top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0);">
    +------------+
    |   Header   |
    +------------+
  +-|            |
+-| |            |
| | |  Focused   |
| | |   Card     |
+-| |            |
  +-|            |
    +------------+
</pre>

???

To have the header be an overlay that remains persistent across multiple cards we use `NavigationHeader`

---

## NavigationCardStack Example

```html
<NavigationCardStack
  key={ 'stack_' + tabKey }
  onNavigateBack={ this._back }
  navigationState={ this.props.navigator }
  renderHeader={ this._renderHeader }
  renderScene={ this._renderScene }
  style={ styles.navigatorCardStack }
/>
```

[» UIExplorer/NavigationExperimental/NavigationCardStack-example](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationCardStack-example.js)

---

## NavigationStateUtils

Utilities to perform atomic operation with navigate state and routes.

```javascript
const navigationState = {
  index: 0,
  routes: [{ key: 'WELCOME' }],
};



// Push a new state/route/scene
const route = { key: 'PROFILE' };
navigationState = NavigationStateUtils.push(navigationState, route);



// Pop out a route from the navigation state
navigationState = NavigationStateUtils.pop(navigationState);
```

- [NavigationStateUtils.js](https://github.com/facebook/react-native/blob/master/Libraries/NavigationExperimental/NavigationStateUtils.js)
- [UIExplorer/NavigationExperimental/NavigationCardStack-example](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationCardStack-example.js#L76)

---

## Exercise #3

```bash
$ git clone git@github.com:rangle/NavigationExperimentalWorkshop.git
$ git checkout base
```

<div class="flex">
  <div class="flex-auto">
    <p>Finish the implementation of:</p>
    <ul>
      <li><code>containers/app.js</code></li>
      <li><code>scene-renderer/index.js</code></li>
      <li><code>reducers/navigator.js</code></li>
      <li><code>containers/home.js</code></li>
      <li><code>containers/profile.js</code></li>
    </ul>

    <p>» <a href="https://facebook.github.io/react-native/docs/navigation.html#navigationexperimental">NavigationExperimental docs</a></p>
  </div>
  <div class="flex-auto">
    <img src="react-native-navigation/end-result.gif" width="185.5px" />
  </div>
</div>

---

## NavigationTransitioner

```html
<NavigationTransitioner
  navigationState={ this.props.navigationState }
  render={ (transitionProps) => this._render(transitionProps) }
  configureTransition={ this._configureTransition } />
```

```js
_configureTransition() {
    const easing: any = Easing.inOut(Easing.ease);
    return {
      duration: 500,
      easing,
    };
  }
```

- [NavigationTransitioner AnimatedView example](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationTransitioner-AnimatedView-example.js)
- [NavigationTransitioner AnimatedView pager example](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationTransitioner-AnimatedView-pager-example.js)

---

## Stretch Goals

- Added a **[`NavigationHeader`](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationCardStack-NavigationHeader-Tabs-example.js)**
- Provide custom easing using **[`NavigationTransitioner`](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/NavigationExperimental/NavigationTransitioner-AnimatedView-example.js)**
