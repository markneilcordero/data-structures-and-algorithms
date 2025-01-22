import java.util.PriorityQueue

class CustomPriorityQueue<T : Comparable<T>>
{
    private val heap = mutableListOf<T>()

    fun enqueue(element: T)
    {
        heap.add(element)
        heapifyUp(heap.size - 1)
    }

    fun dequeue(): T?
    {
        if (isEmpty()) return null
        swap(0, heap.size - 1)
        val removedElement = heap.removeAt(heap.size - 1)
        heapifyDown(0)
        return removedElement
    }

    fun peek(): T?
    {
        return if (isEmpty()) null else heap[0]
    }

    fun isEmpty(): Boolean
    {
        return heap.isEmpty()
    }

    fun size(): Int
    {
        return heap.size
    }

    private fun heapifyUp(index: Int)
    {
        var currentIndex = index
        while (currentIndex > 0)
        {
            val parentIndex = (currentIndex - 1) / 2
            if (heap[currentIndex] >= heap[parentIndex]) break
            swap(currentIndex, parentIndex)
            currentIndex = parentIndex
        }
    }

    private fun heapifyDown(index: Int)
    {
        var currentIndex = index
        val lastIndex = heap.size - 1

        while (true)
        {
            val leftChildIndex = 2 * currentIndex + 1
            val rightChildIndex = 2 * currentIndex + 2
            var smallestIndex = currentIndex

            if (leftChildIndex <= lastIndex && heap[leftChildIndex] < heap[smallestIndex])
            {
                smallestIndex = leftChildIndex
            }
            if (rightChildIndex <= lastIndex && heap[rightChildIndex] < heap[smallestIndex])
            {
                smallestIndex = rightChildIndex
            }
            if (smallestIndex == currentIndex) break
            swap(currentIndex, smallestIndex)
            currentIndex = smallestIndex
        }
    }

    private fun swap(i: Int, j: Int)
    {
        val temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
    }
}

fun main()
{
    val priorityQueue = CustomPriorityQueue<Int>()

    priorityQueue.enqueue(15)
    priorityQueue.enqueue(10)
    priorityQueue.enqueue(30)
    priorityQueue.enqueue(5)

    println("Peek: ${priorityQueue.peek()}")

    println("Dequeued: ${priorityQueue.dequeue()}")
    println("Dequeued: ${priorityQueue.dequeue()}")

    println("Remaining size: ${priorityQueue.size()}")

    println("Is empty: ${priorityQueue.isEmpty()}")

    while (!priorityQueue.isEmpty())
    {
        println("Dequeued: ${priorityQueue.dequeue()}")
    }

    println("Is empty after dequeueing all: ${priorityQueue.isEmpty()}")
}