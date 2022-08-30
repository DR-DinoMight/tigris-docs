# Schema

A schema defines all the fields that make up the document in a collection.
Tigris follows the schema as per the JSON schema [specification](https://json-schema.org/specification.html).

## Specification

As per the specifications, the schema has three required keywords which are expressed as JSON keys:

- **title**: This keyword states the name of the collection.
- **description**: This keyword states the purpose of the collection.
- **properties**: This keyword states the fields that make up the document
  stored in the collection.

Let's take the example of a collection of user documents. A user document
has the following fields:

- An identifier with auto-generated values: `id`
- The name of the user which can have a maximum length of 100 characters: `name`
- The user's account balance: `balance`

Sample schema:

```json
{
  "title": "users",
  "description": "Collection of documents with details of users",
  "properties": {
    "id": {
      "description": "A unique identifier for the user",
      "type": "integer",
      "autoGenerate": true
    },
    "name": {
      "description": "Name of the user",
      "type": "string",
      "maxLength": 100
    },
    "balance": {
      "description": "User account balance",
      "type": "number"
    }
  },
  "primary_key": ["id"]
}
```

### Properties

As shown in the schema above there are three fields that make up the user
document. These fields are defined as part of the properties.

The fields must have **type** defined. For certain data types, the fields can optionally
have **autoGenerate** JSON key which specifies that the values for the field are automatically generated by
Tigris.

### Data types

The data types are derived from the types defined in the JSON schema
[specification](https://json-schema.org/specification.html).

The `type` and `format` properties in schemas are used to determine the
data type of the field. The `type` property indicates the type of the field.
The `format` property provides additional information about the underlying type.
Fields will always have a `type` property, but some may also have a `format`
property. The JSON schema
[specification](https://json-schema.org/specification.html) already defines
a set of common formats. We support these formats and define others as well.

For optimal performance and efficient data layout, we also impose some
restrictions on what data types can be used for primary key fields.

The full list of supported `type` and `format` are listed below.

:::tip
Note that the [client libraries](/category/client-libraries) that we provide
use language-idiomatic types for the types and formats below. For example,
while a 64-bit integer is represented as type _integer_ in JSON requests and
responses, but our Java client library uses the Java _long_ type.

:::

| Type    | Format    | Description                                                                                                                      | Supported for Key Fields | Supported for autoGenerate |
| ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------- |
| integer |           | A 64-bit integral number. Optionally, format can be specified as `int64`.                                                        | Yes                      | Yes                        |
| integer | int32     | A 32-bit integral number.                                                                                                        | Yes                      | Yes                        |
| number  |           | A double-precision 64-bit IEEE 754 floating point. Optionally, format can be specified as `double`.                              | No                       | No                         |
| number  | float     | A single-precision 32-bit IEEE 754 floating point.                                                                               | No                       | No                         |
| string  |           | An arbitrary string. It may contain Unicode characters.                                                                          | Yes                      | Yes                        |
| string  | byte      | Binary data in an undifferentiated byte stream.                                                                                  | Yes                      | Yes                        |
| string  | uuid      | Universally unique identifiers (UUIDs). UUIDs are 16-byte numbers used to uniquely identify records.                             | Yes                      | Yes                        |
| string  | date-time | An RFC3339 timestamp in UTC time. This in the format of yyyy-MM-ddTHH:mm:ss.SSSZ. The milliseconds portion (".SSS") is optional. | Yes                      | Yes                        |
| boolean |           | A boolean value, either "true" or "false".                                                                                       | No                       | No                         |
| array   |           | An array of values. The items property indicates the schema for the array values.                                                | No                       | No                         |
| object  |           | A container type that stores other fields. The properties key defines the schema for the object.                                 | No                       | No                         |

## Validation

The schema validation happens on all write operations to ensures documents conforms to the collection schema. Tigris
rejects these write requests that violates this validation criteria. The validation logic will always use the newest
schema version. The schema validation during write allows Tigris to optimize reads and skip any validations.

## Null Values

`null` is an allowed value that can be used with any of the fields in the
schema except for the ones that are part of the primary key definition. If a
field is set to the null value, then the document stored in the database
will have that field set to the null value. If you are looking for the
behavior where you would like fields without any values to not be stored as
part of the document, then simply skip setting them to any value.

## Normalized Data Model

Rich schemas allows you to design your schema in multiple ways. Sometimes there is a need to be flexible in the design
and needed to store collections with simple one-to-one relationship.

```shell
# Collection A
{
  "user_id": 1,
  "name": "janice",
  "balance": 99
}

# Collection B
{
  "membership_id": 123,
  "user_id": 1
}
```

## Embedded Data Model

Tigris offers rich documents that enable embedding related data in a single
document. Embedded models allow applications to complete database operations
with fewer queries or updates, thus reducing query activity and increasing
efficiency. Following examples demonstrate a collection that leverages this pattern by
storing related data in a single data model.

```json
{
  "id": 1,
  "name": "janice",
  "balance": 99,
  "product_items": [{ "name": "shoes", "quantity": 1, "price": 201 }]
}
```