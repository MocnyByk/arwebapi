db.createCollection("members",
	{
		validator: {
			$or:
			[
				{ memberCode: { $type: "string", $exists: true }},
				{ password: { $type: "string", $exists: true }},
				{ salt: { $type: "string", $exists: true }},
                { createDate: { $type: "timestamp", $exists: true }},
                { lastActivity: { $type: "timestamp" }},
                { failedLoginAttemps: { $type: "number" }},
                { lastFailedLogin: { $type: "timestamp" }},
                { locked: { $type: "bool" }}
			]
		}
	}
);

db.members.createIndex({ memberCode: 1 }, { unique: true });

/*
    Sample:
    {
        memberCode: "",
        password: "",
        salt: "",
        personDetails: {
            firstName: "",
            lastName: ""
        },
        createDate: null,
        lastActivity: null,
        loginTokens: [
            {
                token: "",
                lastUse: null
            }
        ],
        failedLoginAttemps: 0,
        lastFailedLogin: null,
        locked: false
    }
*/