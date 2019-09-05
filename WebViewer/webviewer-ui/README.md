This is a boilerplate that includes:

- docker that start:
  - ubuntu with npm
  - couchdb.
- validation with format:

```
{
    name: "required,notempty",
    type: "exists|sampleType",
    parent: "exists|sample"
  },
```
- PouchDb utils functions to:
  * get/add/update/delete data from pouchdb
  * Get and Delete data with relational fields. e.g. {name:'name', relation: ["idOfTheRelation"] } will get the relation with that id.
- Seeder samples
- Redux and redux-thunk included
- Routes

Easy:

```
npm install
npm start
```
