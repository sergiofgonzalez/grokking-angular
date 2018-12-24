# Grokking Angular: Setting up shop: Event Handling 
> Concepts on event handling in the browser

---
+ Introducing event handlers: the `window` object.
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


## Cheat Sheet

| Method or Property | Description |
|--------------------|-------------|
| `window.addEventListener('{evt}', fn)` | registers the second argument as a handler for the given event (e.g. `'click'` for a mouse click ) |



---
## You know you've mastered this section when...

+ You understand that the way in which the browsers inform the running apps of events is through handlers &mdash; functions that are called when a given event occurs. 
+ You're comfortable defining event handlers with `window.addEventListener('{evt}', fn)`.
---

## Code Samples

### [01 &mdash; Hello, Event Handlers](./01-hello-event-handlers)
Illustrates how to register a simple event handler for the `click` event.

