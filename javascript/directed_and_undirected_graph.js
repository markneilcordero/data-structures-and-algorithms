class Graph
{
    constructor(isDirected = false)
    {
        this.adjacencyList = {};
        this.isDirected = isDirected;
    }

    addVertex(vertex)
    {
        if (!this.adjacencyList[vertex])
        {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2)
    {
        if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
        if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);

        this.adjacencyList[vertex1].push(vertex2);
        if (!this.isDirected)
        {
            this.adjacencyList[vertex2].push(vertex1);
        }
    }

    removeEdge(vertex1, vertex2)
    {
        if (this.adjacencyList[vertex1])
        {
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
                (v) => v !== vertex2
            );
        }
        if (!this.isDirected && this.adjacencyList[vertex2])
        {
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
                (v) => v !== vertex1
            );
        }
    }

    removeVertex(vertex)
    {
        if (this.adjacencyList[vertex])
        {
            for (let neighbor of this.adjacencyList[vertex])
            {
                this.removeEdge(neighbor, vertex);
            }
            delete this.adjacencyList[vertex];
        }
    }

    displayGraph()
    {
        console.log("Graph:");
        for (let vertex in this.adjacencyList)
        {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
        }
    }

    edgeExists(vertex1, vertex2)
    {
        return this.adjacencyList[vertex1]?.includes(vertex2) || false;
    }

    getNeighbors(vertex)
    {
        return this.adjacencyList[vertex] || [];
    }

    dfs(startVertex, visited = new Set())
    {
        visited.add(startVertex);
        console.log(startVertex);

        for (let neighbor of this.adjacencyList[startVertex])
        {
            if (!visited.has(neighbor))
            {
                this.dfs(neighbor, visited);
            }
        }
    }

    bfs(startVertex)
    {
        const visited = new Set();
        const queue = [startVertex];

        visited.add(startVertex);

        while (queue.length > 0) 
        {
            const current = queue.shift();
            console.log(current);

            for (let neighbor of this.adjacencyList[current])
            {
                if (!visited.has(neighbor))
                {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
}

const graph = new Graph(true);
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("A", "C");

console.log("Graph Representation:");
graph.displayGraph();

console.log("\nDFS Traversal:");
graph.dfs("A");

console.log("\nBFS Traversal:");
graph.bfs("A");

console.log("\nEdge exists between A and B:", graph.edgeExists("A", "B"));
console.log("Neighbors of B:", graph.getNeighbors("B"));

console.log("\nRemoving edge B -> C...");
graph.removeEdge("B", "C");
graph.displayGraph();

console.log("\nRemoving vertex B...");
graph.removeVertex("B");
graph.displayGraph();