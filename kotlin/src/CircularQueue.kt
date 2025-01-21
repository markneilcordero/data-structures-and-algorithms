class CircularQueue(private val capacity: Int)
{
    private val queue = Array<Any?>(capacity) { null }
    private var front = -1
    private var rear = -1
    private var size = 0

    fun enqueue(element: Any): Boolean
    {
        if (isFull())
        {
            println("Queue is full. Cannot enqueue $element.")
            return false
        }
        if (isEmpty())
        {
            front = 0
        }
        rear = (rear + 1) % capacity
        queue[rear] = element
        size++
        println("Enqueued: $element")
        return true
    }

    fun dequeue(): Any?
    {
        if (isEmpty())
        {
            println("Queue is empty. Cannot dequeue.")
            return null
        }
        val dequeuedElement = queue[front]
        queue[front] = null
        front = (front + 1) % capacity
        size--

        if (isEmpty())
        {
            front = -1
            rear = -1
        }
        println("Dequeued: $dequeuedElement")
        return dequeuedElement
    }

    fun peek(): Any?
    {
        return if (isEmpty())
        {
            println("Queue is empty. Nothing to peek.")
            null
        }
        else
        {
            queue[front]
        }
    }

    fun isEmpty(): Boolean
    {
        return size == 0
    }

    fun isFull(): Boolean
    {
        return size == capacity
    }

    fun size(): Int
    {
        return size
    }

    fun displayQueue()
    {
        if (isEmpty())
        {
            println("Queue is empty.")
            return
        }
        println("Queue elements:")
        var i = front
        repeat(size)
        {
            print("${queue[i]} ")
            i = (i + 1 ) % capacity
        }
        println()
    }
}

fun main()
{
    val circularQueue = CircularQueue(5)

    circularQueue.enqueue(10)
    circularQueue.enqueue(20)
    circularQueue.enqueue(30)
    circularQueue.enqueue(40)
    circularQueue.enqueue(50)
    circularQueue.enqueue(60)

    circularQueue.displayQueue()

    println("Front element: ${circularQueue.peek()}")

    circularQueue.dequeue()
    circularQueue.dequeue()

    circularQueue.displayQueue()

    circularQueue.enqueue(60)
    circularQueue.enqueue(70)

    circularQueue.displayQueue()
}