class DynamicArray<T>
{
    private var array = arrayOfNulls<Any>(2) // Initial capacity of 2
    private var size = 0 // Number of elements in the array

    // Add an element to the end
    fun add(element: T)
    {
        if (size == array.size)
        {
            resize() // Increase the capacity when the array is full
        }
        array[size] = element
        size++
    }

    // Get an element by index
    fun get(index: Int): T
    {
        if (index < 0 || index >= size)
        {
            throw IndexOutOfBoundsException("Index $index is out of bounds")
        }
        @Suppress("UNCHECKED_CAST") // Type casting is safe here
        return array[index] as T
    }

    // Get the number of elements
    fun size(): Int
    {
        return size
    }

    // Check if the array is empty
    fun isEmpty(): Boolean
    {
        return size == 0
    }

    // Remove an element by index
    fun removeAt(index: Int): T
    {
        if (index < 0 || index >= size)
        {
            throw IndexOutOfBoundsException("Index $index is out of bounds")
        }
        @Suppress("UNCHECKED_CAST")
        val removedElement = array[index] as T
        for (i in index until size - 1)
        {
            array[i] = array[i + 1] // Shift elements to the left
        }
        array[size - 1] = null // Clear the last element
        size--
        return removedElement
    }

    // Clear all elements
    fun clear()
    {
        for (i in 0 until size)
        {
            array[i] = null
        }
        size = 0
    }

    // Check if the array contains an element
    fun contains(element: T): Boolean
    {
        for (i in 0 until size)
        {
            if (array[i] == element)
            {
                return true
            }
        }
        return false
    }

    // Insert an element at a specific index
    fun insertAt(index: Int, element: T)
    {
        if (index < 0 || index > size)
        {
            throw IndexOutOfBoundsException("Index $index is out of bounds")
        }
        if (size == array.size)
        {
            resize() // Increase capacity if needed
        }
        for (i in size downTo index + 1)
        {
            array[i] = array[i - 1] // Shift elements to the right
        }
        array[index] = element
        size++
    }

    // Increase the capacity of the array
    private fun resize()
    {
        val newCapacity = array.size * 2
        val newArray = arrayOfNulls<Any>(newCapacity)
        for (i in array.indices)
        {
            newArray[i] = array[i]
        }
        array = newArray
    }

    // Traverse the array
    fun traverse()
    {
        for (i in 0 until size)
        {
            println(array[i])
        }
    }
}

fun main()
{
    val dynamicArray = DynamicArray<Int>()
    dynamicArray.add(10)
    dynamicArray.add(20)
    println("After adding elements: ")
    dynamicArray.traverse() // Output 10, 20

    println("\nElement as index 1: ${dynamicArray.get(1)}") // Output: 20
    println("\nSize of the array: ${dynamicArray.size()}") // Output: 2
    println("Is the array empty? ${dynamicArray.isEmpty()}") // Output: false
    println("\nRemoving element at index 0:")

    dynamicArray.removeAt(0)
    dynamicArray.traverse() // Output: 20

    println("\nClearing the array:")

    dynamicArray.clear()
    dynamicArray.traverse() // Output: (no elements)

    println("\nAdding more elements:")
    dynamicArray.add(30)
    dynamicArray.add(40)
    dynamicArray.insertAt(1, 35)
    dynamicArray.traverse() // Output: 30, 35, 40

    println("\nDoes the array contain 30? ${dynamicArray.contains(30)}") // Output: true
    println("Does the array contain 50? ${dynamicArray.contains(50)}") // Output: false
}