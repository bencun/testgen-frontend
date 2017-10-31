A seed for AngularJS apps with lazy loading using requireJS and UI-Router
=====================================
This project is an application skeleton for an [AngularJS](http://angularjs.org/) app using [RequireJS](http://requirejs.org/) for lazy loading.

It is a fork of the [example](https://github.com/lukeb-uk/angular-requirejs-lazy-load-seed) by lukeb-uk that was created to accompany the blog post entitled
'[Lazy Loading In AngularJS](http://ify.io/lazy-loading-in-angularjs/)'.

This seed project contains [AngularJS 1.0.7](http://angularjs.org/), [jQuery 1.10.2](http://jquery.com/), [Bootstrap 2.3.2](http://twitter.github.com/bootstrap/) and [RequireJS 2.1.8](http://requirejs.org/), all ready for you to just start hacking away.

In terms of functionality, this seed app doesn't do much. It has 3 pages and shows you how to wire up the individual components of a lazy loading AngularJS app using UI-Router

## How it works
Each section of the app has it's own folder within the scripts directory, which is then split down further into folders for the separate components. In the root of each of these folders is a file called module.js which states the dependencies for that section.

Within /scripts/lib directory you can store re-usable components that can then be referenced in the module.js file. You will also find the appRoutes.js file, which is the AngularJS routes file. In this, you can define the "module" property with the name of the respective folder within the scripts directory.

## How to run the demo

Either serve the 'app' folder of this repo up with your web server or

* Install node.js
* Run 'npm install' from within the root project directory to install relevant dependencies
* Run 'node server.js' from within the root project directory to start the app
* Go to [http://localhost:3000](http://localhost:3000)