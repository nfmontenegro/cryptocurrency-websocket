const paginate = (pageNumber, limitNumber) => {
  const page = parseInt(pageNumber) || 0
  const limit = parseInt(limitNumber) || 10
  const skipPerPage = page * limit

  return {
    orderBy: 'email_ASC',
    first: limit,
    skip: skipPerPage
  }
}

const buildConnectionResponse = ({edges, pageInfo}) => {
  const nodes = edges.map(edge => edge.node)
  const {hasNextPage, hasPreviousPage} = pageInfo

  return {
    hasNextPage,
    hasPreviousPage,
    data: nodes
  }
}

module.exports = {paginate, buildConnectionResponse}
