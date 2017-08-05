db.createCollection("documents",
	{
		validator: {
			$or:
			[
				{ title: { $type: "string" }},
				{ description: { $type: "string" }},
                { docType: { $type: "string" }},
                { mimeType: { $type: "string" }},
                { docUrl: { $type: "string", $exists: true }},
                { thumbnailUrl: { $type: "string" }},
                { createDate: { $type: "timestamp", $exists: true }},
                { createMember: { $type: "string", $exists: true }},
                { height: { $type: "number" }},
                { width: { $type: "number" }},
                { folder: { $type: "string" }}
			]
		}
	}
);

/*
    Sample:
    {
        title: "",
        description: "",
        docType: "",
        mimeType: "",
        docUrl: "",
        thumbnailUrl: "",
        createDate: null,
        createMember: "",
        height: 0,
        width: 0,
        folder: ""
    }
*/