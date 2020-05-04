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

module.exports = {
  createPost
}
