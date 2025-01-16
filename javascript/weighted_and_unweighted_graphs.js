class Graph
{
    constructor()
    {
        this.adjacencyList = {};
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
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2])
        {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1); // Remove for directed graphs
        }
    }

    removeEdge(vertex1, vertex2)
    {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2])
        {
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
                (v) => v !== vertex2
            );
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
                (v) => v !== vertex1
            );
        }
    }

    removeVertex(vertex)
    {
        if (this.adjacencyList[vertex])
        {
            for (let adjacentVertex of this.adjacencyList[vertex])
            {
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.adjacencyList[vertex];
        }
    }

    display()
    {
        for (let vertex in this.adjacencyList)
        {
            console.log(`${vertex}: ${this.adjacencyList[vertex].join(', ')}`);
        }
    }
}

class WeightedGraph
{
    constructor()
    {
        this.adjacencyList = {};
    }

    addVertex(vertex)
    {
        if (!this.adjacencyList[vertex])
        {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight)
    {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2])
        {
            this.adjacencyList[vertex1].push({ node: vertex2, weight });
            this.adjacencyList[vertex2].push({ node: vertex1, weight });
        }
    }

    display()
    {
        for (const vertex in this.adjacencyList)
        {
            console.log(
                vertex,
                "->",
                this.adjacencyList[vertex].map((edge) => `${edge.node} (${edge.weight})`)
            );
        }
    }
}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");

console.log("Graph after adding vertices and edges:");
graph.display();

graph.removeEdge("A", "B");
console.log("\nGraph after removing the edge A-B");
graph.display();

graph.removeVertex("D");
console.log("\nGraph after removing the vertex D:");
graph.display();

const weightedGraph = new WeightedGraph();

weightedGraph.addVertex("A");
weightedGraph.addVertex("B");
weightedGraph.addVertex("C");
weightedGraph.addVertex("D");

weightedGraph.addEdge("A", "B", 5);
weightedGraph.addEdge("A", "C", 10);
weightedGraph.addEdge("B", "D", 2);
weightedGraph.addEdge("C", "D", 8);

console.log("Weighted Graph:");
weightedGraph.display();