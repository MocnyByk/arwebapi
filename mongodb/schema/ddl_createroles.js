db.createRole({
  role: "api",
  privileges: [
     { resource: {db: "arartistry", collection: "" }, actions: [ "insert", "update", "remove" ] }
  ],
  roles: [
     { role: "read", db: "arartistry" }
  ]
});