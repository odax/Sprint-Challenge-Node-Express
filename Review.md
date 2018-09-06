# Review Questions

## What is Node.js?
Node.js is an environment to run javascript outside of the browser. It allows you to run javascript server-side (or any-other side besides client-side). It compiles javascript with the commonJS module
instead of AMD.
## What is Express?
Express is a framework for Node.js that allows you to create a CRUD server that has route endpoints. Allows utilization of middleware.
## Mention two parts of Express that you learned about this week.
Middleware, req & res
## What is Middleware?
A unit-like component that will react to a specific or all http requests from the client. These reactions will either be in the form of accessing data from a database or responding to the client with
any kind of information.
## What is a Resource?
A resource is any thing that an app is going to utilize. Friends, lists, posts etc..
## What can the API return to help clients know if a request was successful?
HTTP status, it's a number which correlates to the success or failure of a specific type of HTTP request after it hits the server.
## How can we partition our application into sub-applications?
server.Router()
## What is express.json() and why do we need it?
allows reading and writing of json files. It's a req.body parser.