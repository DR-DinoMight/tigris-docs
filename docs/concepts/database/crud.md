# CRUD Operations

CRUD operations create, read, update and delete [documents](documents.md). The
operations are all atomic and provide strong data consistency guarantees.

## Create operations

There are two flavors of create operations - insert, and replace.

### Insert

Insert operations add new documents to a collection. Insert operations honor
the primary key constraint and throw a duplicate key error if a document
with the same primary key already exists.

![Insert](/img/insert.jpg)

Tigris TypeScript SDK provides the following two APIs to insert documents
into a collection:

- [insertOne()](../../sdkstools/typescript/database/insert.mdx#insert-a-single-document):
  insert single document
- [insertMany()](../../sdkstools/typescript/database/insert.mdx#insert-multiple-documents):
  batch insert documents

See the language-specific sections for more examples of Insert operations:

- [Insert Document in TypeScript](../../sdkstools/typescript/database/insert.mdx)
- [Insert Document in Go](../../sdkstools/golang/database/insert.mdx)
- [Insert Document in Java](../../sdkstools/java/database/insert.mdx)

### Replace

Replace operations provide the following behavior:

- replace a document with matching primary key value
- insert a new document if no document with matching primary key value found

![Replace](/img/replace.jpg)

Tigris TypeScript SDK provides the following two APIs to replace documents
in a collection:

- [insertOrReplaceOne()](../../sdkstools/typescript/database/insert.mdx#replace-a-single-document):
  replace single document
- [insertOrReplaceMany()](../../sdkstools/typescript/database/insert.mdx#replace-multiple-documents):
  batch replace documents

See the language-specific sections for more examples of Replace operations:

- [Replace Document in TypeScript](../../sdkstools/typescript/database/insert.mdx)
- [Replace Document in Go](../../sdkstools/golang/database/insert.mdx)
- [Replace Document in Java](../../sdkstools/java/database/insert.mdx)

## Read Operations

Read operations retrieve documents from a collection. Tigris by default
indexes all the fields of the document allowing you to retrieve documents
matching zero or more conditions on any field.

![Read](/img/findmany.jpg)

Tigris TypeScript SDK provides the following two APIs to read documents
from a collection:

- [findOne()](../../sdkstools/typescript/database/query.mdx#simple-read-query): read a single document
- [findMany()](../../sdkstools/typescript/database/query.mdx#filtering-on-multiple-fields): read
  multiple documents

See the [Filters](filters.md) section to learn more about the filters supported in
read operations.

See the language-specific sections for more examples of Read operations:

- [Read Document in TypeScript](../../sdkstools/typescript/database/query.mdx)
- [Read Document in Go](../../sdkstools/golang/database/query.mdx)
- [Read Document in Java](../../sdkstools/java/database/query.mdx)

## Update Operations

Update operations modify existing documents in a collection. These
operations give you the flexibility to update documents matching conditions on
any field.

![Update](/img/update.jpg)

Tigris TypeScript SDK provides the following API to update documents in a
collection:

- [updateOne()](../../sdkstools/typescript/database/update.mdx#update-one): update one
  document that match the filtering condition
- [updateMany()](../../sdkstools/typescript/database/update.mdx#update-many): update one or more
  documents that match the filtering condition

See the [Filters](filters.md) section to learn more about the filters supported in
update operations.

See the language-specific sections for more examples of Update operations:

- [Update Document in TypeScript](../../sdkstools/typescript/database/update.mdx)
- [Update Document in Go](../../sdkstools/golang/database/update.mdx)
- [Update Document in Java](../../sdkstools/java/database/update.mdx)

## Delete Operations

Delete operations remove documents from a collection. These operations give
you the flexibility to delete documents matching conditions on any field.

![Delete](/img/delete.jpg)

Tigris TypeScript SDK provides the following API to delete documents from a
collection:

- [deleteOne()](../../sdkstools/typescript/database/delete.mdx#delete-one)
- [deleteMany()](../../sdkstools/typescript/database/delete.mdx#delete-many)

See the [Filters](filters.md) section to learn more about the filters supported in
delete operations.

See the language-specific sections for more examples of Delete operations:

- [Delete Document in TypeScript](../../sdkstools/typescript/database/delete.mdx)
- [Delete Document in Go](../../sdkstools/golang/database/delete.mdx)
- [Delete Document in Java](../../sdkstools/java/database/delete.mdx)
