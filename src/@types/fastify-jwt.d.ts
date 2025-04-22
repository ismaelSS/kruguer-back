import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface fastifyJwt {

    user: {
      role: 'ADMIN' | 'CLIENT' | 'MASTER'
      sub: string
    }
  }
}