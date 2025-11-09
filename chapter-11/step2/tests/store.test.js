import { getAll, getById, create, updateById, deleteById } from '../store.js'
import { restoreDb, populateDb, getFixtures, ensureDbConnection, closeDbConnection, normalize } from './utils.js'
// import { whispers, inventedId, existingId } from './fixtures.js'
let inventedId
let existingId
let whispers
let firstItem;

describe('store', () => {
  beforeAll(ensureDbConnection)
  beforeEach(async () => {
    await restoreDb()
    await populateDb()
    const fixtures = await getFixtures()
    inventedId = fixtures.inventedId
    existingId = fixtures.existingId
    whispers = fixtures.whispers
    firstItem = fixtures.firstItem
  })
  afterAll(closeDbConnection)
  describe('getAll', () => {
    it("Should return an empty array when there's no data", async () => {
      await restoreDb() // empty the db
      const data = await getAll()
      expect(data).toEqual([])
    })
    it('Should return an array with one item when there is one item', async () => {
      const data = await getAll()
      expect(data.length).toBe(2)
      expect(data[0].message).toEqual('test1')
      expect(data[1].message).toEqual('test2')
    })
  })
  describe('getById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      await restoreDb() // empty the db
      const item = await getById(inventedId)
      expect(item).toBe(null)
    })
    it('Should return the item with the given id', async () => {
      const item = await getById(existingId)
      expect(normalize(item)).toEqual(whispers[0])
    })
  })
  describe('create', () => {
    it('Should return the created item', async () => {
      const newItem = { message: 'test 3' }
      const item = await create(newItem.message)
      expect(normalize(item).message).toEqual(newItem.message)
    })
    it('Should add the item to the db', async () => {
      const newItem = { message: 'test 3' }
      const { id } = await create(newItem.message)
      const item = await getById(id)
      expect(normalize(item).message).toEqual(newItem.message)
    })
  })
  describe('updateById', () => {
    it('Should not return the updated item because id does not exist', async () => {
      const updatedItem = { id: inventedId, message: 'updated' }
      const item = await updateById(updatedItem.id, updatedItem.message)
      expect(item).toBeNull()
    })
    it('Should update the item in the db', async () => {
      const updatedItem = { id: existingId, message: 'updated' }
      await updateById(updatedItem.id, updatedItem.message)
      const item = await getById(existingId)
      expect(normalize(item)).toEqual(updatedItem)
    })
  })
  describe('deleteById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await deleteById(inventedId)
      expect(item).toBeNull()
    })
    it('Should delete the item from the db and return the deleted item', async () => {
      const item = await deleteById(existingId)
      expect(normalize(item)).toEqual(firstItem)
    })
  })
})
