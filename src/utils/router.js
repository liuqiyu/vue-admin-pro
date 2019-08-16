export const getRoutes = (context, ignore) => {
  const children = []
  context.keys().forEach(key => {
    if (key !== ignore) {
      const arr = context(key).default
      if (arr) {
        children.push(arr)
      }
    }
  })
  console.log(children)
  return children
}
