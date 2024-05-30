export default {
  authors: [
    {
      id: 1,
      name: 'Author 1'
    },
    {
      id: 2,
      name: 'Author 2'
    }
  ],
  folders: [
    {
      id: '1',
      name: 'Folder 1',
      createdAt: '2021-09-01',
      authorId: 1
    },
    {
      id: '2',
      name: 'Folder 2',
      createdAt: '2021-09-02',
      authorId: 1
    },
    {
      id: '3',
      name: 'Folder 3',
      createdAt: '2021-09-03',
      authorId: 2
    }
  ],
  notes: [
    {
      id: '1',
      content: '<p>go to supermarket</p>',
      folderId: '1'
    },
    {
      id: '2',
      content: '<p>go to bank</p>',
      folderId: '1'
    },
    {
      id: '3',
      content: '<p>go to gym</p>',
      folderId: '2'
    },
    {
      id: '4',
      content: '<p>go to library</p>',
      folderId: '2'
    },
    {
      id: '5',
      content: '<p>go to school</p>',
      folderId: '3'
    },
    {
      id: '6',
      content: '<p>go to church</p>',
      folderId: '3'
    }
  ]
}
