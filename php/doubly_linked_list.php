<?php
class Node
{
    public $data; // The value stored in the node
    public $prev; // Pointer to the previous node
    public $next; // Pointer to the next node

    public function __construct($data)
    {
        $this->data = $data;
        $this->prev = null;
        $this->next = null;
    }
}

class DoublyLinkedList
{
    private $head; // Points to the first node
    private $tail; // Points to the last node

    public function __construct()
    {
        $this->head = null; // Initially, the list is empty
        $this->tail = null;
    }

    public function addNode($data)
    {
        $newNode = new Node($data);

        if ($this->head === null)
        {
            // If the list is empty, the new node becomes both head and tail
            $this->head = $newNode;
            $this->tail = $newNode;
        }
        else
        {
            // Update the tail
            $newNode->prev = $this->tail;
            $this->tail->next = $newNode;
            $this->tail = $newNode;
        }
    }

    public function displayForward()
    {
        if ($this->head === null)
        {
            echo "The list is empty." . PHP_EOL;
            return;
        }

        $current = $this->head;
        while ($current !== null)
        {
            echo $current->data . " <-> ";
            $current = $current->next;
        }
        echo "NULL" . PHP_EOL;
    }

    public function addAtBeginning($data)
    {
        $newNode = new Node($data);

        if ($this->head === null)
        {
            // If the list is empty, the new node becomes both head and tail
            $this->head = $newNode;
            $this->tail = $newNode;
        }
        else
        {
            // Update the head
            $newNode->next = $this->head;
            $this->head->prev = $newNode;
            $this->head = $newNode;
        }
    }

    public function displayReverse()
    {
        if ($this->tail === null)
        {
            echo "The list is empty." . PHP_EOL;
            return;
        }

        $current = $this->tail;
        while ($current !== null)
        {
            echo $current->data . " <-> ";
            $current = $current->prev;
        }
        echo "NULL" . PHP_EOL;
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

        $current = $this->head;

        while ($current !== null)
        {
            if ($current->data === $value)
            {
                // Update links for deletion
                if ($current->prev !== null)
                {
                    $current->prev->next = $current->next;
                }
                else
                {
                    // Deleting the head node
                    $this->head = $current->next;
                }

                if ($current->next !== null)
                {
                    $current->next->prev = $current->prev;
                }
                else
                {
                    // Deleting the tail node
                    $this->tail = $current->prev;
                }

                unset($current);
                return;
            }
            $current = $current->next;
        }
        echo "Value not found in the list." . PHP_EOL;
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
        $newNode->prev = $current;

        if ($current->next !== null)
        {
            $current->next->prev = $newNode;
        }
        else
        {
            // Update tail if adding at the end
            $this->tail = $newNode;
        }

        $current->next = $newNode;
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

    public function reverse()
    {
        $current = $this->head;
        $temp = null;

        // Swap next and prev for each node
        while ($current !== null)
        {
            $temp = $current->prev;
            $current->prev = $current->next;
            $current->next = $temp;
            $current = $current->prev;
        }

        // Update head and tail
        if ($temp !== null)
        {
            $this->head = $temp->prev;
        }
    }
}

$list = new DoublyLinkedList();

// Add nodes
$list->addNode(10);
$list->addNode(20);
$list->addNode(30);
$list->displayForward(); // Output: 10 <-> 20 <-> 30 <-> NULL

// Add at the beginning
$list->addAtBeginning(5);
$list->displayForward(); // Output: 5 <-> 10 <-> 20 <-> 30 <-> NULL

// Display in reverse
$list->displayReverse(); // Output: 30 <-> 20 <-> 10 <-> 5 <-> NULL

// Find a node
echo $list->find(20) ? "Found 20\n" : "20 not found\n"; // Output: Found 20

// Delete a node
$list->delete(10);
$list->displayForward(); // Output: 5 <-> 20 <-> 30 <-> NULL

// Insert at position
$list->insertAt(15, 1);
$list->displayForward(); // Output: 5 <-> 15 <-> 20 <-> 30 <-> NULL

// Count nodes
echo "Number of nodes: " . $list->countNodes() . PHP_EOL; // Output: 4

// Reverse the list
$list->reverse();
$list->displayForward(); // Output: 30 <-> 20 <-> 15 <-> 5 <-> NULL
?>