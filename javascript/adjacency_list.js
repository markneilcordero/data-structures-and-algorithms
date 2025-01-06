class Graph
{
    constructor()
    {
        this.adjacencyList = {}; // Object to store the adjacency list
    }

    addNode(node)
    {
        if (!this.adjacencyList[node])
        {
            this.adjacencyList[node] = []; // Initialize an empty array for neighbors
            console.log(`Node "${node}" added.`);
        }
        else
        {
            console.log(`Node "${node}" already exists.`);
        }
    }
    
    addEdge(node1, node2)
    {
        if (this.adjacencyList[node1] && this.adjacencyList[node2])
        {
            this.adjacencyList[node1].push(node2);
            this.adjacencyList[node2].push(node1); // Since this is an undirected graph
            console.log(`Edge added between "${node1}" and "${node2}".`);
        }
        else
        {
            console.log(`One or both nodes "${node1}" and "${node2}" do not exist.`);
        }
    }

    printGraph()
    {
        console.log("\n-- Adjacency List --");
        for (const node in this.adjacencyList)
        {
            console.log(`${node}: ${this.adjacencyList[node].join(", ")}`);
        }
    }

    hasEdge(node1, node2)
    {
        return (
            this.adjacencyList[node1] &&
            this.adjacencyList[node2] &&
            this.adjacencyList[node1].includes(node2)
        );
    }

    getNeighbors(node)
    {
        if (this.adjacencyList[node])
        {
            return this.adjacencyList[node];
        }
        return null; // Node not found
    }

    removeEdge(node1, node2)
    {
        if (this.hasEdge(node1, node2))
        {
            this.adjacencyList[node1] = this.adjacencyList[node1].filter(
                (neighbor) => neighbor !== node2
            );
            this.adjacencyList[node2] = this.adjacencyList[node2].filter(
                (neighbor) => neighbor !== node1
            );
            console.log(`Edge between "${node1}" and "${node2}" removed.`);
        }
        else
        {
            console.log(`No edge exists between "${node1}" and "${node2}".`);
        }
    }

    removeNode(node)
    {
        if (this.adjacencyList[node])
        {
            for (const neighbor of this.adjacencyList[node])
            {
                this.adjacencyList[neighbor] = this.adjacencyList[neighbor].filter(
                    (n) => n !== node
                );
            }
            delete this.adjacencyList[node];
            console.log(`Node "${node}" and all its edges removed.`);
        }
        else
        {
            console.log(`Node "${node}" does not exist.`);
        }
    }

    depthFirstSearch(startNode)
    {
        const visited = new Set();
        const dfsHelper = (node) => {
            if (!node || visited.has(node)) return;
            console.log(node);
            visited.add(node);
            for (const neighbor of this.adjacencyList[node])
            {
                dfsHelper(neighbor);
            }
        };
        console.log(`\n-- DFS from "${startNode}" --`);
        dfsHelper(startNode);
    }

    breadthFirstSearch(startNode)
    {
        const visited = new Set();
        const queue = [startNode];
        console.log(`\n-- BFS from "${startNode}" --`);
        while (queue.length > 0)
        {
            const node = queue.shift();
            if (!visited.has(node))
            {
                console.log(node);
                visited.add(node);
                for (const neighbor of this.adjacencyList[node])
                {
                    if (!visited.has(neighbor)) queue.push(neighbor);
                }
            }
        }
    }
}

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

graph.printGraph();

console.log(`Edge exists between "A" and "B": ${graph.hasEdge("A", "B")}`);
console.log(`Edge exists between "A" and "D": ${graph.hasEdge("A", "D")}`);

console.log(`Neighbors of "A": ${graph.getNeighbors("A")}`);

graph.removeEdge("A", "C");
graph.printGraph();

graph.removeNode("D");
graph.printGraph();

graph.depthFirstSearch("A");

graph.breadthFirstSearch("A");