import { getAll, getById, create, updateById, deleteById } from '../store.js'
import { whispers as fixtures, inventedId, existingId } from './fixtures.js'
import { restoreDb, populateDb } from './utils.js'

describe('store', () => {
  restoreDb()
  beforeEach(() => populateDb(fixtures))
  afterAll(restoreDb)

  describe('getAll', () => {
    it("Should return an empty array when there's no data", async () => {
      restoreDb()
      const data = await getAll()
      expect(data).toEqual([])
    })
    it('Should return an array with one item when there is one item', async () => {
      const data = await getAll()
      expect(data).toEqual(fixtures)
    })
  })

  describe('getById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await getById(inventedId)
      expect(item).toBeUndefined()
    })

    it('Should return the item with the given id', async () => {
      const item = await getById(existingId)
      expect(item).toEqual(fixtures[0])
    })
  })

  describe('create', () => {
    it('Should return the created item', async () => {
      const newItem = { id: fixtures.length + 1, message: 'test create' }
      const { id } = await create('test create')
      const item = await getById(id)
      expect(item).toEqual(newItem)
    })

    it('Should create the item in db', async () => {
      const newItem = { id: fixtures.length + 1, message: 'test create' }
      const createdItem = await create(newItem.message)
      const item = await getById(createdItem.id)
      expect(item).toEqual(createdItem)
    })
  })

  describe('updateById', () => {
    const updatedItem = { id: existingId, message: 'updated' }
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await updateById(inventedId)
      expect(item).toBeUndefined()
    })

    it('Should not return the updated data', async () => {
      const item = await updateById(updatedItem.id, updatedItem.message)
      expect(item).toBeUndefined()
    })

    it('Should update the item in the db', async () => {
      await updateById(updatedItem.id, updatedItem.message)
      const item = await getById(existingId)
      expect(item).toEqual(updatedItem)
    })
  })

  describe('deleteById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await deleteById(inventedId)
      expect(item).toBeUndefined()
    })
    it('Should not return the deleted item', async () => {
      const deletedItem = await deleteById(existingId)
      expect(deletedItem).toBeUndefined()
    })
    it('Should delete the item in db', async () => {
      await deleteById(existingId)
      const items = await getAll()
      expect(items).toEqual(fixtures.filter((item) => item.id !== existingId))
    })
  })
})
