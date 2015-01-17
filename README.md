# angular-nodejs-authentication

I've build the platform using sublime to code and the client is running in http-server locally.

## Response from Server

### :POST /login
  
  Request:
  + body 
```js
      { 
        user:"user",
        password:"password"
      }
```

Response:
  + body
```js
      { token:12345'
      }
```
### :GET /list

Response:
  + header
```js
      {Authorization:12345}
```
  + body 
```js
      [{"_id":"54ba664a5082280769519c02","ip":"127.0.0.1","user":"admin","date":1421502026587,"action":"AUTH_SUCCESS","__v":0}]
```

      
