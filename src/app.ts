import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from 'process';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { usersRoutes } from './http/services/users/routes';
import { equipmentsRoutes } from './http/services/equipments/routes';
export const app = fastify();

//@ts-ignore
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed:false,
  },
  sign:{
    expiresIn:'1d'
  }
});
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(equipmentsRoutes)

app.setErrorHandler((error, _, res) => {
  if(error instanceof ZodError) {
    res.status(400).send({message: 'Validation error', issues: error.format()})
  }else{
    if(env.NODE_ENV !== 'production') {
      console.error(error)
    }else{
      //TODO: Send error to monitoring service.
    }

    return res.status(500).send({message: 'Erro interno.'})
  }
})