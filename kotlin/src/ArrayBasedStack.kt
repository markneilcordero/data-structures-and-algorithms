class ArrayStack<T>(private val capacity: Int)
{
    private var stack = arrayOfNulls<Any>(capacity) // Array to store elements
    private var top = -1 // Track the top of the stack (-1 means empty)

    fun push(value: T)
    {
        if (top == capacity - 1)
        {
            println("Stack Overflow! Cannot add $value")
            return
        }
        top++
        stack[top] = value
        println("Pushed $value onto the stack.")
    }

    fun pop(): T?
    {
        if (isEmpty())
        {
            println("Stack Underflow! Stack is empty.")
            return null
        }
        val poppedValue = stack[top]
        stack[top] = null // Remove reference for garbage collection
        top--
        println("Popped $poppedValue from the stack.")
        return poppedValue as T?
    }

    fun peek(): T?
    {
        return if (isEmpty())
        {
            println("Stack is empty.")
            null
        }
        else
        {
            println("Top of the stack is: ${stack[top]}")
            stack[top] as T
        }
    }

    fun isEmpty(): Boolean
    {
        return top == -1
    }

    fun size(): Int
    {
        return top + 1
    }

    fun clear()
    {
        for (i in 0..top)
        {
            stack[i] = null
        }
        top = -1
        println("Stack cleared.")
    }

    fun printStack()
    {
        if (isEmpty())
        {
            println("Stack is empty.")
        }
        else
        {
            println("Stack elements from top to bottom:")
            for (i in top downTo 0)
            {
                println(stack[i])
            }
        }
    }
}

fun main()
{
    val stack = ArrayStack<Int>(5)

    println("\n-- Pushing Elements onto the Stack --")
    stack.push(10)
    stack.push(20)
    stack.push(30)
    stack.push(40)
    stack.push(50)
    stack.push(60) // Stack overflow

    println("\n-- Popping Elements from the Stack --")
    stack.pop() // Should remove 50
    stack.pop() // Should remove 40

    println("\n-- Current Stack Size --")
    println("Stack size: ${stack.size()}") // Should print 3

    println("\n-- Printing Stack Elements --")
    stack.printStack()

    println("\n-- Clearing the Stack --")
    stack.clear()

    println("\n-- Checking if Stack is Empty --")
    println("Is stack empty? ${stack.isEmpty()}") // Should print true
}