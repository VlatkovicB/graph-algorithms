const entries = [
  [
    ["a", "c"],
    ["a", "b"],
    ["c", "b"],
    ["c", "d"],
    ["b", "d"],
    ["d", "e"],
    ["e", "g"],
    ["g", "f"],
  ],
  [
    ["c", "n"],
    ["c", "e"],
    ["c", "s"],
    ["c", "w"],
    ["w", "e"],
  ],
]

const toGraph = (list) => {
  const graph = {}
  for (const i of list) {
    graph[i[0]] = [...(graph[i[0]] || []), i[1]]
    graph[i[1]] = [...(graph[i[1]] || []), i[0]]
  }
  return graph
}

const reconstructPath = (path, target) => {
  const order = [target]

  for (let i = path[target]; i.previous !== null; i = path[i.previous]) {
    order.push(i.previous)
  }
  order.reverse()
  return order
}

const bfs = (graph, start) => {
  const queue = [start]
  const nodes = { ...graph }

  Object.keys(graph).forEach((k) => {
    nodes[k] = {}
    nodes[k]["visited"] = false
    nodes[k]["previous"] = null
  })

  nodes[start].visited = true

  while (queue.length) {
    const current = queue.shift()
    for (let i of graph[current]) {
      if (!nodes[i].visited) {
        queue.push(i)
        nodes[i].visited = true
        nodes[i].previous = current
      }
    }
  }

  return nodes
}

const findShortestPath = (list, start, end) => {
  const graph = toGraph(list)
  // console.log(graph, start, end)
  const path = bfs(graph, start)
  return reconstructPath(path, end)
}

for (let i of entries) {
  const result = findShortestPath(i, i[0][0], i[i.length - 1][0])
  console.log(result)
}
