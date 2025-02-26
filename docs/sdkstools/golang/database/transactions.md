# Transactions

Tigris provides global, ACID transactions with strict serializability
using optimistic concurrency control. The transactions allow multiple
clients to concurrently read and write data in the database with strong
consistency guarantees.

Transactions in Tigris work across collections and documents without any
restrictions. Unlike some other document databases, there are no confusing
read or write concerns to configure, and no cross-shard caveats.

Let say you have a use-case of managing user accounts and there are cases when you need to move money from one
account to another atomically. The following example explains how you can use transactional functionality of Tigris to
substract 100 from user one and move it to user two.

```go
type User struct {
    Id int `tigris:"primary_key,autoGenerate"`
    Name    string
    Balance float64
}

// When the closure returns no error, the changes from all the operations
// executed in it will be committed as a transaction.
// If the closure returns an error, the changes from the operations are
// rolled back.
db.Tx(ctx, func(txCtx context.Context) error {
    var userOne *User
    if userOne, err = users.ReadOne(txCtx, filter.Eq("Id", 1)); err != nil {
        return err
    }

    var userTwo *User
    if userTwo, err = users.ReadOne(txCtx, filter.Eq("Id", 2)); err != nil {
        return err
    }

    if _, err = users.Update(txCtx, filter.Eq("Id", 1),
        fields.Set("Balance", userOne.Balance-100)); err != nil {
        return err
    }
    if _, err = users.Update(txCtx, filter.Eq("Id", 2),
        fields.Set("Balance", userTwo.Balance+100)); err != nil {
        return err
    }

    return nil
})
```
