<?php
class Node
{
    public $data; // Value of the node
    public $next; // Pointer to the next node

    public function __construct($data)
    {
        $this->data = $data;
        $this->next = null; // Initially, the node points to nothing
    }
}

class CircularLinkedList
{
    private $head; // Points to the first node

    public function __construct()
    {
        $this->head = null; // Initially, the list is empty
    }

    public function addNode($data)
    {
        $newNode = new Node($data);

        if ($this->head === null)
        {
            // If the list is empty, the new node points to itself
            $this->head = $newNode;
            $newNode->next = $this->head;
        }
        else
        {
            $current = $this->head;

            // Traverse to the last node
            while ($current->next !== $this->head)
            {
                $current = $current->next;
            }

            // Update the links to add the new node
            $current->next = $newNode;
            $newNode->next = $this->head;
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
        do
        {
            echo $current->data . " -> ";
            $current = $current->next;
        }
        while ($current !== $this->head);

        echo "(back to head)" . PHP_EOL;
    }

    public function addAtBeginning($data)
    {
        $newNode = new Node($data);

        if ($this->head === null)
        {
            // If the list is empty, the new node points to itself
            $this->head = $newNode;
            $newNode->next = $this->head;
        }
        else
        {
            $current = $this->head;

            // Traverse to the last node
            while ($current->next !== $this->head)
            {
                $current = $current->next;
            }

            // Update the links to add the new node
            $newNode->next = $this->head;
            $current->next = $newNode;
            $this->head = $newNode;
        }
    }

    public function find($value)
    {
        if ($this->head === null)
        {
            return false; // List is empty
        }

        $current = $this->head;

        do
        {
            if ($current->data === $value)
            {
                return true; // Value found
            }
            $current = $current->next;
        }
        while ($current !== $this->head);

        return false; // Value not found
    }

    public function delete($value)
    {
        if ($this->head === null)
        {
            echo "The list is empty." . PHP_EOL;
            return;
        }

        $current = $this->head;
        $previous = null;

        do
        {
            if ($current->data === $value)
            {
                if ($previous === null)
                {
                    // Deleting the head node
                    $last = $this->head;

                    // Traverse to the last node
                    while ($last->next !== $this->head)
                    {
                        $last = $last->next;
                    }

                    // Update the last node to point to the new head
                    $this->head = $this->head->next;
                    $last->next = $this->head;
                }
                else
                {
                    // Deleting a middle or last node
                    $previous->next = $current->next;
                }

                unset($current);
                return;
            }
            $previous = $current;
            $current = $current->next;
        }
        while ($current !== $this->head);

        echo "Value not found in the list." . PHP_EOL;
    }

    public function countNodes()
    {
        if ($this->head === null)
        {
            return 0; // List is empty
        }

        $count = 0;
        $current = $this->head;

        do
        {
            $count++;
            $current = $current->next;
        }
        while ($current !== $this->head);

        return $count;
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

        while ($index < $position - 1 && $current->next !== $this->head)
        {
            $current = $current->next;
            $index++;
        }

        if ($index !== $position - 1)
        {
            echo "Position out of bounds." . PHP_EOL;
            return;
        }

        $newNode->next = $current->next;
        $current->next = $newNode;
    }
}

$list = new CircularLinkedList();

// Add nodes
$list->addNode(10);
$list->addNode(20);
$list->addNode(30);
$list->display(); // Output: 10 -> 20 -> 30 -> (back to head)

// Add at the beginning
$list->addAtBeginning(5);
$list->display(); // Output: 5 -> 10 -> 20 -> 30 -> (back to head)

// Find a node
echo $list->find(20) ? "Found 20\n" : "20 not found\n"; // Output: Found 20

// Delete a node
$list->delete(10);
$list->display(); // Output: 5 -> 20 -> 30 -> (back to head)

// Count nodes
echo "Number of nodes: " . $list->countNodes() . PHP_EOL; // Output: 3

// Insert at position
$list->insertAt(15, 1);
$list->display(); // Output: 5 -> 15 -> 20 -> 30 -> (back to head)
?>