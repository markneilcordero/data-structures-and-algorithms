class CircularNode(var value: Int)
{
    var next: CircularNode? = null // Pointer to the next node
}

class CircularLinkedList
{
    private var tail: CircularNode? = null // Tail points to the last node, whose next points to the head

    fun insertAtHead(value: Int)
    {
        val newNode = CircularNode(value)
        if (tail == null)
        {
            tail = newNode
            tail!!.next = newNode // Make the list circular
        }
        else
        {
            newNode.next = tail!!.next
            tail!!.next = newNode
        }
        println("Inserted $value at the head.")
    }

    fun insertAtTail(value: Int)
    {
        val newNode = CircularNode(value)
        if (tail == null)
        {
            tail = newNode
            tail!!.next = newNode // Make the list circular
        }
        else
        {
            newNode.next = tail!!.next
            tail!!.next = newNode
            tail = newNode // Update tail to the new last node
        }
        println("Inserted $value at the tail.")
    }

    fun traverse()
    {
        if (tail == null)
        {
            println("The list is empty.")
            return
        }
        var current = tail!!.next
        print("Circular Linked List: ")
        do
        {
            print("${current!!.value} -> ")
            current = current.next
        } while (current != tail!!.next)
        println("(back to head)")
    }

    fun deleteAtPosition(position: Int)
    {
        if (tail == null)
        {
            println("The list is empty.")
            return
        }
        if (position == 1)
        {
            // Deleting the head node
            if (tail!!.next == tail)
            {
                tail = null // Only one node in the list
            }
            else
            {
                tail!!.next = tail!!.next!!.next // Point tail to the new head
            }
            println("Deleted node at position $position")
            return
        }

        var current = tail!!.next
        var prev: CircularNode? = null
        var count = 1

        do
        {
            if (count == position)
            {
                prev!!.next = current!!.next
                if (current == tail)
                {
                    tail = prev // update tail if the last node is deleted
                }
                println("Deleted node at position $position")
                return
            }
            prev = current
            current = current!!.next
            count++
        } while (current != tail!!.next)

        println("Position $position is out of bounds.")
    }

    fun search(value: Int): Boolean
    {
        if (tail == null) return false

        var current = tail!!.next
        do
        {
            if (current!!.value == value) return true
            current = current.next
        } while (current != tail!!.next)

        return false
    }

    fun countNodes(): Int
    {
        if (tail == null) return 0

        var count = 0
        var current = tail!!.next
        do
        {
            count++
            current = current!!.next
        } while (current != tail!!.next)

        return count
    }

    fun reverse()
    {
        if (tail == null || tail!!.next == tail) return // If the list is empty or has one node

        var prev: CircularNode? = null
        var current = tail!!.next
        val head = tail!!.next

        do
        {
            val next = current!!.next
            current.next = prev
            prev = current
            current = next
        } while (current != head)

        tail!!.next = prev
        tail = head
        println("Circular Linked List reversed.")
    }
}

fun main()
{
    val circularLinkedList = CircularLinkedList()

    circularLinkedList.insertAtHead(10)
    circularLinkedList.insertAtTail(20)
    circularLinkedList.insertAtTail(30)
    circularLinkedList.insertAtHead(5)
    circularLinkedList.traverse() // Output: 5 -> 10 -> 20 -> 30 -> (back to head)

    println("Search for 20: ${if (circularLinkedList.search(20)) "Found" else "Not Found"}") // Output: Found
    println("Search for 40: ${if (circularLinkedList.search(40)) "Found" else "Not Found"}") // Output: Not Found

    circularLinkedList.deleteAtPosition(2)
    circularLinkedList.traverse() // Output: 5 -> 20 -> 30 -> (back to head)

    println("Number of nodes: ${circularLinkedList.countNodes()}") // Output: 3

    circularLinkedList.reverse()
    circularLinkedList.traverse() // Output: 30 -> 20 -> 5 -> (back to head)
}