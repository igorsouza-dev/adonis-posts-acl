# A Posts API made with Adonis and ACL

## Adonis ACL

### Setting up

Firs install the library:

`$ adonis install adonis-acl`

Edit `app.js` and add the following lines:

```
const providers = [
  ...
  'adonis-acl/providers/AclProvider'
]

const aceProviders = [
  ...
  'adonis-acl/providers/CommandsProvider'
]

const aliases = {
  ...
  Role: 'Adonis/Acl/Role',
  Permission: 'Adonis/Acl/Permission'
}
```

Add the middlewares in the `kernel.js`:

```
const globalMiddleware = [
  ...
  'Adonis/Acl/Init'
]
const namedMiddleware = {
  ...
  is: 'Adonis/Acl/Is',
  can: 'Adonis/Acl/Can'
}
```

Atdd the following function to the model `User.js`:

```
  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }
```

Now, run the command:

`$ adonis acl:setup`

This will create the necessary migrations. Now run:

`$ adonis migration:run`
