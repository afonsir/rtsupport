# RethinkDB REQL

- List databases:

```js
r.dbList()
```

- Create **rtsupport** database:

```js
r.dbCreate('rtsupport')
```

- Create **channels**, **users** and **messages** tables:

```js
// channels
r.db('rtsupport').tableCreate('channels')

// users
r.db('rtsupport').tableCreate('users')

// messages
r.db('rtsupport').tableCreate('messages')
```

- Create some indexes:

```js
// channels name
r.db('rtsupport').table('channels')
  .indexCreate('name')

// users name
r.db('rtsupport').table('users')
  .indexCreate('name')

// messages createdAt
r.db('rtsupport').table('messages')
  .indexCreate('createdAt')

// messages channelId
r.db('rtsupport').table('messages')
  .indexCreate('channelId')
```

- List tables:

```js
r.db('rtsupport').tableList()
```

## Basic CRUD operations:

- To insert a record:

```js
// channels
r.db('rtsupport').table('channels')
  .insert({
    name: 'Hardware Support'
  })

// users
r.db('rtsupport').table('users')
  .insert({
    name: 'anonymous'
  })

// messages
r.db('rtsupport').table('messages')
  .insert({
    author: 'Afonso Costa',
    createdAt: r.now(),
    body: 'I need some help...',
    channelId: 'ID'
  })
```

- To list a table records:

```js
// channels
r.db('rtsupport').table('channels')

// users
r.db('rtsupport').table('users')
```

- To update a single record:

```js
r.db('rtsupport').table('users')
  .get('ID')
  .update({
    name: 'Afonso Costa'
  })
```

- To delete a single record:

```js
r.db('rtsupport').table('users')
  .get('ID')
  .delete()
```

## Changefeed

- To create a changefeed:

```js
// in one session (tab)
r.db('rtsupport').table('channels')
  .changes({ includeInitial: true })

// in another session (tab)
r.db('rtsupport').table('channels')
  .insert({
    name: 'Software Support'
  })

r.db('rtsupport').table('channels')
  .get('4dc29588-47b7-40bb-84f5-8e52c57a1a94')
  .update({
    name: 'Critical Software Support'
  })

r.db('rtsupport').table('channels')
  .get('4dc29588-47b7-40bb-84f5-8e52c57a1a94')
  .delete()

```
