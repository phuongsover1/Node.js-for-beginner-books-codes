import supertest from 'supertest'
import { app } from '../server'
import { restoreDb, populateDb, getFixtures, ensureDbConnection, closeDbConnection } from './utils.js'
import { getById } from '../store'

let whispers
let inventedId
let existingId
let firstItem

describe('Server', () => {
  beforeAll(ensureDbConnection)
  beforeEach(async () => {
    await restoreDb()
    await populateDb()
    const fixtures = await getFixtures()
    whispers = fixtures.whispers
    inventedId = fixtures.inventedId
    existingId = fixtures.existingId
    firstItem = fixtures.firstItem
  })
  afterAll(closeDbConnection)
  describe('GET /api/v1/whisper', () => {
    it("Should return an empty array when there's no data", async () => {
      await restoreDb()
      const response = await supertest(app).get('/api/v1/whisper')
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
    it('Should return all the whispers', async () => {
      const response = await supertest(app).get('/api/v1/whisper')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(whispers)
    })
  })
  describe('GET /api/v1/whisper/:id', () => {
    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await supertest(app).get(`/api/v1/whisper/${inventedId}`)
      expect(response.status).toBe(404)
    })
    it('Should return a whisper details', async () => {
      const response = await supertest(app).get(`/api/v1/whisper/${existingId}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(firstItem)
    })
  })
  describe('POST /api/v1/whisper', () => {
    it('Should return a 400 when the body is empty', async () => {
      const response = await supertest(app)
        .post('/api/v1/whisper')
        .send({})
      expect(response.status).toBe(400)
    })
    it('Should return a 400 when the body is invalid', async () => {
      const response = await supertest(app)
        .post('/api/v1/whisper')
        .send({ invented: 'This is a new whisper' })
      expect(response.status).toBe(400)
    })
    it('Should return a 201 when the whisper is created', async () => {
      const newWhisper = { message: 'This is a new whisper' }
      const response = await supertest(app)
        .post('/api/v1/whisper')
        .send({ message: newWhisper.message })

      // HTTP Response
      expect(response.status).toBe(201)
      expect(response.body.message).toEqual(newWhisper.message)
    })
  })
  describe('PUT /api/v1/whisper/:id', () => {
    it('Should return a 400 when the body is empty', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${existingId}`)
        .send({})
      expect(response.status).toBe(400)
    })
    it('Should return a 400 when the body is invalid', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${existingId}`)
        .send({ invented: 'This a new field' })
      expect(response.status).toBe(400)
    })
    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${inventedId}`)
        .send({ message: 'Whisper updated' })
      expect(response.status).toBe(404)
    })
    it('Should return a 200 when the whisper is updated', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${existingId}`)
        .send({ message: 'Whisper updated' })
      expect(response.status).toBe(200)

      // Database changes
      const storedWhisper = await getById(existingId)
      expect(storedWhisper).toStrictEqual({ id: existingId, message: 'Whisper updated' })
    })
  })
  describe('DELETE /api/v1/whisper/:id', () => {
    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await supertest(app).delete(`/api/v1/whisper/${inventedId}`)
      expect(response.status).toBe(404)
    })
    it('Should return a 200 when the whisper is deleted', async () => {
      const response = await supertest(app).delete(`/api/v1/whisper/${existingId}`)
      expect(response.status).toBe(200)

      // Database changes
      const storedWhisper = await getById(existingId)
      expect(storedWhisper).toBeUndefined()
    })
  })
})
