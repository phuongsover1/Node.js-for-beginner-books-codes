import supertest from 'supertest'
import { app } from '../server'
import { restoreDb, populateDb } from './utils'
import { whispers, inventedId, existingId } from './fixtures'
import { getAll, getById, updateById } from '../store'

describe('Server', () => {
  beforeEach(() => populateDb(whispers))
  afterAll(restoreDb)

  describe('GET /api/v1/whisper', () => {
    it("Should return an empty array when there's no data", async () => {
      await restoreDb() // empty the db
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
    it('Should return whisper details with the given id', async () => {
      const response = await supertest(app).get(`/api/v1/whisper/${existingId}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(whispers.find((w) => w.id === existingId))
    })

    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await supertest(app).get(`/api/v1/whisper/${inventedId}`)
      expect(response.status).toBe(404)
    })
  })

  describe('POST /api/v1/whisper', () => {
    it('Should return 404 when the body is invalid', async () => {
      const response = await supertest(app).post('/api/v1/whisper').send({})
      expect(response.status).toBe(400)
    })

    it('Should return 201 when the whisper is created', async () => {
      const newWhisper = { id: whispers.length + 1, message: 'test created' }
      const response = await supertest(app)
        .post('/api/v1/whisper')
        .send({ message: newWhisper.message })
      // HTTP Responses
      expect(response.status).toBe(201)
      expect(response.body).toEqual(newWhisper)

      // Database changes
      const storedWhisper = await getById(newWhisper.id)
      expect(storedWhisper).toStrictEqual(newWhisper)
    })
  })

  describe('PUT /api/v1/whisper/:id', () => {
    it('Should update the whisper in db which the given id', async () => {
      const updated = { id: existingId, message: 'updated' }
      const response = await supertest(app)
        .put(`/api/v1/whisper/${updated.id}`)
        .send({ message: updated.message })
      expect(response.status).toBe(200)

      // Check update in db
      const item = await getById(existingId)
      expect(item).toStrictEqual(updated)
    })

    it('Should return error 400 when the body is empty', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${existingId}`)
        .send({})
      expect(response.status).toBe(400)
    })
    it('Should return error 400 when the body is invalid', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${existingId}`)
        .send({ invented: 'This is a new whisper' })
      expect(response.status).toBe(400)
    })

    it('Should return error 404 when the given id is not exist', async () => {
      const response = await supertest(app)
        .put(`/api/v1/whisper/${inventedId}`)
        .send({ message: 'updated' })

      expect(response.status).toBe(404)
    })
  })

  describe('DELETE /api/v1/whisper/:id', () => {
    it('Should delete the whisper in db', async () => {
      const response = await supertest(app).delete(
        `/api/v1/whisper/${existingId}`
      )
      expect(response.status).toBe(200)

      // Check whether the whisper in db is deleted
      const whisper = await getById(existingId)
      expect(whisper).toBeUndefined()
    })

    it('Should return error 404 when the given id is not exist', async () => {
      const response = await supertest(app).delete(
        `/api/v1/whisper/${inventedId}`
      )
      expect(response.status).toBe(404)
    })
  })
})
