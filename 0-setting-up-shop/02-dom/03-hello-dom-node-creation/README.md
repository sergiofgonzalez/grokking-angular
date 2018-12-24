# 03 &mdash; Hello DOM node creation
> Illustrates how to replace the `<img>` tags of a document with a text node whose content is the image `alt` attribute.

The project contains three different implementations:
+ `01-buggy.html` &mdash; illustrates how iterating over `getElementsByTagName` from start to end leads up to a buggy result, because the array-like structure returned by that method is live.
+ `02-from-end-of-list` &mdash; illustrates how to correctly iterate (from end to start).
+ `03-solid-array` &mdash; illustrates how using `Array.from` also fixes the live structure issue.
+ `04-es6-solid-array` &mdash; an alternative implementation using `[...array-like]` syntax.