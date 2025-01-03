class Node<T>(var value: T)
{
    var next: Node<T>? = null; // Pointer to the next code
}

class SinglyLinkedList<T>
{
    private var head: Node<T>? = null // Head node of the list

    // Add a node at the beginning
    fun addAtBeginning(value: T)
    {
        val newNode = Node(value)
        newNode.next = head
        head = newNode
        println("Added $value at the beginning.")
    }

    // Add a node at the end
    fun addAtEnd(value: T)
    {
        val newNode = Node(value)
        if (head == null)
        {
            head = newNode
        }
        else
        {
            var current = head
            while (current?.next != null)
            {
                current = current.next
            }
            current?.next = newNode
        }
        println("Added $value at the end.")
    }

    // Traverse the list and display elements
    fun display()
    {
        if (head == null)
        {
            println("The list is empty.")
            return
        }
        var current = head
        while (current != null)
        {
            print("${current.value} -> ")
            current = current.next
        }
        println("null")
    }

    fun addAtPosition(position: Int, value: T)
    {
        if (position == 0)
        {
            addAtBeginning(value)
            return
        }

        val newNode = Node(value)
        var current = head
        var count = 0

        while (current != null && count < position - 1)
        {
            current = current.next
            count++
        }

        if (current == null)
        {
            println("Position $position is out of bounds.")
            return
        }

        newNode.next = current.next
        current.next = newNode
        println("Added $value at position $position.")
    }

    fun search(value: T): Boolean
    {
        var current = head
        while (current != null)
        {
            if (current.value == value)
            {
                return true
            }
            current = current.next
        }
        return false
    }

    fun deleteByValue(value: T)
    {
        if (head == null)
        {
            println("The list is empty.")
            return
        }

        if (head?.value == value)
        {
            head = head?.next
            println("Deleted $value from the list.")
            return
        }

        var current = head
        while (current?.next != null && current.next?.value != value)
        {
            current = current.next
        }

        if (current?.next == null)
        {
            println("$value not found in the list.")
        }
        else
        {
            current.next = current.next?.next
            println("Deleted $value from the list.")
        }
    }

    fun reverse()
    {
        var prev: Node<T>? = null
        var current = head
        var next: Node<T>?

        while (current != null)
        {
            next = current.next
            current.next = prev
            prev = current
            current = next
        }
        head = prev
        println("Reversed the list.")
    }

    fun findMiddle(): T?
    {
        var slow = head
        var fast = head

        while (fast != null && fast.next != null)
        {
            slow = slow?.next
            fast = fast.next?.next
        }
        return slow?.value
    }
}

fun main()
{
    val list = SinglyLinkedList<Int>()

    list.addAtBeginning(10)
    list.addAtEnd(20)
    list.addAtEnd(30)
    list.addAtPosition(1, 15)

    println("\nLinked List:")
    list.display()

    val searchValue = 20
    println("\nSearching for $searchValue: ${if (list.search(searchValue)) "Found" else "Not Found"}")

    list.deleteByValue(15)
    println("\nAfter deleting 15:")
    list.display()

    println("\nMiddle Element: ${list.findMiddle()}")

    list.reverse()
    println("\nAfter reversing:")
    list.display()
}