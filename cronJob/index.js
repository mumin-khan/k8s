const pg = require('pg-promise')
const pgp = pg()
const db = pgp(`postgres://postgres:example@postgres-svc:5432/postgres`)
const todo = async ()=>{
const response = await fetch("https://en.wikipedia.org/wiki/Special:Random",{ redirect: 'manual' })

const link = response.headers.get('location')
await db.none(`INSERT INTO todo_list (task) VALUES('${link}');`)

}

todo()