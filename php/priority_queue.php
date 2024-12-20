<?php
class PriorityQueue
{
    private $queue; // Array to store elements with their priorities

    public function __construct()
    {
        $this->queue = []; // Initialize an empty array
    }

    public function enqueue($value, $priority)
    {
        $newElement = ['value' => $value, 'priority' => $priority];

        // Insert the new element in the correct position based on priority
        $added = false;
        for ($i = 0; $i < count($this->queue); $i++)
        {
            if ($this->queue[$i]['priority'] > $priority)
            {
                array_splice($this->queue, $i, 0, [$newElement]); // Insert at position $i
                $added = true;
                break;
            }
        }

        if (!$added)
        {
            // If the element has the lowest priority, add it to the end
            $this->queue[] = $newElement;
        }

        echo "Enqueued: { value: $value, priority: $priority }\n";
    }

    public function dequeue()
    {
        if ($this->isEmpty())
        {
            echo "Priority Queue is empty. Cannot dequeue.\n";
            return null;
        }

        $item = array_shift($this->queue); // Remove the first element
        echo "Dequeued: { value: {$item['value']}, priority: {$item['priority']} }\n";
    }

    public function peek()
    {
        if ($this->isEmpty())
        {
            echo "Priority Queue is empty. Nothing to peek.\n";
            return null;
        }

        return $this->queue[0]; // Return the first element
    }

    public function isEmpty()
    {
        return empty($this->queue);
    }

    public function size()
    {
        return count($this->queue);
    }

    public function changePriority($value, $newPriority)
    {
        // Find and remove the element
        $index = null;
        for ($i = 0; $i < count($this->queue); $i++)
        {
            if ($this->queue[$i]['value'] === $value)
            {
                $index = $i;
                break;
            }
        }

        if ($index === null)
        {
            echo "Element with value $value not found.\n";
            return false;
        }

        // Remove the element from the queue
        $element = $this->queue[$index];
        array_splice($this->queue, $index, 1);

        // Re-insert the element with the new priority
        $this->enqueue($value, $newPriority);
        echo "Updated priority of $value to $newPriority.\n";
        return true;
    }

    public function display()
    {
        if ($this->isEmpty())
        {
            echo "Priority Queue is empty.\n";
            return;
        }

        echo "Priority Queue elements (value, priority):\n";
        foreach ($this->queue as $item)
        {
            echo "{value: {$item['value']}, priority: {$item['priority']} }\n";
        }
    }
}

$priorityQueue = new PriorityQueue();
$priorityQueue->enqueue("A", 3);
$priorityQueue->enqueue("B", 1);
$priorityQueue->enqueue("C", 2);

$priorityQueue->display(); // Output: B, C, A

$priorityQueue->dequeue(); // Removes B
$priorityQueue->display(); // Output: C, A

echo "Peek: ";
print_r($priorityQueue->peek()); // Output: C

$priorityQueue->changePriority("A", 0); // Updates A's priority
$priorityQueue->display(); // Output: A, C

echo "Queue size: " . $priorityQueue->size() . PHP_EOL; // Output: 2
?>