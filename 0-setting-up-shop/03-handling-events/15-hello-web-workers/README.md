# 15 &mdash; Hello, web workers
> Illustrates how to work with *web workers* to unload the main script on a separate process.

Note that it is necessary to host the *html* project on a server to make the *web workers* function properly on modern browsers. For that reason, a simple *Express* application whose only purpose is to serve static content is set up.