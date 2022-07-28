import { directed_weighted_acylclic_list } from "./example_const.js"
import { PriorityQueue } from "./PriorityQueue.js"
import { toWeightedGraph } from "./util.js"

const dijkstra = (list, start) => {
  const graph = toWeightedGraph(list)
  const pq = new PriorityQueue()
  pq.push(graph[start])
  const visited = new Set([start])

  graph[start].distance = 0

  while (pq.size()) {
    const current = pq.pop()
    for (let { destination, weight } of current.neighbors) {
      graph[destination].distance = Math.min(
        current.distance + weight,
        graph[destination].distance
      )

      if (visited.has(destination)) continue
      visited.add(destination)
      pq.push(graph[destination])
    }
  }
  return graph
}

console.log(dijkstra(directed_weighted_acylclic_list, 0))
