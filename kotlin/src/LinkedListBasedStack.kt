data class StackNode<T>(var value: T, var next: StackNode<T>? = null)

class LinkedListBasedStack<T>
{
    private var top: StackNode<T>? = null // Reference to the top node
    private var count: Int = 0 // To keep track of the number of elements

    fun push(value: T)
    {
        val newNode = StackNode(value)
        newNode.next = top // Point the new node's next to the current top
        top = newNode // Update top to the new node
        count++
    }

    fun pop(): T?
    {
        if (isEmpty()) return null // Return null if the stack is empty
        val value = top?.value // Get the top value
        top = top?.next // Update top to the next node
        count--
        return value
    }

    fun peek(): T?
    {
        return top?.value // Return the top value or null if the stack is empty
    }

    fun isEmpty(): Boolean
    {
        return top == null // True if top is null
    }

    fun size(): Int
    {
        return count
    }

    fun clear()
    {
        top = null // Set top to null
        count = 0 // Reset the count
    }

    fun contains(value: T): Boolean
    {
        var current = top
        while (current != null)
        {
            if (current.value == value) return true
            current = current.next
        }
        return false
    }
}
fun main()
{
    val stack = LinkedListBasedStack<String>()

    stack.push("A")
    stack.push("B")
    stack.push("C")

    println("Stack after pushes: Top = ${stack.peek()}, Size = ${stack.size()}") // Output: C, 3

    println("Popped element: ${stack.pop()}") // Output:  C

    println("Stack contains 'B': ${stack.contains("B")}") // Output: true

    stack.clear()
    println("Is stack empty after clearing? ${stack.isEmpty()}") // Output: true
}