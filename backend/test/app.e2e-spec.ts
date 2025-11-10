import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('App (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('/ (GET)', () => {
    it('should return API info', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message')
        })
    })
  })

  describe('/movies/search (GET)', () => {
    it('should search movies', () => {
      return request(app.getHttpServer())
        .get('/movies/search?s=batman')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('Search')
          expect(Array.isArray(res.body.Search)).toBe(true)
        })
    })

    it('should handle empty search', () => {
      return request(app.getHttpServer())
        .get('/movies/search?s=')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('Search')
        })
    })
  })

  describe('/auth/register (POST)', () => {
    it('should register a new user', () => {
      const userData = {
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test User',
      }

      return request(app.getHttpServer())
        .post('/auth/register')
        .send(userData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('message')
        })
    })

    it('should reject invalid email', () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      }

      return request(app.getHttpServer())
        .post('/auth/register')
        .send(userData)
        .expect(400)
    })
  })

  describe('/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      // First register a user
      const userData = {
        email: `login-test${Date.now()}@example.com`,
        password: 'password123',
        name: 'Login Test User',
      }

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(userData)

      // Then try to login
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken')
          expect(res.body).toHaveProperty('user')
        })
    })

    it('should reject invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        })
        .expect(401)
    })
  })

  describe('/graphql (POST)', () => {
    it('should handle GraphQL queries', () => {
      const query = `
        query {
          movies(search: "batman") {
            imdbID
            Title
            Year
          }
        }
      `

      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data')
        })
    })
  })
})