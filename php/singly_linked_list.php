<?php
class Node
{
    public $data; // The value stored in the node
    public $next; // Reference to the next node

    public function __construct($data)
    {
        $this->data = $data;
        $this->next = null; // Initially, the ndoe points to nothing
    }
}

class SinglyLinkedList
{
    private $head; // Points to the first node in the list

    public function __construct()
    {
        $this->head = null; // Initially, the list is empty
    }

    public function addNode($data)
    {
        $newNode = new Node($data);

        if ($this->head === null)
        {
            $this->head = $newNode; // If the list is empty, the new node is the head
        }
        else
        {
            $current = $this->head;
            while ($current->next !== null)
            {
                $current = $current->next; // Traverse to the last node
            }
            $current->next = $newNode; // Link the last node to the new node
        }
    }

    public function display()
    {
        if ($this->head === null)
        {
            echo "The list is empty." . PHP_EOL;
            return;
        }

        $current = $this->head;
        while ($current !== null)
        {
            echo $current->data . " -> ";
            $current = $current->next;
        }
        echo "NULL" . PHP_EOL;
    }

    public function addAtBeginning($data)
    {
        $newNode = new Node($data);

        $newNode->next = $this->head; // Point the new node to the current head
        $this->head = $newNode; // Update the head to the new node
    }

    public function find($value)
    {
        $current = $this->head;

        while ($current !== null)
        {
            if ($current->data === $value)
            {
                return true; // Value found
            }
            $current = $current->next;
        }
        return false; // Value not found
    }

    public function delete($value)
    {
        if ($this->head === null)
        {
            echo "The list is empty." . PHP_EOL;
            return;
        }

        // If the head node is to be deleted
        if ($this->head->data === $value)
        {
            $this->head = $this->head->next; // Update the head
            return;
        }

        $current = $this->head;
        while ($current->next !== null && $current->next->data !== $value)
        {
            $current = $current->next; // Traverse to find the node to delete
        }

        if ($current->next === null)
        {
            echo "Value not found in the list." . PHP_EOL;
        }
        else
        {
            $current->next = $current->next->next; // Skip the node to delete
        }
    }

    public function insertAt($data, $position)
    {
        $newNode = new Node($data);

        if ($position === 0)
        {
            $this->addAtBeginning($data);
            return;
        }

        $current = $this->head;
        $index = 0;

        while ($current !== null && $index < $position - 1)
        {
            $current = $current->next;
            $index++;
        }

        if ($current === null)
        {
            echo "Position out of bounds." . PHP_EOL;
            return;
        }

        $newNode->next = $current->next;
        $current->next = $newNode;
    }

    public function reverse()
    {
        $previous = null;
        $current = $this->head;

        while ($current !== null)
        {
            $next = $current->next; // Store reference to the next node
            $current->next = $previous; // Reverse the link
            $previous = $current; // Move previous forward
            $current = $next; // Move current forward
        }
        $this->head = $previous; // Update the head to the new front
    }

    public function countNodes()
    {
        $count = 0;
        $current = $this->head;

        while ($current !== null)
        {
            $count++;
            $current = $current->next;
        }

        return $count;
    }
}

$list = new SinglyLinkedList();

// Add nodes
$list->addNode(10);
$list->addNode(20);
$list->addNode(30);
$list->display(); // Output: 10 -> 20 -> 30 -> NULL

// Add at the beginning
$list->addAtBeginning(5);
$list->display(); // Output: 5 -> 10 -> 20 -> 30 -> NULL

// Find a node
echo $list->find(20) ? "Found 20\n" : "20 not found\n"; // Output: Found 20

// Delete a node
$list->delete(10);
$list->display(); // Output: 5 -> 20 -> 30 -> NULL

// Insert at position
$list->insertAt(15, 1);
$list->display(); // Output: 5 -> 15 -> 20 -> 30 -> NULL

// Count nodes
echo "Number of nodes: " . $list->countNodes() . PHP_EOL; // Output: 4

// Reverse the list
$list->reverse();
$list->display(); // Output: 30 -> 20 -> 15 -> 5 -> NULL
?>