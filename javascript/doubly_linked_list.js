class DoublyNode
{
    constructor(data)
    {
        this.data = data; // Value of the node
        this.next = null; // Pointer to the next node
        this.prev = null; // Pointer to the previous node
    }
}

class DoublyLinkedList
{
    constructor()
    {
        this.head = null; // Start of the list
        this.tail = null; // End of the list
        this.size = 0; // Total number of nodes
    }

    // Append: Add a node at the end
    append(data)
    {
        const newNode = new DoublyNode(data); // Create a new node
        if (!this.head)
        {
            // If the list is empty, set head and tail to the new node
            this.head = this.tail = newNode;
        }
        else
        {
            this.tail.next = newNode; // Link the current tail to the new node
            newNode.prev = this.tail; // Link the new node back to the current tail
            this.tail = newNode; // Update the tail to the new node
        }
        this.size++; // Increment the size of the list
    }

    // Prepend: Add a node at the beginning
    prepend(data)
    {
        const newNode = new DoublyNode(data); // Create a new node
        if (!this.head)
        {
            // If the list is empty, set head and tail to the new node
            this.head = this.tail = newNode;
        }
        else
        {
            newNode.next = this.head; // Link the new node to the current head
            this.head.prev = newNode; // Link the current head back to the new node
            this.head = newNode; // Update the head to the new node
        }
        this.size++; // Increment the size of the list
    }

    // Display Forward: Display elements from head to tail
    displayForward()
    {
        let current = this.head;
        console.log("List (Forward):");
        while (current)
        {
            console.log(current.data);
            current = current.next;
        }
    }

    // Display Backward: Display elements from tail to head
    displayBackward()
    {
        let current = this.tail;
        console.log("List (Backward):");
        while (current)
        {
            console.log(current.data);
            current = current.prev;
        }
    }

    // Get Size: Return the number of nodes in the list
    getSize()
    {
        return this.size;
    }

    // Search: Check if a value exists in the list
    search(data)
    {
        let current = this.head;
        while (current)
        {
            if (current.data === data)
            {
                return true; // Value found
            }
            current = current.next;
        }
        return false; // Value not found
    }

    // Remove: Delete the first occurence of a value
    remove(data)
    {
        if (!this.head) return; // If the list is empty, do nothing

        if (this.head.data === data)
        {
            // If the head is the node to remove
            this.head = this.head.next; // Update the head
            if (this.head) this.head.prev = null; // Clear the previous pointer
            else this.tail = null; // If the list is now empty, clear the tail
            this.size--;
            return;
        }
        let current = this.head;

        while (current && current.data !== data)
        {
            current = current.next;
        }

        if (current)
        {
            // Node found
            if (current.next) current.next.prev = current.prev; // Update next node's pointer
            else this.tail = current.prev; // If it's the tail, update the tail
            if (current.prev) current.prev.next = current.next; // Update previous node's next pointer
            this.size--;
        }
    }

    // Insert: Add a ndoe at a specific index
    insertAt(index, data)
    {
        if (index < 0 || index > this.size) return; // Invalid index

        const newNode = new DoublyNode(data);

        if (index === 0)
        {
            // Insert at the beginning
            this.prepend(data);
        }
        else if (index === this.size)
        {
            // Insert at the end
            this.append(data);
        }
        else
        {
            let current = this.head;
            let count = 0;

            while (count < index)
            {
                current = current.next;
                count++;
            }
            newNode.next = current; // Link new node to current node
            newNode.prev = current.prev; // Link new node back to previous node
            current.prev.next = newNode; // Update previous node's next pointer
            current.prev = newNode; // Update current node's previous pointer
            this.size++;
        }
    }

    // Reverse: Reverse the order of the list
    reverse()
    {
        let current = this.head;
        let temp = null;
        while (current)
        {
            temp = current.prev; // Swap previous and next pointers
            current.prev = current.next;
            current.next = temp;
            current = current.prev; // Move to the next node (which is now the previous node)
        }

        if (temp)
        {
            this.head = temp.prev; // Update the head to the new front
        }
    }
}

const list = new DoublyLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5); // List is now: 5 -> 10 -> 20 -> 30
list.displayForward();
list.displayBackward();
console.log("Size of the list:", list.getSize()); // Output: 4
console.log("Is 20 in the list?", list.search(20)); // Output: true
list.remove(20); // List is now: 5 -> 10 -> 30
list.insertAt(1, 15); // List is now: 5 -> 15 -> 10 -> 30
list.reverse(); // List is now reversed
list.displayForward(); // Prints reversed list