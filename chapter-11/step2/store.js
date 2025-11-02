import fs from 'node:fs/promises'
import path from 'node:path'
import { Whisper } from './database.js'

const filename = path.join(process.cwd(), 'db.json')

const saveChanges = data => fs.writeFile(filename, JSON.stringify(data))

const readData = async () => {
  const data = await fs.readFile(filename, 'utf-8')
  return JSON.parse(data)
}

const getAll = async () => Whisper.find();

const getById = async (id) => Whisper.findById({ _id: id })

const create = async (message) => {
  const whisper = new Whisper({ message })
  await whisper.save()
  return whisper
}

const updateById = async (id, message) =>
  Whisper.findOneAndUpdate({ _id: id }, { message }, { new: false })

const deleteById = async id => Whisper.findOneAndDelete({ _id: id })

export { getAll, getById, create, updateById, deleteById }
