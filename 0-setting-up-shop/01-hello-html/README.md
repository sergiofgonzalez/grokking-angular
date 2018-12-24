# Grokking Angular: Setting up shop: Hello, HTML!   
> The most basic notions on HTML, and JavaScript in the browser.

---
+ Basic HTML page with the `<script>` tag
+ Referencing external JavaScript files in the `<script>` tag
+ Using JavaScript in other tags
---


## HTML and JavaScript
The `<script>` tag of the HTML language allows you to include a piece of JavaScript in an HTML document:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Hello, HTML with &lt;script&gt;</title>
</head>
<body>
  <h1>Testing alert!</h1>
  <script>alert('Hello to Jason Isaacs!')</script>
</body>
</html>
```

The JavaScript code wrapped in the `<script>` tag will run as soon as it is encountered. Typically, instead of providing JavaScript inline, you will include a reference to a file containing the JavaScript program:

```html
<h1>Testing alert!</h1>
<script src="code/hello.js"></script>
```

When an HTML page references other URLs as part of itself, web browsers will retrieve them immediately and include them in the page.

Note that a `<script>` tag must always be closed with `</script>`, even if it refers to a script file and doesn't contain any code.

Some attributes can also contain a JavaScript program, such as the `<button>` tag.

---
## You know you've mastered this section when...

+ You can write a valid HTML page from scratch, understand its basic elements and include some JavaScript on it.
+ You know about the `<script>` tag: how to write JavaScript inline, and how to reference an external JavaScript file.
+ You're aware that some other tags also accept JavaScript, such as `<button onclick="...JavaScript here...">
---

## Code Samples

### [01 &mdash; Hello HTML with JavaScript](./01-hello-html-with-javascript)
Basic HTML example containing JavaScript directly wrapped in `<script>` tag.

### [02 &mdash; Hello HTML with JavaScript reference](./02-hello-html-with-javascript-reference)
Same basic HTML example containing JavaScript referenced in `<script src="...">` tag.

### [03 &mdash; Hello JavaScript in a button](./03-hello-javascript-in-a-button)
A basic HTML example containing `<button>` tag with JavaScript in it.
