<?php
class Stack
{
    private $stack; // Array to store stack elements
    private $size; // Number of elements in the stack

    public function __construct()
    {
        $this->stack = []; // Initialize an empty array
        $this->size = 0; // Stack size is initially 0
    }

    public function push($element)
    {
        $this->stack[] = $element; // Add element to the end of the array
        $this->size++; // Increment the size
        echo "Pushed: $element\n";
    }

    public function pop()
    {
        if ($this->isEmpty())
        {
            echo "Stack is empty. Cannot pop.\n";
            return null;
        }

        $poppedElement = array_pop($this->stack); // Remove the last element
        $this->size--; // Decrement the size
        echo "Popped: $poppedElement\n";
        return $poppedElement;
    }

    public function peek()
    {
        if ($this->isEmpty())
        {
            echo "Stack is empty. Nothing to peek\n";
            return null;
        }

        return $this->stack[$this->size - 1]; // Return the last element
    }

    public function isEmpty()
    {
        return $this->size === 0; // Returns true if size is 0
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

        echo "Stack elements (bottom to top):\n";
        foreach ($this->stack as $element)
        {
            echo $element . "\n";
        }
    }

    public function clear()
    {
        $this->stack = []; // Reset the stack to an empty array
        $this->size = 0; // Reset the size to 0
        echo "Stack cleared.\n";
    }
}

$stack = new Stack();

$stack->push(10);
$stack->push(20);
$stack->push(30);

$stack->display(); // Output: 10, 20, 30

echo "Top element: " . $stack->peek() . PHP_EOL; // Output: 30

$stack->pop();
$stack->display(); // Output: 10, 20

echo "Stack size: " . $stack->getSize() . PHP_EOL; // Output: 2

$stack->clear();
$stack->display(); // Output: Stack is empty.
?>