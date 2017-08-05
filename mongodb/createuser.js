/* Commented out because this should never be run directly from the script.
db.createUser(
    { 
        user: "apiuser",
        pwd: "<cleartext password>",
        customData: { comment: "Used by the REST api to connect to the database. Privileges should be heavily restricted." },
        roles: [
            { role: "api", db: "arartistry" }
        ]
    }
);
*/