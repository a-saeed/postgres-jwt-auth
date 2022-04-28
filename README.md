# How to run
-after cloning the repo, run the command `npm install` to install the necessary packages.  
-generate private/public key-pair files by running `node app_api/lib/keys/generateKeyPair.js`   
-run the application using the command `nodemon app.js` 
# API routes  
-`http://localhost:3000/user/register` POST request using postman will add a new user by providing user credentials (username, password).  
-`http://localhost:3000/user/login` POST request to log existing users.  
-`http://localhost:3000/user/protected` GET request will return static data if a valid jwt is provided to the auth header.
