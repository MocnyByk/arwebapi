db.createCollection("contents",
	{
		validator: {
			$or:
			[
				{ tag: { $type: "string", $exists: true }},
                { subTag: { $type: "string", $exists: true }}
			]
		}
	}
);

/*
    Sample:
    {
        tag: "",
        subTag: ""
    }
*/