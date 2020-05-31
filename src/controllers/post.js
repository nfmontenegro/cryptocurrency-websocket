async function createPost(req, res, next) {
  try {
    const userId = req.token.userId
    const post = await req.prisma.post.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    return res.status(201).send(post)
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await req.prisma.post.findMany()
    return res.status(200).send(posts)
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function getUsersPosts(req, res, next) {
  try {
    const userId = req.token.userId
    const posts = await req.prisma.post.findMany({
      where: {
        authorId: userId
      }
    })
    return res.status(200).send(posts)
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function getPost(req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      return res.status(400).send({message: 'Param resource not found'})
    }

    const post = await req.prisma.post.findOne({where: {id}})
    if (post) {
      return res.status(200).send(post)
    } else {
      return res.status(404).send({message: 'Post not found'})
    }
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

module.exports = {
  createPost,
  getUsersPosts,
  getPosts,
  getPost
}
