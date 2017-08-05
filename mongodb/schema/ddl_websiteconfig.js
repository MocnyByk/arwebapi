db.createCollection("websiteconfig",
	{
		validator: {
			$or:
			[
				{viewCount: { $type: "number", $exists: true } },
				{viewCountLastUpdated: { $type: "timestamp", $exists: true}}
			]
		}
	}
);