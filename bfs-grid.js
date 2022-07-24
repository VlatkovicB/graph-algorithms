const example = [
  ["S", ".", ".", "#", ".", ".", "."],
  [".", "#", ".", ".", ".", "#", "."],
  [".", "#", ".", ".", ".", ".", "."],
  [".", ".", "#", "#", ".", ".", "."],
  ["#", ".", "#", "E", ".", "#", "."],
]

// UNUSED
const bfsMatrix = (map = [[]], start, end) => {
  const dr = [-1, 1, 0, 0]
  const cr = [0, 0, 1, -1]
  const rowNumber = map.length
  const columnNumber = map[0].length

  for (let row = start[0]; row < map.length; row++) {
    for (let column = start[1]; column < map[row].length; column++) {
      for (i = 0; i < 4; i++) {
        const neighborRow = row + dr[i]
        const neighborColumn = column + cr[i]

        if (neighborRow < 0 || neighborColumn < 0) continue
        if (neighborRow >= rowNumber || neighborColumn >= columnNumber) continue

        if (row === end[0] && column === end[1]) return nodes
      }
    }
  }
}

const bfs = (graph, start) => {
  const queue = [start]

  while (queue.length) {
    const current = graph[queue.shift()]
    current.visited = true
    for (let neighbor of current.neighbours) {
      const next = graph[neighbor]

      if (next.isWall) {
        next.isVisited = true
        continue
      }

      if (!next.visited) {
        queue.push(neighbor)
        next.previous = current.key
        next.visited = true
      }

      if (next.isEnd) {
        return graph
      }
    }
  }

  return graph
}

const findShortestPath = (map, start, end) => {
  const adjacencyList = graphToAL(map)

  const path = bfs(adjacencyList, start, end)
  return reconstructPath(path, end).map((e) => e.key)
}

const graphToAL = (map) => {
  const nodes = {}

  let counter = 0
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map[row].length; column++) {
      const cell = map[row][column]
      nodes[counter] = {
        key: counter,
        visited: false,
        previous: null,
        isStart: cell === "S",
        isWall: cell === "#",
        isEnd: cell === "E",
        neighbours: getNeighbours(map, counter),
      }
      counter++
    }
  }

  return nodes
}

const getNeighbours = (map, counter) => {
  const totalNodes = map[0].length * map.length - 1
  const columnLength = map[0].length

  return [
    ...(counter - columnLength < 0 ? [] : [counter - columnLength]),
    ...(counter - 1 < 0 || (counter - 1) % 7 === 6 ? [] : [counter - 1]),
    ...(counter + 1 > totalNodes || (counter + 1) % 7 === 0
      ? []
      : [counter + 1]),
    ...(counter + columnLength > totalNodes ? [] : [counter + columnLength]),
  ]
}

const reconstructPath = (map, end) => {
  const path = []

  for (let node = map[end]; node.previous !== null; node = map[node.previous]) {
    path.push(node)
  }

  path.reverse()

  if (path[0] && map[path[0].previous].isStart) {
    return [map[0], ...path]
  }
  return []
}

console.log(findShortestPath(example, 0, 31))
