class DoublyNode(var value: Int)
{
    var prev: DoublyNode? = null // Pointer to the previous node
    var next: DoublyNode? = null // Pointer to the next node
}

class DoublyLinkedList
{
    private var head: DoublyNode? = null // Head of the list
    private var tail: DoublyNode? = null // Tail of the list

    fun insertAtHead(value: Int)
    {
        val newNode = DoublyNode(value)
        if (head == null)
        {
            head = newNode
            tail = newNode
        }
        else
        {
            newNode.next = head
            head?.prev = newNode
            head = newNode
        }
        println("Inserted $value at head.")
    }

    fun insertAtTail(value: Int)
    {
        val newNode = DoublyNode(value)
        if (tail == null)
        {
            head = newNode
            tail = newNode
        }
        else
        {
            newNode.prev = tail
            tail?.next = newNode
            tail = newNode
        }
        println("Inserted $value at tail.")
    }

    fun printListForward()
    {
        println("List (Head to Tail):")
        var current = head
        while (current != null)
        {
            println("${current.value}")
            current = current.next
        }
        println()
    }

    fun printListBackward()
    {
        println("List (Tail to Head):")
        var current = tail
        while (current != null)
        {
            print("${current.value}")
            current = current.prev
        }
        println()
    }

    fun search(value: Int): Boolean
    {
        var current = head
        while (current != null)
        {
            if (current.value == value)
            {
                println("Value $value found in the list.")
                return true
            }
            current = current.next
        }
        println("Value $value not found in the list.")
        return false
    }

    fun deleteNode(value: Int)
    {
        var current = head

        while (current != null)
        {
            if (current.value == value)
            {
                if (current.prev != null)
                {
                    current.prev?.next = current.next
                }
                else
                {
                    head = current.next
                }

                if (current.next != null)
                {
                    current.next?.prev = current.prev
                }
                else
                {
                    tail = current.prev
                }

                println("Deleted node with value $value.")
                return
            }
            current = current.next
        }
        println("Node with value $value not found.")
    }

    fun getSize(): Int
    {
        var size = 0
        var current = head
        while (current != null)
        {
            size++
            current = current.next
        }
        return size
    }

    fun insertAtPosition(position: Int, value: Int)
    {
        if (position < 1)
        {
            println("Invalid position!")
            return
        }

        val newNode = DoublyNode(value)
        if (position == 1)
        {
            insertAtHead(value)
            return
        }

        var current = head
        var index = 1
        while (current != null && index < position - 1)
        {
            current = current.next
            index++
        }

        if (current == null)
        {
            println("Position out of bounds.")
            return
        }

        newNode.next = current.next
        newNode.prev = current
        current.next?.prev = newNode
        current.next = newNode
        println("Inserted $value at position $position.")
    }

    fun reverse()
    {
        var current = head
        var temp: DoublyNode? = null
        while (current != null)
        {
            temp = current.prev
            current.prev = current.next
            current.next = temp
            current = current.prev
        }
        if (temp != null)
        {
            head = temp.prev
        }
        println("Reversed the list.")
    }
}

fun main()
{
    val list = DoublyLinkedList()

    list.insertAtHead(10)
    list.insertAtTail(20)
    list.insertAtTail(30)
    list.insertAtHead(5)
    list.printListForward() // Output: 5 10 20 30

    list.search(10) // Output: Value 10 found in the list.
    list.search(50) // Output: Value 50 not found in the list.

    list.insertAtPosition(3, 15) // Insert 15 at position 3
    list.printListForward() // Output: 5 10 15 20 30

    list.deleteNode(15) // Output: Deleted node with value 15.
    list.printListForward() // Output: 5 10 20 30

    println("Size of the list: ${list.getSize()}") // Output: Size of the list: 4

    list.printListBackward() // Output: 30 20 10 5

    list.reverse()
    list.printListForward() // Output: 30 20 10 5
}