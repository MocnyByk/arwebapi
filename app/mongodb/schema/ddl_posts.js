db.createCollection("posts",
	{
		validator: {
			$or:
			[
				{ subject: { $type: "string" }},
                { html: { $type: "string" }},
                { plaintext: { $type: "string" }},
                { memberCode: { $type: "string", $exists: true }},
                { createDate: { $type: "timestamp", $exists: true }},
                { contentsId: { $type: "objectId", $exists: true }}
			]
		}
	}
);

/*
    Sample:
    {
        subject: "",
        html: "",
        plaintext: "",
        memberCode: "",
        createDate: null
    }
*/