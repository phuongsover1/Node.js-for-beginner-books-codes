import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Whisper } from '../database.js'
import mongoose from 'mongoose'

const ensureDbConnection = async () => {
    try {
        if (mongoose.connect.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI)
        }
    } catch (error) {
        console.error('Error connecting to database:', error)
        throw error; // Re-throw the error for handling at a higher level
    }
}

const closeDbConnection = async () => {
    if (mongoose.connect.readyState === 1) {
        await mongoose.disconnect()
    }
}
const restoreDb = () => Whisper.deleteMany({})
const populateDb = () => Whisper.insertMany([{ message: 'test1' }, { message: 'test2' }])
const getFixtures = async () => {
    const data = await Whisper.find()
    const whispers = JSON.parse(JSON.stringify(data))
    const inventedId = '64e0e5c75a4a3c715b7c1074'
    const existingId = whispers[0]?.id
    const firstItem = whispers[0]
    return { inventedId, existingId, whispers, firstItem }
}

const normalize = data => JSON.parse(JSON.stringify(data))

export { restoreDb, populateDb, getFixtures, normalize, ensureDbConnection, closeDbConnection }
