# 04 &mdash; Hello, Event Propagation
> Illustrates how events happening on a child node are propagated to the parent, and how to prevent that from happening when using `stopPropagation`.

In the example, `'mousedown'` event handlers are registered both for a button an the paragraph around it. When clicked with the right mouse button, the handler on the button uses `stopPropagation` so that the event is not propagated to the paragraph.