db.createCollection("inquiries",
	{
		validator: {
			$or:
			[
				{ subject: { $type: "string" }},
                { description: { $type: "string" }},
                { author: { $type: "string" }},
                { email: { $type: "string" }},
                { createDate: { $type: "timestamp", $exists: true }},
                { markedRead: { $type: "bool" }}
			]
		}
	}
);

/*
    Sample:
    {
        subject: "",
        description: "",
        author: "",
        email: "",
        createDate: null,
        markedRead: false
    }
*/