<?php
class Deque
{
    private $items; // Array to store deque elements

    public function __construct()
    {
        $this->items = []; // Initialize as an empty array
    }

    public function addFront($element)
    {
        array_unshift($this->items, $element); // Add element to the start of the array
        echo "Added to front: $element\n";      
    }

    public function addRear($element)
    {
        array_push($this->items, $element); // Add element to the end of the array
        echo "Added to rear: $element\n";
    }

    public function removeFront()
    {
        if ($this->isEmpty())
        {
            echo "Deque is empty. Cannot remove from front.\n";
            return null;
        }

        $removed = array_shift($this->items); // Remove and return the first element
        echo "Removed from front: $removed\n";
        return $removed;
    }

    public function removeRear()
    {
        if ($this->isEmpty())
        {
            echo "Deque is empty. Cannot remove from rear.\n";
            return null;
        }

        $removed = array_pop($this->items); // Remove and return the last element
        echo "Removed from rear: $removed\n";
        return $removed;
    }

    public function peekFront()
    {
        if ($this->isEmpty())
        {
            echo "Deque is empty. Nothing at the front.\n";
            return null;
        }

        return $this->items[0]; // Return the first element
    }

    public function peekRear()
    {
        if ($this->isEmpty())
        {
            echo "Deque is empty. Nothing at the rear.\n";
            return null;
        }

        return end($this->items); // Return the last element
    }

    public function isEmpty()
    {
        return empty($this->items); // Return true if the array is empty
    }

    public function size()
    {
        return count($this->items); // Return the length of the array
    }

    public function display()
    {
        if ($this->isEmpty())
        {
            echo "Deque is empty.\n";
            return;
        }

        echo "Deque elements: " . implode(" <-> ", $this->items) . "\n";
    }
}

$deque = new Deque();

$deque->addRear(10);
$deque->addRear(20);
$deque->addFront(5);
$deque->display(); // Output: 5 <-> 10 <-> 20

$deque->removeFront(); // Removes 5
$deque->display(); // Output: 10 <-> 20

$deque->removeRear(); // Removes 20
$deque->display(); // Output: 10

echo "Front element: " . $deque->peekFront() . "\n"; // Output: 10
echo "Rear element: " . $deque->peekRear() . "\n"; // Output: 10

echo "Deque size: " . $deque->size() . "\n"; // Output: 1
echo "Is deque empty? " . ($deque->isEmpty() ? "Yes" : "No") . "\n"; // Output: No


$deque->removeFront(); // Removes 10
$deque->display(); // Output: Deque is empty.
echo "Is deque empty? " . ($deque->isEmpty() ? "Yes" : "No") . "\n"; // Output: Yes
?>