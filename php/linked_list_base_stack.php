<?php
class Node
{
    public $data; // The value stored in the node
    public $next; // Pointer to the next node

    public function __construct($data)
    {
        $this->data = $data;
        $this->next = null; // Initially, the node points to nothing
    }
}

class Stack
{
    private $top; // Points to the top of the stack
    private $size; // Keeps track of the stack size

    public function __construct()
    {
        $this->top = null; // Initially, the stack is empty
        $this->size = 0;
    }

    public function push($data)
    {
        $newNode = new Node($data);

        // The new node points to the current top
        $newNode->next = $this->top;

        // Update the top to the new node
        $this->top = $newNode;

        // Increment the stack size
        $this->size++;
        echo "Pushed: $data\n";
    }

    public function pop()
    {
        if ($this->isEmpty())
        {
            echo "Stack is empty. Cannot pop.\n";
            return null;
        }

        // Store the data to return
        $poppedData = $this->top->data;

        // Update the top to the next node
        $this->top = $this->top->next;

        // Decrement the stack size
        $this->size--;

        echo "Popped: $poppedData\n";
        return $poppedData;
    }

    public function peek()
    {
        if ($this->isEmpty())
        {
            echo "Stack is empty. Nothing to peek.\n";
            return null;
        }

        return $this->top->data;
    }

    public function isEmpty()
    {
        return $this->top === null;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function display()
    {
        if ($this->isEmpty())
        {
            echo "Stack is empty.\n";
            return;
        }

        echo "Stack elements (top to bottom):\n";
        $current = $this->top;

        while ($current !== null)
        {
            echo $current->data . "\n";
            $current = $current->next;
        }
    }

    public function clear()
    {
        $this->top = null; // Set the top to null
        $this->size = 0; // Reset the size
        echo "Stack cleared.\n";
    }
}

$stack = new Stack();

$stack->push(10);
$stack->push(20);
$stack->push(30);

$stack->display(); // Output: 30, 20, 10

echo "Top element: " . $stack->peek() . PHP_EOL; // Output: 30

$stack->pop();
$stack->display(); // Output: 20, 10

echo "Stack size: " . $stack->getSize() . PHP_EOL; // Output: 2

$stack->clear();
$stack->display(); // Output: Stack is empty.
?>