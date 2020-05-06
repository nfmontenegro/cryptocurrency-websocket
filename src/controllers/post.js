async function createPost(req, res, next) {
  try {
    const post = await req.prisma.post.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: 1
          }
        }
      }
    })

    return res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await req.prisma.post.findMany()
    return res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

async function getPost(req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      return res.status(400).json({message: 'Param resource not found'})
    }

    const post = await req.prisma.post.findOne({where: {id}})
    if (post) {
      return res.status(200).json(post)
    } else {
      return res.status(404).json({message: 'Post not found'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost
}
