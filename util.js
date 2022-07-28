export const toWeightedGraph = (list) => {
  const graph = {}
  list.forEach((edge) => {
    const [src, destination, weight] = edge
    graph[src] = {
      neighbors: [
        ...(graph[src] ? graph[src].neighbors : [] || []),
        { destination, weight },
      ],
      distance: Infinity,
    }
    graph[destination] = {
      neighbors: [
        ...(graph[destination] ? graph[destination].neighbors : [] || []),
      ],
      distance: Infinity,
    }
  })
  return graph
}
