import { directed_acyclic_graph } from "./example_const.js"

const topologicalOrder = (graph) => {
  // Easy way O(n^2)
  // while (Object.keys(graph).length) {
  //   Object.keys(graph).forEach((key) => {
  //     if (!graph[key].length) {
  //       top.push(key)
  //       delete graph[key]

  //       Object.keys(graph).forEach((e) => {
  //         graph[e] = graph[e].filter((v) => v !== key)
  //       })
  //     }
  //   })
  // }

  const top = []
  const visited = new Set()

  for (let i of Object.keys(graph)) {
    if (!visited.has(i)) {
      dfs(graph, i, visited, top)
    }
  }
  return top.reverse()
}

const dfs = (graph, start, visited, top) => {
  visited.add(start)
  for (let i of graph[start]) {
    if (!visited.has(i)) {
      dfs(graph, i, visited, top)
    }
  }
  top.push(start)
}

console.log(topologicalOrder(directed_acyclic_graph))
