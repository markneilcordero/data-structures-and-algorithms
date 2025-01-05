class Graph
{
    constructor(size)
    {
        this.size = size; // Number of vertices
        this.matrix = Array.from({ length: size }, () => Array(size).fill(0)); // Initialize a size x size matrix with 0   
    }

    addEdge(u, v)
    {
        if (u >= this.size || v >= this.size)
        {
            console.log("Invalid vertex.");
            return;
        }
        this.matrix[u][v] = 1;
        this.matrix[v][u] = 1; // For undirected graph
        console.log(`Edge added between vertex ${u} and vertex ${v}`);
    }

    removeEdge(u, v)
    {
        if (u >= this.size || v >= this.size)
        {
            console.log("Invalid vertex.");
            return;
        }
        this.matrix[u][v] = 0;
        this.matrix[v][u] = 0; // For undirected graph
        console.log(`Edge removed between vertex ${u} and vertex ${v}`);
    }

    displayMatrix()
    {
        console.log("Adjacency Matrix:");
        for (let row of this.matrix)
        {
            console.log(row.join(" "));
        }
    }

    hasEdge(u, v)
    {
        return this.matrix[u][v] === 1;
    }

    countEdges()
    {
        let edgeCount = 0;
        for (let i = 0; i < this.size; i++)
        {
            for (let j = i + 1; j < this.size; j++) // Avoid double-counting for undirected graphs
            {
                if (this.matrix[i][j] === 1)
                {
                    edgeCount++;
                }
            }
        }
        return edgeCount;
    }

    dfs(start)
    {
        const visited = new Array(this.size).fill(false);
        const result = [];
        this.#dfsRecursive(start, visited, result);
        console.log(`DFS starting from vertex ${start}: ${result.join(" -> ")}`);
    }

    #dfsRecursive(vertex, visited, result)
    {
        visited[vertex] = true;
        result.push(vertex);

        for (let i = 0; i < this.size; i++)
        {
            if (this.matrix[vertex][i] === 1 && !visited[i])
            {
                this.#dfsRecursive(i, visited, result);
            }
        }
    }

    bfs(start)
    {
        const visited = new Array(this.size).fill(false);
        const queue = [start];
        const result = [];

        visited[start] = true;

        while (queue.length > 0)
        {
            const vertex = queue.shift();
            result.push(vertex);

            for (let i = 0; i < this.size; i++)
            {
                if (this.matrix[vertex][i] === 1 && !visited[i])
                {
                    visited[i] = true;
                    queue.push(i);
                }
            }
        }
        console.log(`BFS starting from vertex ${start}: ${result.join(" -> ")}`);
    }
}

const graph = new Graph(5);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);

graph.displayMatrix();

/**
 * Output:
 * Adjacency Matrix:
 * 0 1 1 0 0
 * 1 0 0 1 1
 * 1 0 0 0 0
 * 0 1 0 0 0
 * 0 1 0 0 0
 */

console.log(`Edge between 0 and 1: ${graph.hasEdge(0, 1) ? "Yes" : "No"}`); // Output: Yes
console.log(`Edge between 2 and 4: ${graph.hasEdge(2, 4) ? "Yes" : "No"}`); // Output: No

console.log(`Number of edges: ${graph.countEdges()}`); // Output: 4

graph.dfs(0); // Output: DFS starting from vertex 0: 0 -> 1 -> 3 -> 4 -> 2

graph.bfs(0); // Output: BFS starting from vertex 0: 0 -> 1 -> 2 -> 3 -> 4

graph.removeEdge(0, 2);
graph.displayMatrix(); // Edge between 0 and 2 should be removed