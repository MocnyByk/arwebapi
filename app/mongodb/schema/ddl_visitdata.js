db.createCollection("visitdata",
	{
		validator: {
			$or:
			[
				{ ipAddress: { $type: "string", $exists: true }},
                { browser: { $type: "string", $exists: true }}
			]
		}
	}
);

/*
    Sample:
    {
        ipAddress: "",
        browser: ""
    }
*/