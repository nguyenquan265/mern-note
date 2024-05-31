import { Author, Folder, Note, Notification } from '~/models'
import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.toISOString()
    }
  }),
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
    addNote: async (parent, args) => {
      const note = await Note.create(args)

      return note
    },
    updateNote: async (parent, args) => {
      const noteId = args.id
      const note = await Note.findByIdAndUpdate(noteId, args)

      return note
    },
    addFolder: async (parent, args, context) => {
      const folder = await Folder.create({ ...args, authorId: context.uid })

      pubsub.publish('FOLDER_CREATED', {
        folderCreated: {
          message: 'A new folder has been created!'
        }
      })

      return folder
    },
    register: async (parent, args) => {
      const author = await Author.findOne({ uid: args.uid })

      if (!author) {
        const newAuthor = await Author.create(args)

        return newAuthor
      }

      return author
    },
    pushNotification: async (parent, args) => {
      await Notification.create(args)

      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content
        }
      })

      return {
        message: 'SUCCESS'
      }
    }
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator('FOLDER_CREATED')
    },
    notification: {
      subscribe: () => pubsub.asyncIterator('PUSH_NOTIFICATION')
    }
  },
  Folder: {
    author: async (parent) => {
      const { authorId } = parent
      const author = await Author.findOne({ uid: authorId })

      return author
    },
    notes: async (parent) => {
      const notes = await Note.find({
        folderId: parent.id
      }).sort({ updatedAt: -1 })

      return notes
    }
  }
}

export default resolvers
