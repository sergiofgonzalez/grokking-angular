# Grokking Angular: Setting up shop: Event Handling 
> Concepts on event handling in the browser

---
+ Introducing event handlers: the `window` object
+ Events and DOM nodes
+ The event object
+ Event Propagation
+ Default Actions
+ Key Events
+ Pointer Events: Mouse and Touch events
+ Scroll Events
+ Focus Events
+ Load Events
+ Browser Events and the JavaScript Event Loop: Web Workers
+ Timers
+ Debouncing
---


## Event handling approach in the browser: Event Handlers

Browsers allow you to register functions that will be called when a given situation occurs &mdash; these functions are called handlers.

```html
<p>
  Click this document to activate the handler.
</p>
<script>
  window.addEventListener('click', () => console.log(`You clicked!`));
</script>
```

The `window` object refers to a built-in object that is provided by the browser. Calling `addEventListener('{event}', fn)` method will register the second argument (a function) as a handler for the event identified by the first argument.

## Events and DOM Nodes
Event handlers are registered in a specific context.

```html
<button>click me!</button>
<p>
  No handler registered here!
</p>
<script>
  const button = document.querySelector('button');
  button.addEventListener('click', console.log);
</script>
```

Conversely, using `window.addEventListener` registers the handler for the whole window.

Giving a node a `onclick` attribute has a similar effect, and it works not only for the `'click'` event, but for most types of events using `on{event}={handler code}`. However, using `onclick` will only let you register a single handler, while `addEventListener` will allow you to add more handlers even if there is already a handler for that element.

The `removeEventListener()` method removes a handler:

```html
  <button id="button-once" type="button" class="btn btn-info">Click once!</button>
  <script>
    const buttonOnce = document.querySelector('#button-once');
    const onceHandler = () => {
      console.log(`clicked once! deactivating the handler`);
      buttonOnce.removeEventListener('click', onceHandler);
      buttonOnce.disabled = true;
    };
    buttonOnce.addEventListener('click', onceHandler);
  </script>
```

## Event Objects
The event handler functions are passed an *event* object that holds additional information about the event. 

```html
<button type="button" class="btn btn-primary">click me!</button>
<script>
  const button = document.querySelector('button');
  button.addEventListener('mousedown', event => {
    if (event.button === 0) {
      console.log(`Left button has been clicked!`);
    } else if (event.button === 1) {
      console.log(`Middle button has been clicked!`);
    } else if (event.button === 2) {
      console.log(`Right button has been clicked!`);
    }
  });
</script>
```

The information the object holds changes from event to event. The event's `type` property always holds a string identifying the event (such as `click` or `mousedown`).

## Event Propagation
For most event types, handlers registered on both a child and a parent node will receive an event that happens on the child. That is, the events are said to propagate outward, from the node where it happen to the parent's node, and the parent's parent node, etc. After all handlers have had their turn, the `window` object gets its chance to respond to the event.

At any point, an event handler can call `stopPropagation` to prevent the event to propagate further. This might come in handy, for example, when you have a button inside another clickable area.

The following example registers a `mousedown` event handler for both a button and a paragraph. When the right button is used, the event is propagated from the button to the paragraph, but not when the right button is clicked.

```html
<p id="para">
  A paragraph with a <button type="button" class="btn btn-primary">button</button>.
</p>
<script>
  const para = document.querySelector('#para');
  para.addEventListener('mousedown', event => {
    console.log(`The paragraph has received the ${ event.type } event`);
  })

  const button = document.querySelector('button');
  button.addEventListener('mousedown', event => {
    console.log(`The button has received the ${ event.type } event`);
    if (event.button === 2) {
      event.stopPropagation();
    }
  });
</script>
```

Most event objects have a `target` property that refers to the node where they originated. This can also be used to ensure you're not handling something that propagated up from a node you do not want to handle.

It is also possible to use the `target` property to *cast a wide net* for a specific type of event. For example, if you have a node with a list long of buttons you can register a handler on the node containing all the buttons and use this property to check what button was clicked on.

```html
  <div id="btn-container">
    <button type="button" class="btn btn-primary">Blue</button>
    <button type="button" class="btn btn-secondary">Gray</button>
    <button type="button" class="btn btn-success">Green</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Yellow</button>
    <button type="button" class="btn btn-info">Light blue</button>
    <button type="button" class="btn btn-light">White</button>
    <button type="button" class="btn btn-dark">Dark</button>            
  </div>
  <p>
    You clicked the <span id="btn-clicked">[none yet!]</span> button.
  </p>
  <script>
    const btnClickedSpan = document.querySelector('#btn-clicked');
    const btnContainer = document.querySelector('#btn-container');
    btnContainer.addEventListener('click', evt => {
      if (event.target.nodeName === 'BUTTON') {
        btnClickedSpan.textContent = event.target.textContent;
      }
    });
  </script>
```

## Default Actions
Many events have a *default action* associated with it. If you click a link, you will be taken to the link's target.

For most types of events, custom JavaScript handlers will be called before the *default behavior* takes place. In some cases, you can even call `event.preventDefault` method to disable the *default behavior*.

In most cases, interfering with the default behaviors create a bad user experience, so it is highly discouraged to do so.

## Key Events
This section explores all the details related to key events.

When a key on the keyboard is pressed, the browser fires a `'keydown'` event. When the same key is released, you get a `'keyup'` event.
Despite its name, the `'keydown'` event is fired not only when the key is first pressed, but also when it repeats.

The `keyEvent.key` property on a key event contains information about the key that was pressed. For special keys such as *ENTER*, it holds a string that names the key. When the shift key is pressed, the contents of they `key` property is also updated, so pressing *SHIFT* + v makes the `event.key === 'V'`.

Modifier keys, such as *SHIFT*, *CONTROL* and *ALT* (and *META* on Macs) generate key events just like normal keys. If interested in key combinations, the event provides the properties `keyEvt.shiftKey`, `keyEvt.ctrlKey`, `keyEvt.altKey` and `keyEvt.metaKey` for both keyboard and mouse events.

The DOM nodes where a key event originates depends on the element that has *focus* when the key is pressed. When nothing in particular has focus, `document.body` acts as the target node of key events.

Note that reading key events is considered *low-level*, and you should instead register event handlers for `'input`' events generated on `<input>` and `<textarea>` tags.

## Pointer Events
Mices and touch screens produce different kinds of events.

### Mouse Events
Pressing a mouse button causes the browser to fire `'mousedown'` and `'mouseup'` events on the node immediately below the mouse pointer when the event occurs.

After the `'mouseup'` event, a `'click'` event is fired on the most specific node that contained both the press and the release of the button.

If two clicks happen close together, a `'dblclick'` event is fired after the second click event.

To get precise information about the place where a mouse event happened, you can query the `event.clientX` and `event.clientY` properties that contains the coordinates in pixels relative to the top-left corner of the window, and `event.pageX` and `event.pageY` which are relative to the top-left corner of the whole document.

Every time the mouse pointer moves, a `'mousemove'` event is fired. This can be used to track the position of the mouse (e.g. for mouse dragging aware applications).

The `button` property on a mouse event tells you what is the button that has been pressed:
+ `0` &mdash; left button
+ `1` &mdash; middle button
+ `2` &mdash; right button

The `buttons` property on a mouse event tells you about the buttons that are currently held down:
+ `0` &mdash; no buttons are down
+ otherwise, it contains the sum of the codes for those buttons:
    + `1` &mdash; left button
    + `2` &mdash; right button
    + `4` &mdash; middle button

### Basic notions on Touch Events
Touch events work like an *extension* of mouse events. If you add a `'click'` handler to a button, it will be triggered when used from a touch screen.
But there are specific events fired by touch interaction. When a finger starts touching the screen a '`touchstart'` event is fired. When it is moved while touching a `'touchmove'` is triggered. Finally, when it stops touching the screen a `'touchend'` is fired.

As touch screens can detect multiple fingers at the same time, the touch events have a `touches` property that contain an array-like object of points with each own set of `clientX`, `clientY`, `pageX` and `pageY` properties.

## Scroll Events
A `'scroll'` event is fired every time an element is scrolled.
Note that calling `scrollEvt.preventDefault()` does not prevent the scrolling from happening.

## Focus Events
When an element gains focus, the browser fires a `'focus`' event on it. When it loses focus, the element gets a `'blur'` event.

Unlike the general rule for event propagation, focus events do not propagate &mdash; a handler on a parent element is not notified when a child element gains or loses focus.

The `window` object will receive `'focus'` and `'blur'` events when the user moves from or to the browser tab or window in which the document is shown.

## Load Event
The `'load'` event is fired on the `window` and `document.body` when the page finishes loading.

This is useful to schedule initialization actions that require the whole document to have been built. Otherwise, the browser might find the `<script>` tag too soon and might execute JavaScript before the content is ready.

Elements such as images and script tags also have a `'load'` event that indicate that the files they reference have been properly loaded.

Note that `'load'` events do not propagate to their parent elements.

When a page is closed or navigated away from, a `'beforeunload`' event is fired. This can be used to prevent the user from accidentally losing work by closing a document. Preventing the page from unloading is done by returning a non-null value from the handler. Otherwise, the current document will be unloaded.

```javascript
  addEventListener('beforeunload', event => {
    console.log(`User is navigating away from the page!`);
    event.returnValue = '\o/';
```

Note that `'beforeunload'` handler is not bound to any particular object.

## Browser Events and the JavaScript Event Loop
Browser event handlers behave like other JavaScript asynchronous code &mdash; they can only be executed when there are no other code executed. This means that events can only be processed when the event loop is not tied with any other work.

If your document requires lots of processing that will make the page slow, consider using a *web worker*. A *web worker* is a JavaScript process that runs alongside the main script and can communicate with it using messages.

The protocol to communicate between the main script and the web worker is as follows:
+ The main script invokes `new Worker({web-worker-path})` and registers a handler to receive the results once the worker is done. The event to register is `'message'` and the result will come in the `event.data` property.
That information is sent using the method `postMessage(data)`.

```javascript
const ackermannWorker = new Worker('code/ackermann-worker.js');
ackermannWorker.addEventListener('message', event => {
  const result = event.data;
  console.log(`${ result } (execution took ${ (end - start).toString() } ms)`);
});

ackermannWorker.postMessage({3, 9});
```

+ The web worker is a separate *JavaScript* file that registers a handler for the `'message'` event. The data will be received in the `event.data` property. Once the computation is complete, the return must be sent to the *main* script using `postMessage(data)` method.

```javascript
addEventListener('message', event => {
  const {m, n} = event.data;
  console.log(`Ackermann worker started for m=${ m }, n=${ n }`);
  postMessage(ackermann(m, n));
});

function ackermann(m, n) {
...
}
```

## Timer Events
You can use `setTimeout` function for browser environments too. The function schedules another function to be called later, after the given number of milliseconds.
If you need to cancel the function you have scheduled, you need to store the value returned by `setTimeout` and then call `clearTimeout` on it.

```javascript
const timer = setTimeout(() => console.log(`timer done!`), 500);

if (Math.random() < 0.5) {
  console.log(`Disabling`);
  clearTimeout(timer);
}
```

The function `setInterval` is used to schedule another function to be called repeatedly after the given milliseconds. It can be cancelled in the same way using `cancelInterval`.


The function, `cancelAnimationFrame` works in the same way as `clearTimeout` (in the sense that it can be used to cancel a frame if it hasn't been called yet).

## Debouncing
Some types of events such as `'mousemove'` and `'scroll'` are triggered so rapidly that you should be careful not to do anything too time-consuming on the handler or the interaction with the web page will become slow.

A technique that helps in that situation is called *debouncing*. It consists in calling `setTimeout` instead of handling the event right away.

There are two different use cases for *debouncing* that require a slightly different approach.

### Debouncing after the document is idle

This technique is used when we want to delay the processing until the user is done with an element (e.g. when a user is typing on an *input* element).

```html
  <textarea>Type something here...</textarea>
  <script>
    const textarea = document.querySelector('textarea');
    let timeout;
    textarea.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => console.log('Typed!'), 500);
    });
  </script>
```

In the example, instead of printing the message with every keystroke, we debounce it until the user is no longer typing. We do that by scheduling the action (in this case printing a message on the console) to occur not immediately, but rather after a given amount of time. If the event handler is triggered before the specified interval, the action is not executed, but rather, postponed again after the interval.
By doing so, we ensure that only when there document is *idle* we perform the action.

### Debouncing the processing in specific intervals
This technique is used wehen we want to process the events separated by at least at certain amount of time (e.g. when we're displaying the mouse coordinates in the document).

```javascript
let scheduled = null;
window.addEventListener('mousemove', evt => {
  if (!scheduled) {
    setTimeout(() => {
      evtCount.textContent = Number(evtCount.textContent) + 1;
      mouseCoordinates.textContent = `(${ evt.pageX }, ${ evt.pageY })`;          
      scheduled = null;
    }, 250);
  }
  scheduled = event;
});
```

In this case, when the mouse is moved the event handler is fired, but instead of process it right away, we check if the `scheduled` object is populated. If it is, it means that the event has not been processed in the past 250 ms. If it is not populated, we process the event with a delay of 250 msecs and set the `scheduled` semaphore to `null` so that it can be processed again.

In short, if it's been 250 msecs since the action was processed, the actions are taken. Otherwise, the actions are dropped. As a consequence, you should establish the threshold quick enough, so that you're not dropping important events (e.g. if you move the mouse quick enough, the coordinates won't show the correct value).

---
## You know you've mastered this section when...

+ You understand that the way in which the browsers inform the running apps of events is through handlers &mdash; functions that are called when a given event occurs. 
+ You're comfortable defining event handlers with `window.addEventListener('{evt}', fn)`.
+ You understand that *event handlers* are defined in the context of a node `{node}.addEventListener('{evt}', fn)`.
+ You know that you can use `{node}.removeEventListener('{evt}', fn)` to remove a previously registered handler.
+ You know that event handlers receive an event object that changes from event to event. The event's `type` property contains a string identifying the event.
+ You understand the basics of event propagation: an event is originated at a given node, but then the same event is propagated outward to the node's parent, and the node's parent parent, etc. This can be prevent using `stopPropagation()` method. It can also be used to your benefit by defining a handler on an element containing other nodes and using `event.target` to understand what element was clicked on.
+ You're aware that custom JavaScript handlers are called before default element behaviors (such as taking you to a page when the user clicks on an anchor). You're comfortable using `event.preventDefault()` to disable default behaviors from triggering, but understand that most browsers do not let you disable certain default behaviors.
+ You're comfortable working with key events, and are able to identify the key and key modifier that was pressed.
+ You're comfortable working with mouse events, and are able to identify the buttons and coordinates on which the event happened.
+ You're aware of the touch screen events, and understand that they are a super set of the mouse events.
+ You understand the `'scroll'` event.
+ You understand the `'focus'` and `'blur'` events and that these two events do not propagate to their parents.
+ You understand the `'load'` and '`beforeunload'` events.
+ You're comfortable using *web workers* to handle heavy computations on separate processes and understand the protocol between the *main* script and the *web worker*.
+ You're aware that `setTimeout` and `setInterval` also work on browser environments.
+ You understand the *debouncing* techniques to defer the event processing until the document is *idle* or to process at regular intervals.
---

## Code Samples

### [01 &mdash; Hello, Event Handlers](./01-hello-event-handlers)
Illustrates how to register a simple event handler for the `click` event.

### [02 &mdash; Hello, Element Event Handlers](./02-hello-element-event-handlers)
Illustrates how to register a simple event handler for the `click` event on a specific DOM element.

### [03 &mdash; Hello, Event Objects](./03-hello-event-objects)
Illustrates how to work with the event object that contains information about the event.

### [04 &mdash; Hello, Event Propagation](./04-hello-event-propagation)
Illustrates how events happening on a child node are propagated to the parent, and how to prevent that from happening when using `stopPropagation`.

### [05 &mdash; Hello, Event Target](./05-hello-event-target)
Demonstrates how `event.target` can be used in a technique that registers an event handler in a containing element and then uses `event.target` to identify where the event originated.

### [06 &mdash; Hello, Prevent Default](./06-hello-prevent-default)
Illustrates how to use `event.preventDefault` to prevent the default behavior of an element from being triggered.

### [07 &mdash; Hello, Key Events](./07-hello-key-events)
Illustrates how to work with `keydown` and `keyup` events, and how to read modifier keys associated with the key event.

### [08 &mdash; Hello, Mouse Events](./08-hello-mouse-events)
Illustrates how to work with mouse events, and how to check the coordinates at which the mouse event happened.

### [09 &mdash; Primitive Drawing Program](./09-primitive-drawing-program)
A primitive drawing program illustrating mouse events.

### [10 &mdash; Mouse-dragging aware application](./10-mouse-drawing-aware-application)
A program illustrating how to work with `'mousemove'` events by creating a bar that can be done narrower or wider by dragging it.

### [11 &mdash; Hello, touch events](./11-hello-touch-events)
Illustrates how to work with touch events.

### [12 &mdash; Hello, scroll events](./12-hello-scroll-events)
An example of handling scroll events, in which a progress bar is drawn above the document and it is updated as the document is scrolled.

### [13 &mdash; Hello, focus events](./13-hello-focus-events)
Illustrates how to work with focus events.

### [14 &mdash; Hello, load event](./14-hello-load-events)
Illustrates how to work with `'load'` and `'beforeunload'` events.

### [15 &mdash; Hello, web workers](./15-hello-web-workers)
Illustrates how to work with *web workers* to unload the main script on a separate process. In order to make it work, the html is hosted on an *Express* application.

### [16 &mdash; Hello, debouncing (use case 1: idle)](./16-hello-debouncing-idle)
Illustrates how to implement the technique known as *debouncing* for handling the event when the document is idle.

### [16 &mdash; Hello, debouncing (use case 1: idle)](./16-hello-debouncing-idle)
Illustrates how to implement the technique known as *debouncing* for handling the event when the document is idle.

### [17 &mdash; Hello, debouncing (use case 2: intervals)](./17-hello-debouncing-intervals)
Illustrates how to implement the technique known as *debouncing* for handling the event separated at regular intervals.