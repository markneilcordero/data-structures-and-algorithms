<?php
class CircularQueue
{
    private $queue; // Array to store queue elements
    private $front; // Index of the front element
    private $rear; // Index of the last element
    private $capacity; // Maximum capacity of the queue
    private $size; // Current number of elements in the queue

    public function __construct($capacity)
    {
        $this->capacity = $capacity; // Set the capacity
        $this->queue = array_fill(0, $capacity, null); // Initialize the array
        $this->front = -1; // Front starts as -1 (empty queue)
        $this->rear = -1; // Rear starts as -1 (empty queue)
        $this->size = 0; // Queue starts empty
    }

    public function enqueue($element)
    {
        if ($this->isFull())
        {
            echo "Queue is full. Cannot enqueue $element.\n";
            return false;
        }

        if ($this->isEmpty())
        {
            // If the queue is empty, set both front and rear to 0
            $this->front = 0;
        }

        // Update the rear index (circularly)
        $this->rear = ($this->rear + 1) % $this->capacity;

        // Add the element to the queue
        $this->queue[$this->rear] = $element;
        $this->size++;
        echo "Enqueued: $element\n";
        return true;
    }

    public function dequeue()
    {
        if ($this->isEmpty())
        {
            echo "Queue is empty. Cannot dequeue.\n";
            return null;
        }

        // Get the front element
        $element = $this->queue[$this->front];

        // Set the front position to null
        $this->queue[$this->front] = null;

        if ($this->front === $this->rear)
        {
            // Queue becomes empty
            $this->front = -1;
            $this->rear = -1;
        }
        else
        {
            // Move the front index (circularly)
            $this->front = ($this->front + 1) % $this->capacity;
        }

        $this->size--;
        echo "Dequeued: $element\n";
        return $element;
    }

    public function peek()
    {
        if ($this->isEmpty())
        {
            echo "Queue is empty. Nothing to peek.\n";
            return null;
        }
        
        return $this->queue[$this->front];
    }

    public function isEmpty()
    {
        return $this->size === 0;
    }

    public function isFull()
    {
        return $this->size === $this->capacity;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function display()
    {
        if ($this->isEmpty())
        {
            echo "Queue is empty.\n";
            return;
        }

        echo "Queue elements (front to rear):\n";
        for ($i = 0; $i < $this->size; $i++)
        {
            $index = ($this->front + $i) % $this->capacity;
            echo $this->queue[$index] . " ";
        }
        echo PHP_EOL;
    }
}

$queue = new CircularQueue(5);

$queue->enqueue(10);
$queue->enqueue(20);
$queue->enqueue(30);
$queue->display(); // Output: 10 20 30

$queue->dequeue();
$queue->display(); // Output: 20 30

echo "Front element: " . $queue->peek() . PHP_EOL; // Output: 20

echo "Queue size: " . $queue->getSize() . PHP_EOL; // Output: 2
?>