# Grokking Angular: Browser-Based JavaScript Cheat Sheets
> Cheat Sheets with browser-based JavaScript concepts


## JavaScript Interface for the Browser

| Method or Property | Description |
|--------------------|-------------|
| `document.documentElement`  | refers to the whole document, represented by the HTML tag |
| `document.head`             | points to the `<head>` element                            |
| `document.body`             | points to the `<body>` element                            |
| `document.body.scrollHeight` | returns the total scrollable height |
| `{node}.nodeType`           | returns the type of the node (e.g. 1 or `Node.ELEMENT_NODE` for elements, 3 or `Node.TEXT_NODE` for text nodes, 8 or `Node.COMMENT_NODE` for comments) |
| `{node}.nodeName` | property that returns the type of the node in capital letters, such as a `'BUTTON'` or `'P'` |
| `{node}.parentNode` | points to the node it is part of, if any |
| `{node}.childNodes` | returns an array-like object holding its children |
| `{node}.firstChild` | points to the first child element of the node or `null` |
| `{node}.lastChild` | points to the last child element of the node or `null` |
| `{node}.previousSibling` | points to the previous adjacent node (node with the same parent appearing immediately before) |
| `{node}.nextSibling` | points to the next adjacent node (node with the same parent appearing immediately after) |
| `{node}.children` | same as `childNodes` but only returns nodes of type `Node.ELEMENT_NODE` |
| `{node}.nodeValue` | provides access to the contents of a text node |
| `{node}.textContent` | provides access to the text content of an element (e.g. `spanElem.textContent`) |
| `document.body.getElementsByTagName('{tag}')` | returns a live array-like structure with all the elements having the given tag |
| `document.getElementById('{id}')` | returns the specific node whose `id` matches the given one |
| `document.getElementsByClassName` | returns a live array-like structure with all the elements having the given class |
| `{node}.remove()` |  removes the element from their current parent node |
| `{node}.appendChild({child})` | places the given child at the end of the list of children for the node |
| `{node}.insertBefore({nodeToInsert}, {existingNode})` | places he given node before the existing node |
| `{node}.replaceChild({newNode}, {existingNode})` | replaces a child node with another one |
| `document.createTextNode('{text}')` | creates a new text node with the given context |
| `document.createElement('{tag}')` | creates a new element of the given type |
| `{node}.{prop}` | access to standard properties, such as `link.href` |
| `{node}.getAttribute('{attrib}')` | gets the value of the given standard or non-standard attribute of the element |
| `{node}.setAttribute('{attrib}')` | gets the value of the given standard or non-standard attribute of the element |
| `{node}.offsetWidth` | gives you the space in pixels the element's width takes |
| `{node}.offsetHeight` | gives you the space in pixels the element's height takes |
| `{node}.clientWidth` | gives you the space in pixels the element's width takes, ignoring the border width |
| `{node}.clientHeight` | gives you the space in pixels the element's height takes, ignoring the border width |
| `{node}.getBoundingClientRect` | returns an object with `top`, `bottom`, `left` and `right` properties indicating the pixel positions of the sides of the element relative to the top left of the screen |
| `pageXOffset` | returns the current scroll position in the horizontal axis |
| `pageYOffset` | returns the current scroll position in the vertical axis |
| `querySelector()` | returns a reference to the element fulfilling the given query selector (such as `"p#header.a.b"`) |
| `querySelectorAll()` | returns a static array-like structure of all the elements fulfilling the given query selector (such as `'p#header.a.b'` or `'[name=color]'`) |
| `window.addEventListener('{evt}', fn)` | registers the second argument as a handler for the given event (e.g. `'click'` for a mouse click ) |
| `{node}.addEventListener('{evt}', fn)` | registers the second argument as a handler for the given event in the specific node |
| `{node}.removeEventListener('{evt}', fn)` | removes a handler for the given eent in the specific node |
| `{event}.stopPropagation()` | prevents an event from propagating outward to the current element's parents |
| `{event}.target` | refers to the node where the event originated |
| `{event}.preventDefault()` | method that disables the default custom behavior for an element | 
| `innerWidth` | global that holds the width of the window |
| `innerHeight` | global that holds the height of the window |
| `{web-worker}.postMessage(data)` | sends a `'message'` event to the *web worker* with the given data (can be an object) |
| `postMessage(data)` | sends a `'message'` event from the *web worker* to the *main* script |
| `timer = setTimeout(fn, delayMillis)` | schedules the execution of the given function (which takes no parameters) after the given milliseconds |
| `{timer}.clearTimeout()` | cancels the execution of the already established timer |
| `timer = setInterval(fn, delayMillis)` | schedules the execution of the given function (which takes no parameters) repeatedly after the given milliseconds |
| `{timer}.clearInterval()` | cancels the execution of the already established interval timer |
| `encodeURIComponent(valueToUrlEncode)` | encodes the given value using the URL encoding format | 
| `decodeURIComponent(UrlEncodedValue)` | decodes the given value using the URL encoding format | 
| `fetch(url, options)` | performs the configured HTTP request |
| `{node}.focus()` | makes the node the currently active element |
| `{node}.blur()` | removes the focus from the given node |
| `document.activeElement` | returns the currently active element |
| `{formNode}.elements` | returns an *array-like* (e.g. `{formNode}.elements[0].nodeName` ) and *map-like* (e.g. `{formNode}.elements.passwordInput`) |
| `{textFieldNode}.value` | holds the current value of a text field (or text area). |
| `{textFieldNode}.selectionStart` | returns the cursor starting position when text is selected in a text field |
| `{textFieldNode}.selectionEnd` | returns the cursor ending position when text is selected in a text field |
| `{checkboxNode}.checked` | returns the value of the checkbox as a *Boolean* |
| `{radioButtonNode}.value` | holds the value of a radio button. |
| `{selectNode}.options` | returns an *array-like* structure with all the options of the select field |
| `{selectNode}.value` | for regular (non-multiple) select fields, return the value of the currently selected option |
| `{selectOption}.selected` | returns whether the given option of the select field is selected or not | 
| `{fileField}.files` | return an *array-like* structure with all the files selected by the user |


## DOM Events

| type  | event | description |
|-------|-------|-------------|
| key events | `'keydown'` | fired when a key on the keyboard is pressed |
| key events | `'keyup'` | fired when a key that was pressed is releases |
| key events | `{keyEvent}.key'` | contains the key that was pressed |
| key events | `{keyEvent}.keyCode'` | contains the key code of the key that was pressed |
| key events | `{keyEvent}.shiftKey'` | boolean value indicating whether shift was pressed |
| key events | `{keyEvent}.ctrlKey'` | boolean value indicating whether ctrl was pressed |
| key events | `{keyEvent}.altKey'` | boolean value indicating whether alt was pressed |
| key events | `{keyEvent}.metaKey'` | boolean value indicating whether meta was pressed |
| mouse events | `'mousedown'` | fired when any mouse button is pressed |
| mouse events | `'mouseup'` | fired when the mouse button is released |
| mouse events | `'click'` | fired in the most specific node that contained both the press and release of the button. If the `'mousedown'` is originated in a different node than the `'mouseup'`, the container of them is the one on which the `'click'` event is triggered |
| mouse events | `'dblclick'` | fired when two mouse clicks happen close together |
| mouse events | `'mousemove'` | fired every time the mouse pointer is moved |
| mouse events | `{mouseEvt}.clientX` | X coordinate in pixels relative to the top-left corner of the window |
| mouse events | `{mouseEvt}.clientY` | Y coordinate in pixels relative to the top-left corner of the window |
| mouse events | `{mouseEvt}.pageX` | X coordinate in pixels relative to the top-left corner of the document |
| mouse events | `{mouseEvt}.pageY` | Y coordinate in pixels relative to the top-left corner of the document |
| mouse events | `{mouseEvt}.button` | contains information about the mouse button that was pressed (0 - left, 1 - middle, 2 - right) |
| mouse events | `{mouseEvt}.buttons` | contains information about the mouse buttons that are currently held down. It contains the sum of codes for the held down buttons (0 - no buttons, 1 - left, 2 - right, 4 - middle) |
| scroll events | `'scroll'` | fired when the element is scrolled |
| focus events | `'focus'` | fired when an element gets focus |
| focus events | `'blur'` | fired when ane element loses focus |
| load events | `'load`' | fired when the document, image or script has been loaded |
| load events | `'beforeunload'` | fired when the document is about be closed or navigated away from |
| web worker events | `'message'` | fired in the *worker* when the *main* script sends a message and received in the *main* script when the *worker* is sending the results |
| form events | `'change'` | fired whenever the value of a form field is modified |
| form events | `'submit'` | fired whenever the submit button of a form is clicked, or *ENTER* is pressed when a form field is focused |
| text field events | `'change'` | fired when a text field (or textarea) loses focus after its content was changed |
| text field events | `'input'` | fired every time the user manipulates the field's content | 
| checkbox/radio events | `'change'` | fired when a checkbox state has been modified |
| select fields | `'change'` | fired when a select fields element has been modified |
| file fields | `'change'` | fired when the user has selected a file with a file field |
| file reader | `'load'` | fired when a file has been read and the results are ready |
| file reader | `'error'` | fired when a file read operation has failed for any reason. The reader's `error` property will contain detailed information about the error. |

## CSS Basics

| CSS/Styling concept | Description |
|---------------------|-------------|
| `style="color: green"` | sets the *style* attribute with the *color* property set. |
| `style="display: block"` | sets the *style* attribute with the *display* property set to *block* |
| `style="display: inline"` | sets the *style* attribute with the *display* property set to *none*, meaning it won't be displayed |
| `style="display: none"` | sets the *style* attribute with the *display* property set to *none*, meaning it won't be displayed |
| `style="display: static"` | the element sits in its normal position in the document (default) |
| `style="display: relative"` | the element sits in its normal position but its `top` and `left` properties can be used to move it relative to the normal place |
| `style="position: absolute"` | the element does not take up space any more and its `top` and `left` properties can be used to position the element relative to the top-left corner of the nearest enclosing element whose `position` property isn't `static` (or relative to the document if such enclosing element does not exist) |
| `style="position: fixed"` | like `position: absolute` but also prevents the element from scrolling with the rest of the document |
| `strong {...}` | defines a rule that will affect the strong elements |
| `.subtle {...}` | defines a rule that will affect the elements with `class="subtle"` |
| `#header {...}` | defines a rule that will affect the element with `id="header"` |
| `p#main.a.b {...}` | defines a rule that will affect the `<p>` elements with `id="main"` and `class="a b"` |
| `p a` | defines a rule that will affect all`<a>` elements descendant of `<p>` |
| `p > a` | defines a rule that will affect all `<a>` that are direct descendants of `<p>` |
| `p .b` |  defines a rule that will affect all elements with `class="b"` that are descendants of `<p>` |
| `p > .b` |  defines a rule that will affect all elements with `class="b"` that are direct descendants of `<p>` |
