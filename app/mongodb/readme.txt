Full Installation instructions:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

To Start MongoDB run:

	mongod --dbpath F:\mongodb\data
	
	a. In this case 'F:\mongodb\data' is where we want to store all data
	b. It's probably best to add the location of 'mongod.exe' to the system PATH 
		if it's not there. It should be under "C:\Program Files\MongoDB\Server\3.4\bin"
		
To run a script use the following command:

	mongo < yourscript.js
	
To execute a script from the mongo runtime:

	load("<scriptname.js>")

Other useful commands:

	show dbs // DBs will not appear if no data exists in any collection
	show collections
	use <dbname>
	show roles
	show users