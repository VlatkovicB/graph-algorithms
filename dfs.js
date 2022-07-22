const graph = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
}

const connectedComponentsCount = (graph) => {
  let count = 0
  const components = []
  const visited = []

  for (let [k, v] of Object.entries(graph)) {
    k = parseInt(k)
    if (!visited[k]) {
      count++
      dfs(graph, k, visited, components, count)
    }
  }

  return Math.max(...components.filter(Boolean))
}

const dfs = (graph, node, visited, components, count) => {
  node = parseInt(node)
  visited[node] = true
  components[node] = count
  for (const i of graph[node]) {
    if (!visited[i]) dfs(graph, parseInt(i), visited, components, count)
  }
}

console.log(connectedComponentsCount(graph))
