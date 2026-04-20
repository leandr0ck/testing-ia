import { Hono } from 'hono'
import users from './routes/users'
import tenants from './routes/tenants'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!',
    endpoints: {
      users: '/users',
      tenants: '/tenants',
    },
  })
})

app.use('/tenants/*', async (c, next) => {
  const workspace = c.req.header('x-workspace')

  if (!workspace) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  await next()
})

app.route('/users', users)
app.route('/tenants', tenants)

export default app
