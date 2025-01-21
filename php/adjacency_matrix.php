<?php
class AdjacencyMatrix
{
    private $matrix = [];
    private $vertexCount = 0;

    public function __construct($size)
    {
        $this->vertexCount = $size;
        for ($i = 0; $i < $size; $i++)
        {
            for ($j = 0; $j < $size; $j++)
            {
                $this->matrix[$i][$j] = 0;
            }
        }
    }

    public function addEdge($start, $end)
    {
        if ($start < $this->vertexCount && $end < $this->vertexCount)
        {
            $this->matrix[$start][$end] = 1; // Direct graph
            $this->matrix[$end][$start] = 1; // Uncomment for undirected graph
        }
        else
        {
            echo "Invalid vertices.\n";
        }
    }

    public function removeEdge($start, $end)
    {
        if ($start < $this->vertexCount && $end < $this->vertexCount)
        {
            $this->matrix[$start][$end] = 0;
        }
        else
        {
            echo "Invalid vertices.\n";
        }
    }

    public function displayMatrix()
    {
        echo "Adjacency Matrix:\n";
        for ($i = 0; $i < $this->vertexCount; $i++)
        {
            for ($j = 0; $j < $this->vertexCount; $j++)
            {
                echo $this->matrix[$i][$j] . " ";
            }
            echo "\n";
        }
    }

    public function edgeExists($start, $end)
    {
        if ($start < $this->vertexCount && $end < $this->vertexCount)
        {
            return $this->matrix[$start][$end] === 1;
        }
        return false;
    }

    public function getOutDegree($vertex)
    {
        if ($vertex < $this->vertexCount)
        {
            return array_sum($this->matrix[$vertex]);
        }
        return -1;
    }

    public function getInDegree($vertex)
    {
        if ($vertex < $this->vertexCount)
        {
            $inDegree = 0;
            for ($i = 0; $i< $this->vertexCount; $i++)
            {
                $inDegree += $this->matrix[$i][$vertex];
            }
            return $inDegree;
        }
        return -1;
    }

    public function toAdjacencyList()
    {
        $adjList = [];
        for ($i = 0; $i < $this->vertexCount; $i++)
        {
            $adjList[$i] = [];
            for ($j = 0; $j < $this->vertexCount; $j++)
            {
                if ($this->matrix[$i][$j] === 1)
                {
                    $adjList[$i][] = $j;
                }
            }
        }
        return $adjList;
    }
}

$graph = new AdjacencyMatrix(4);
$graph->addEdge(0, 1);
$graph->addEdge(1, 2);
$graph->addEdge(2, 3);
$graph->addEdge(3, 0);

$graph->displayMatrix();
echo "\nEdge exists between 0 and 1: " . ($graph->edgeExists(0, 1) ? "Yes" : "No"). "\n";
echo "Out-degree of vertex 1: " . $graph->getOutDegree(1) . "\n";
echo "In-degree of vertex 2: " . $graph->getInDegree(2) . "\n";

$adjList = $graph->toAdjacencyList();
echo "\nAdjacency List Representation:\n";
foreach ($adjList as $vertex => $edges)
{
    echo "$vertex -> " . implode(", ", $edges) . "\n";
}
?>