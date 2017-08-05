/***************/
/* Connection */
/***************/

conn = new Mongo();
db = conn.getDB('arartistry');
printjson(db.adminCommand('listDatabases'));

/**************/
/* Base setup */
/**************/

// Configuration collections
load("schema/ddl_websiteconfig.js");
load("schema/ddl_visitdata.js");
load("schema/ddl_members.js");

// Content collections
load("schema/ddl_documents.js");
load("schema/ddl_posts.js");
load("schema/ddl_inquiries.js");
load("schema/ddl_contents.js");

// User roles
load("schema/ddl_createroles.js")

/***********************************/
/* All files from patches go here! */
/***********************************/