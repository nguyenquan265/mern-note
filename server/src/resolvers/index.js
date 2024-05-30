import fakeData from '~/fakeData'
import { Author, Folder, Note } from '~/models'

const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await Folder.find({
        authorId: context.uid
      }).sort({ createdAt: -1 })

      return folders
    },
    folder: async (parent, args) => {
      const { folderId } = args
      const folder = await Folder.findById(folderId)

      return folder
    },
    note: async (parent, args) => {
      const { noteId } = args
      const note = await Note.findById(noteId)

      return note
    }
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const folder = await Folder.create({ ...args, authorId: context.uid })

      return folder
    },
    register: async (parent, args) => {
      const author = await Author.findOne({ uid: args.uid })

      if (!author) {
        const newAuthor = await Author.create(args)

        return newAuthor
      }

      return author
    }
  },
  Folder: {
    author: async (parent, args) => {
      const { authorId } = parent
      const author = await Author.findOne({ uid: authorId })

      return author
    },
    notes: async (parent, args) => {
      const notes = await Note.find({
        folderId: parent.id
      }).sort({ createdAt: -1 })

      return notes
    }
  }
}

export default resolvers
