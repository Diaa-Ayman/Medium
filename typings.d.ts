export interface Post {
  _id: string
  _createdAt: string
  description: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
    image: string
  }
  comments: [Com]
  mainImage: {
    asset: {
      url: string
    }
  }
  body: [Object]
}

export interface Com {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _id: string
  _updatedAt: string
}
