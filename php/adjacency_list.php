<?php
class AdjacencyList
{
    private $graph = [];

    public function addVertex($vertex)
    {
        if (!array_key_exists($vertex, $this->graph))
        {
            $this->graph[$vertex] = [];
        }
    }

    public function addEdge($start, $end)
    {
        if (!array_key_exists($start, $this->graph))
        {
            $this->addVertex($start);
        }

        if (!array_key_exists($end, $this->graph))
        {
            $this->addVertex($end);
        }
        $this->graph[$start][] = $end;

        // $this->graph[$end][] = $start;
    }

    public function removeEdge($start, $end)
    {
        if (array_key_exists($start, $this->graph))
        {
            $this->graph[$start] = array_filter($this->graph[$start], function($vertex) use ($end) {
                return $vertex !== $end;
            });
        }

        if (array_key_exists($end, $this->graph))
        {
            $this->graph[$end] = array_filter($this->graph[$end], function ($vertex) use ($start) {
                return $vertex !== $start;
            });
        }
    }

    public function removeVertex($vertex)
    {
        if (array_key_exists($vertex, $this->graph))
        {
            unset($this->graph[$vertex]);
            foreach ($this->graph as $key => &$neighbors)
            {
                $neighbors = array_filter($neighbors, function($neighbor) use ($vertex) {
                    return $neighbor !== $vertex;
                });
            }
        }
    }

    public function displayGraph()
    {
        foreach ($this->graph as $vertex => $edges)
        {
            echo "$vertex -> " . implode(", ", $edges) . PHP_EOL;
        }
    }

    public function edgeExists($start, $end)
    {
        return array_key_exists($start, $this->graph) && in_array($end, $this->graph[$start]);
    }

    public function getNeighbors($vertex)
    {
        return $this->graph[$vertex] ?? [];
    }

    public function toAdjacencyMatrix()
    {
        $vertices = array_keys($this->graph);
        $size = count($vertices);
        $matrix = array_fill(0, $size, array_fill(0, $size, 0));

        $vertexMap = array_flip($vertices);
        foreach ($this->graph as $vertex => $edges)
        {
            foreach ($edges as $edge)
            {
                $matrix[$vertexMap[$vertex]][$vertexMap[$edge]] = 1;
            }
        }

        return $matrix;
    }
}

$graph = new AdjacencyList();

$graph->addVertex("A");
$graph->addVertex("B");
$graph->addVertex("C");
$graph->addEdge("A", "B");
$graph->addEdge("A", "C");
$graph->addEdge("B", "C");

echo "Adjacency List:" . PHP_EOL;
$graph->displayGraph();

echo PHP_EOL . "Edge exists between A and C: " . ($graph->edgeExists("A", "C") ? "Yes" : "No") . PHP_EOL;

echo "Neighbors of A: " . implode(", ", $graph->getNeighbors("A")) . PHP_EOL;

$graph->removeEdge("A", "C");
echo PHP_EOL . "After removing edge A -> C:" . PHP_EOL;
$graph->displayGraph();

$graph->removeVertex("B");
echo PHP_EOL . "After removing vertex B:" . PHP_EOL;
$graph->displayGraph();

$matrix = $graph->toAdjacencyMatrix();
echo PHP_EOL . "Adjacency Matrix:" . PHP_EOL;
foreach ($matrix as $row)
{
    echo implode(" ", $row) . PHP_EOL;
}
?>