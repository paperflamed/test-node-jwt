#Setup
- npm i
- npm run start
- npm run monit

#Setdown
- npm run kill

##Routes

#### /login get
###### params
- email 
- password

###### headers
-
###### returns
- success - auth:true, token:"token"

#### /logout get
###### params
-
###### headers
- x-access-token

###### returns
- success - auth:false, token:""

#### /register post
###### params
- email 
- password

###### headers
-

###### returns
- success - auth:true, token:"token"

#### /info get
###### params
-
###### headers
- x-access-token

###### returns
- success - email:'email', id:'id'
