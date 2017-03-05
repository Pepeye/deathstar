export const formatError = (error) => {
  console.log(error.message)
  console.log(error.locations)
  console.log(error.stack)

  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack
  }
}

export default { formatError }
