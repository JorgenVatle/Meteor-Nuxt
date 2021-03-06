# ![Meteor-Nuxt](.github/assets/logo-alt.png)
A wicked experiment combining Meteor and Nuxt for highly modern application development with split responsibilities.

We use Nuxt for its excellent SSR/SSG (Static Site Generator) capabilities, something Meteor really can't do very well
without having to dive into its internals. Here we only use Meteor for what it does best, which is its  
[DDP protocol](https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md)!

### Changes since 1.0
Previous versions of this project would pull out the client bundle from the included Meteor installation and include
that as a part of the Nuxt project. This would prove difficult to work with, particularly in terms of reactivity
as it wasn't exactly built to work with Vue.

This time around, we've opted not to pull any code from Meteor when compiling Nuxt. We use the standalone 
[`simpleddp`](https://github.com/Gregivy/simpleddp) package. Its modern async/await syntax and cursor syntax allows for
an overall better developer experience all while being very flexible. Not to mention, it works excellently together
with [Vue 3.0's composition API](https://composition-api.vuejs.org/). 🙏 

## Dependencies
The following dependencies must be installed on your system in order to run this project.
- [Meteor](https://www.meteor.com/install) (v1.11 will be installed when the project runs)
- [NodeJS 12+](https://nodejs.org/en/)


## Installation
```bash
npm install     # This will setup and install dependencies for both Nuxt and Meteor 
```

## Startup
```bash
npm start       # This will start both Nuxt and Meteor in development mode
```
This will start up two servers, Meteor at [localhost:3050](http://localhost:3050) and Nuxt at
[localhost:3000](http://localhost:3000).

## License
MIT