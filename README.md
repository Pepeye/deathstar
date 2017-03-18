deathstar: GraphQL Node API on PCF
===========================

GraphQL starter written in ES6 (ES2015) and ES7 (ES2016).



Getting Started
--------

```sh
# if app start fails for node.js
# set health check to process or it will never pass in PCF
cf set-health-check <APP_NAME> process
cf restart <APP_NAME>
```
