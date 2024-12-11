<?php
class DynamicArray
{
    private $array; // Internal array ot store elements
    private $size; // Number of elements in the array
    private $capacity; // Maximum capacity of the array

    public function __construct($initialCapacity = 2)
    {
        $this->array = []; // Empty array
        $this->size = 0; // No elements initially
        $this->capacity = $initialCapacity; // Default capacity
    }

    public function add($value)
    {
        // Resize if capacity is exceeded
        if ($this->size == $this->capacity)
        {
            $this->resize();
        }
        $this->array[$this->size] = $value;
        $this->size++;
    }

    public function removeLast()
    {
        if ($this->size == 0)
        {
            throw new Exception("Array is empty, nothing to remove.");
        }
        $lastElement = $this->array[$this->size - 1];
        unset($this->array[$this->size - 1]);
        $this->size--;
        return $lastElement;
    }

    public function size()
    {
        return $this->size;
    }

    public function get($index)
    {
        if ($index < 0 || $index >= $this->size)
        {
            throw new Exception("Index out of bounds.");
        }
        return $this->array[$index];
    }

    public function insert($index, $value)
    {
        if ($index < 0 || $index > $this->size)
        {
            throw new Exception("Index out of bounds.");
        }
        if ($this->size == $this->capacity)
        {
            $this->resize();
        }
        // Shift elements to the right
        for ($i = $this->size; $i > $index; $i--)
        {
            $this->array[$i] = $this->array[$i - 1];
        }
        $this->array[$index] = $value;
        $this->size++;
    }

    public function delete($index)
    {
        if ($index < 0 || $index >= $this->size)
        {
            throw new Exception("Index out of bounds.");
        }
        $deletedValue = $this->array[$index];
        // Shift elements to the left
        for ($i = $index; $i < $this->size - 1; $i++)
        {
            $this->array[$i] = $this->array[$i + 1];
        }
        unset($this->array[$this->size - 1]);
        $this->size--;
        return $deletedValue;
    }

    public function contains($value)
    {
        for ($i = 0; $i < $this->size; $i++)
        {
            if ($this->array[$i] == $value)
            {
                return true;
            }
        }
        return false;
    }

    public function indexOf($value)
    {
        for ($i = 0; $i < $this->size; $i++)
        {
            if ($this->array[$i] == $value)
            {
                return $i;
            }
        }
        return -1; // Not found
    }

    private function resize()
    {
        $this->capacity *= 2; // Double the capacity
        $newArray = [];
        for ($i = 0; $i < $this->size; $i++)
        {
            $newArray[$i] = $this->array[$i];
        }
        $this->array = $newArray;
    }

    public function iterate()
    {
        for ($i = 0; $i < $this->size; $i++)
        {
            echo $this->array[$i] . PHP_EOL;
        }
    }

    public function clear()
    {
        $this->array = [];
        $this->size = 0;
    }
}

$array = new DynamicArray();

// Add elements
$array->add(10);
$array->add(20);
$array->add(30);
echo "Size: " . $array->size() . PHP_EOL; // Output: 3

// Access elements
echo "Element at index 1: " . $array->get(1) . PHP_EOL; // Output: 20

// Insert element
$array->insert(1, 15);
$array->iterate(); // Output: 10, 15, 20, 30

// Remove element
$array->removeLast();
$array->iterate(); // Output: 10, 15, 20

// Check for value
echo $array->contains(15) ? "Contains 15" . PHP_EOL : "Does not contain 15" . PHP_EOL;

// Find index
echo "Index of 15: " . $array->indexOf(15) . PHP_EOL; // Output: 1

// Clear array
$array->clear();
echo "Size after clearing: " . $array->size() . PHP_EOL; // Output: 0
?>