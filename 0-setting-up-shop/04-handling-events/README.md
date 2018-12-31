# Grokking Angular: Setting up shop: Forms 
> Interacting with Forms

---
+ Notions on the HTTP protocol
+ Browsers and the HTTP protocol
+ Making HTTP requests in the browser using `fetch`
+ Basic notions on HTTP Sandboxing
+ Introducing the basic set of form elements: input fields, text areas and drop-downs
+ Focus and Tabs in form elements
+ Disabling elements
+ The `<form>` element
+ Text fields
+ Checkboxes and ratio buttons
+ Select Fields
+ File Fields
+ Storing Data in the Browser
---


## A few basic notions on the HTTP protocol
The *Hypertext Transfer Protocol* (HTTP) is the mechanism through which data is requested and provided on the *World Wide Web*.

When you type an internet address in your browser's address bar, the browser first looks up the address of the server associated with the address and tries to open a TCP connection to it.
If the server exists and accepts the connection, the browser will send something like:

```
GET /sergiofgonzalez HTTP/1.1
Host: github.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98
...
```

Then, the server will response through the same TCP connection:
```
HTTP/1.1 200 OK
Date: Thu, 27 Dec 2018 08:51:51 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Server: GitHub.com
Status: 200 OK
...
X-GitHub-Request-Id: C738:7907:196F0578:2481F7B8:5C2492A6

<!doctype html>
...
```

The browser takes the part after the blank line that delimits the response body from the response headers.

The information sent by the client is called the *request*, and it starts with:

```
GET /sergiofgonzalez HTTP/1.1
```

with the first word being the method of the request, then the path of the resource the request applies to, followed byt the version of HTTP protocol the request is using.

The server response begins with:
```
HTTP/1.1 200 OK
```

The first part is the version, followed by the status code of the response (which is a three-digit number), followed by a human readable string representing the status code.

In a nuthshell:
+ `2xx` &mdash; success status
+ `4xx` &mdash; an error was found in the request (e.g. `404` the requested resource could not be found)
+ `5xx` &mdash; an error was found processing the request, but the request is not to blame (e.g. `500` Internal Server Error)

After the first line of the response, you get any number of headers in the form `name: value` that give extra info about the request or the response.

Most of them are optional, and the client and server are free to decide whether to include them or not. However, some of them are required, as the `Host` header which identifies which hostname the client is trying to talk to.

After the headers, both the request and response may include a blank line followed by a body, which contains the data being sent. Typically, `GET` and `DELETE` don't send data in the body, while `PUT` and `POST` requests do.

## Browsers and HTTP
A browser will make a request when we enter a URL in its address bar. When the resulting HTML pages references other files, such as images, script files, etc. those will also be retrieved.
To be able to fetch those quickly, browsers will make several `GET` requests simultaneously, rather than waiting for the responses one at a time.

HTML pages may include *forms*, which allow the user to fill out information and send it to the server:

```html
<form method="GET" action="example/message.html">
  <p>Name: <input type="text" name="name"></p>
  <p>Message: <br><textarea name="message"></textarea></p>
  <p><button type="submit">Send</button></p>
</form>
```

This piece of code describes a form with two fields: a small one asking for a name and a larger one to write a message in. When you click the Send button the form is *submitted* meaning that the content of its field is packed into an HTTP request and browser navigates to the result of that request.

When the `<form>` element's method attribute is `GET` (or omitted), the information in the form is added to the end of the action URL as a *query string*:
```
GET /example/message.html?name=Jason&message=Hello%20to%20Jason HTTP/1.1
```

The question mark indicates the end of the path part and the start of the *query string*. It is followed by pairs of names and values with the `&` used to separate those pairs. Some characters in query strings must be *escaped* using *URL encoding* which uses a percent sign followed by two hexadecimal digits that represent the character code.
JavaScript provides the `encodeURIComponent` and `decodeURIComponent` to encode and decode using this format.

If we change the method attribute of the form to `POST`, the HTTP request made to submit the form will use that method and the query string will be placed in the body of the request:

```
POST /example/message.html HTTP/1.1
Content-Length: 37
Content-Type: application/x-www-form-urlencoded

name=Jason&message=Hello%20to%20Jason
```

As a rule of thumb, `GET` should be used for requests that do not have side effects but simply ask for information. Requests that perform any kind of modification should be expressed with other methods, such as `POST`.

## Fetch
The `fetch()` method is the modern way of making HTTP requests from JavaScript programs in the browser.

```javascript
fetch('example/data.txt').then(response => {
  console.log(`status: ${ response.status }`);
  console.log(`Content-Type: ${ response.headers.get('Content-type') }`);
});
```

Calling `fetch` returns a promise that resolves to a `Response` object holding information about the server's response, such as its status code and its headers. Those headers are wrapped into a *Map-like* object that allows you to pass the header names as case-insensitive keys (so that `get('Content-Type')` and `get('content-type')` will render the same value).

The promise returned by `fetch` is resolved even if the server responded with an error status code. It will be rejected only if network related errors are found.

The first argument to fetch is the URL to be requested. When the URL does not start with a protocol name it is treated as relative to the current document. When it starts with a `/`, it replaces the current path.

The contents of the response can be obtained through the `text()` method, which returns a promise with the response body:

```javascript
fetch("example/data.txt")
  .then(resp => resp.text())
  .then(text => console.log(text));
```

Similarly, the `json()` method returns a promise that resolves to the value you get when parsing the body as JSON or rejects it if not a valid JSON.

You can configure fetch to make other request types other than `GET` that do not require a request body:
```javascript
fetch('example/data.txt', {method: 'DELETE'})
  .then(resp => console.log(resp.status));
```

To send a request body, you can include a `body` in the options object. You can also set additional headers by using the `headers` option:

```javascript
fetch('example/data.txt', {headers: {Range: 'bytes=8-19'}})
  .then(resp => resp.text())
  .then(console.log);
```

## HTTP Sandboxing
Browsers includes capabilities to protect the person controlling the computer on which scripts are running. Otherwise, malicious scripts would be able to make requests on my behalf.

The browsers implement this security feature by disallowing scripts to make HTTP requests to other domains (e.g. domain1.com scripts will not be able to interact with domain2.com scripts).

When building systems that interact with several domains for legitimate reasons, the server has to include a header to indicate to the browser that it should allow JavaScript programs from another domain to interact with that server:

```
Access-Control-Allow-Origin: *
```

## Form Fields
Forms were originally designed for the *pre-JavaScript Web* to allow web sites to send user-submitted information in HTTP request. This designed assumed that interaction with the server would always happened by navigating to a new page.

That no longer holds true, but the form elements are part of the DOM like the result of the page elements, and support a number of properties and events that are not present on other elements and that let you inspect and control forms from JavaScript.

A web form consists of any number of input fields grouped in a `<form>` tag. HTML allows several different styles of fields such as checkboxes, drop-down menus, input fields...

A lot of field types use the `<input>` tag, and the `type` attribute is used to select the field`s style:

| Input `type` | Description |
|--------------|-------------|
| text         | a single-line text field |
| password     | same as text but hides the text that is typed |
| checkbox     | An on/off switch |
| radio        | A multiple-choice field |
| file         | Allows the user to choose a file from their computer |

```html
<p><input type="text" value="abc"> (text)</p>
<p><input type="password" value="abc"> (password)</p>
<p><input type="checkbox" checked> (checkbox)</p>
<p>
  <input type="radio" value="A" name="choice">
  <input type="radio" value="B" name="choice" checked>
  <input type="radio" value="C" name="choice">
  (radio)  
</p>
<p><input type="file"> (file)</p>
```

Form fields do not necessarily have to appear in a `<form>` tag. Such *form-less* fields cannot be submitted, but when responding to input from JavaScript that might be exactly what we intend to do.

Multiline fields have their own tag, `<textarea>`, which requires a matching `</textarea>` closing tag.
```html
<textarea>
one
two
three
catorce
</textarea>
```

The `<select>` tag is used to allow the user to select from a number of predefined options:
```html
<select>
  <option>option A</option>
  <option>option B</option>
  <option>option C</option>    
</select>
```

Whenever the value of a form field changes, a `'change'` event is fired.

## Focus
Form fields can get *keyboard focus*. That is, when clickd or activated in some other way, they become the currently active element and the recipient of keyboard input.

We can control *focus* from JavaScript with the `focus()` and `blur()` methods defined on the elements. You can query the currently focused element using the `document.activeElement` property.

For some pages, the user is expected to want to interact with a form field immediately. Although you can use JavaScript for that, it is a more standard way to use the `autofocus` attribute on that field.

Browsers traditionally also allow the user to move the focus through the document by pressing the *TAB* key. The order in which the elements receive focus can be established with the `tabindex` attribute. A `tabindex=-1` makes the browser skip that element, and setting a `tabindex` on an element will make it focusable (even when it cannot receive focus by default).

In the next example, the *text field* gets automatically the focus because it features the `autofocus` attribute. Also, the tab cycle is skipping the link (which would be considered by default), and the header is considered (when it wouldn't be normally considered).

```html
<h1 tabindex="3">Tab related concepts!</h1>
<input type="text" placeholder="type text here..." class="form-control" tabindex="1" autofocus>
<p>
  <a href="." tabindex="-1">link</a>
</p>
<button type="button" class="btn btn-primary" tabindex="2">OK</button>
```

## Disabled Fields
Form fields can be disabled through their `disabled` attribute. It is enough to specify the attribute without valued.

```html
<button>Clickable</button>
<button disabled>Not clickable</button>
```

## The `form` element
When a field is contained in a `<form>` element, its DOM will have a `form` property linking back to the `<form>` element. And in turn, the `<form>` element will have an `elements` property that will contain an array-like collection of fields inside it.

The `name` attribute of a form field determines the way its value will be identified when the form is submitted. It can also be used as a property name when accessing the form's `elements` property, which acts both as an *array-like*, and as a *map-like* object with the name as the key.

```html
<form>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" placeholder="Enter your name" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" name="password" placeholder="Enter your password" class="form-control">
  </div>
  <button type="submit" class="btn btn-primary">Log in</button>
</form>
<script>
  const form = document.querySelector('form');
  [...form.elements].forEach((elem, i) => {
    console.log(`${ i }: ${ elem.nodeName } - ${ elem.id }`);
  });
  console.log(`form.elements.password.type: ${ form.elements.password.type }`);
  console.log(`form.elements.name.form === form: ${ form.elements.name.form === form }`);
</script>    
```

A button of `type="submit"` will cause the form to be submitted. Pressing *ENTER* when a form field is focused has the same effect.

Submitting a form means the browser will navigate to the page identified by the form's `action` attribute using a `GET` or a `POST`. Before that happens, a `'submit'` event is fired. You can handle this event from JavaScript and call `preventDefault()` to prevent the submission from taking place.

```html
<div class="container-fluid">
  <h1>Open the developer's console!</h1>
  <form action="example/submit.html">
    <div class="form-group">
      <label for="value">Value</label>
      <input type="text" name="value" id="value" placeholder="Enter the information to save" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</div>
<script>
  const form = document.querySelector('form');
  form.addEventListener('submit', evt => {
    console.log(`Saving value: ${ form.elements.value.value }`);
    event.preventDefault();
  });
</script>
```

This technique has various uses such as validating the form fields before being submitted, or overriding the default submission mechanism by reading the form fields and preparing a message to the server using `fetch`.

## Text Fields
Fields created by `<input>` or `<textarea type="text">` or `<textarea type="password">` share a common interface. Their DOM elements have a `value` property that holds their current content as a string value. Setting this property to a different string changes the field's content.

The `selectionStart` and `selectionEnd` properties give us information about the cursor and selection in the text. When nothing is selected, both properties have the same value, indicating the position of the cursor.

The `'change'` event for a text field does not fire every time something is typed. Rather, it is fired when the field loses focus after its content was changed. To respond immediately to changes in a text field, you should register a handler for the `'input'` event instead, which is fired every time the user manipulates the content of the field.

## Checkboxes and Radio Buttons
A checkbox field is a binary toggle. Its value can be accessed through the `checked` property, which holds a *Boolean* value.

```html
<div class="container-fluid">
  <div class="form-group form-check">
    <input type="checkbox" id="black-theme-switch" class="form-check-input">
    <label class="form-check-label" for="black-theme-switch">Use dark theme</label>
  </div>
</div>
<script>
  const checkbox = document.querySelector('#black-theme-switch');
  checkbox.addEventListener('change', () => {
    document.body.style.background = checkbox.checked ? 'black' : '';
  });
</script>
```

The `<label>` tag associates a piece of document with an input field. Clicking on the label has the same effect as clicking on the checkbox.

A radio button is similar to a checkbox, but it's implicitly linked to other radio buttons with the same `name` attribute so that only one of them can be active at any time.

```html
<div class="container-fluid">
  <legend>Choose your color:</legend>
  <div class="form-check">
    <input type="radio" name="color" id="radio-color-orange" value="orange" class="form-check-input">
    <label class="form-check-label" for="radio-color-orange">Orange</label>
  </div>
  <div class="form-check">
    <input type="radio" name="color" id="radio-color-lightgreen" value="lightgreen" class="form-check-input">
    <label class="form-check-label" for="radio-color-lightgreen">Green</label>
  </div>    
  <div class="form-check">
    <input type="radio" name="color" id="radio-color-lightblue" value="lightblue" class="form-check-input">
    <label class="form-check-label" for="radio-color-lightblue">Blue</label>
  </div>
</div>
<script>
  const radioButtons = document.querySelectorAll('[name=color]');
  for (const radioButton of [...radioButtons]) {
    radioButton.addEventListener('change', () => document.body.style.background = radioButton.value);
  }
</script>
```

Note that the value of a radio button is accessed throught the `value` property. The query `'[name=color]'` is used to retrieve all elements whose name attribute is set to to the given one, thus, giving as an array-like structure with all the individual radio buttons.

## Select Fields
Select fields allow the user to choose from a set of options. This element also allows for multiple selection when using the `<select multiple>` tag.

Each `<option>` tag within a `<select>` has a value defined with the `value` attribute. Whent that attribute is not given, the text inside the option will count as its value. The `<value>` property of a `<select>` element will reflect the currently selected option for regular (*non-multiple*) select fields. For *multiple* fields this value should not be read, as it will only show one of the selected values.

The `<option>` tags for a `<select>` field can be accessed as an *array-like* object through the field's `options` property. Each option has a property called `selected` which indicates whether that option is currently selected.

```html
<div class="container-fluid">
  <div class="form-group">
    <label for="binary-select">Select the binary value using the multiple select</label>
    <select multiple class="form-control" id="binary-select">
      <option value="1">0001</option>
      <option value="2">0010</option>
      <option value="4">0100</option>
      <option value="8">1000</option>
    </select> = <span id="output">0</span>
  </div>
</div>
<script>
  const select = document.querySelector('select');
  const output = document.querySelector('#output');
  select.addEventListener('change', () => {
    let number = 0;
    for (const option of [...select.options]) {
      if (option.selected) {
        number += Number(option.value);
      }
    }
    output.textContent = number;
  });
</script>
```

## File Fields
File fields were originally designed as a way to upload files from the user's machine through a form. In modern browsers, they also provide a way to read such files from JavaScript programs &mdash; only files selected through a file field can be accessed from browser-based JavaScript programs.

The `files` property of a file field element is an *array-like* object containing the files chosen in the field. You can let the user select multiple files by using the attribute `multiple` in the `<input>`.

Objects in the `files` property have properties such as `name`, `size` and `type`.

```html
  <div class="container-fluid">
    <div class="form-group">
      <label for="file-selector">Select a file</label>
      <input type="file" id="file-selector" class="form-control-file">
    </div>
    <p>
      Selected file name: <span id="selected-file-name"></span><br>
      Selected file type: <span id="selected-file-type"></span>
    </p>      
  </div>
  <script>
    const input = document.querySelector('input');
    const fileName = document.querySelector('#selected-file-name');
    const fileType = document.querySelector('#selected-file-type');
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        const file = input.files[0];
        fileName.textContent = file.name;
        fileType.textContent = file.type || 'n/a';
      }
    });
  </script>
```  

Reading a file is done creating a `FileReader` object, registering a `'load'` event handler for it, and calling readAsText method giving it the file you want to read. Once loading finishes, the reader's `result` property contains the file's content. `FileReader`s also fire an `'error'` event when reading the file fails for any reason. The `reader.error` property contains the error.

```javascript
const textarea = document.querySelector('textarea');
input.addEventListener('change', async () => {
  if (input.files.length > 0) {
    const file = input.files[0];
    try {
      const fileContents = await readFileText(file);
      textarea.value = fileContents;
    } catch (err) {
      textarea.value = `The file could not be read:\n${ err }`;
    }
  }
});

function readFileText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error));
    reader.readAsText(file);
  });
}
```

## Storing Data in the Browser
When you need to keep state even when the page is closed, you can store the data in the browser.

The `localStorage` object can be used to store data in a way that survives page reloads. This object allows you to save file strings under a given key:

```javascript
localStorage.setItem('username', 'jason.isaacs');
console.log(localStorage.getItem('username'));

localStorage.removeItem('username');
```

The information is the `localStorage` is preserved until it is overwritten, removed or the user clears their local data.

Sites from different domains get different storage compartments. That means that data stored in `localStorage` by a given website can be read only by scripts on that same site.

See [13 &mdash; Hello, `localStorage`](./13-hello-local-storage) for an example.

---
## You know you've mastered this section when...

+ You understand the basics of the HTTP protocol, and understand how browsers use it to retrieve resources (such as HTML documents, images, JavaScript files...) and to send information in forms.
+ You know the `fetch()` method capabilities inside and out and are comfortable using it.
+ You're aware that by default the browser will not allow JavaScript programs from one domain to interact with a server of other domain. You know that if the server should allow this to happen, it should explicitly return `Access-Control-Allow-Origin: *` as part of the response.
+ You're aware of how the browsers handle the focus in form elements and are familiar with `autofocus` and `tabindex` properties.
+ You know that using the `disabled` attribute on an element disables it.
+ You're comfortable working with the `form` element as a form. You know how to access the form's elements using the `elements` property and how to prevent submission from taking place.
+ You're comfortable working with text fields (regular ones and text areas), checkboxes and radio buttons, select fields and file fields.
---

## Code Samples

### [01 &mdash; Hello, Form Elements](./01-hello-form-elements)
Illustrates the graphical representations of different types of form elements such as input text fields, password fields, checkboxes, radio buttons, file selection fields, textareas and drop-downs.

### [02 &mdash; Hello, `autofocus`](./02-hello-autofocus)
Illustrates how to use `autofocus` to make an input immediately available for the user to type in.

### [03 &mdash; Hello, `tabindex`](./03-hello-tabindex)
Illustrates how to use `tabindex` to establish the cycle order for the focus amongst the form elements.

### [04 &mdash; Hello, Form element](./04-hello-form-element)
Illustrates how to interact with the `<form>` element.

### [05 &mdash; Preventing Form Submission](./05-prevent-form-submission)
Illustrates how to prevent a form from being submitted when the submit button is clicked.

### [06 &mdash; Hello, Text Selection](./06-hello-text-selection)
Illustrates how to work with text selection in text fields.

### [07 &mdash; Hello, Input Event](./07-hello-input-event)
Illustrates how to work with `'input'` event in text fields by creating a counter.

### [08 &mdash; Hello, Checkbox](./08-hello-checkbox)
Illustrates how to work with checkboxes.

### [09 &mdash; Hello, Radio Buttons](./09-hello-radio-buttons)
Illustrates how to work with checkboxes.

### [10 &mdash; Hello, Select Fields](./10-hello-select-fields)
Illustrates how to work with select fields.

### [11 &mdash; Hello, File Fields](./11-hello-file-fields)
Illustrates how to work with file fields.

### [12 &mdash; Hello, Reading Files](./12-hello-reading-files)
Illustrates how to read files.

### [13 &mdash; Hello, `localStorage`](./13-hello-local-storage)
Illustrates how to work with the `localStorage` object.