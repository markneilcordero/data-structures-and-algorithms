class Node
{
    constructor(data)
    {
        this.data = data; // Value of the node
        this.next = null; // Pointer to the next node (null by default)
    }
}

class SinglyLinkedList
{
    constructor()
    {
        this.head = null; // Start of the list
        this.size = 0; // Total number nodes
    }

    // Append: Add a node at the end
    append(data)
    {
        const newNode = new Node(data); // Create a new node
        if (!this.head)
        {
            // If the list is empty, set head to the new node
            this.head = newNode;
        }
        else
        {
            let current = this.head;
            while (current.next)
            {
                // Traverse to the last node
                current = current.next;
            }
            current.next = newNode; // Link the last node to the new node
        }
        this.size++; // Increment the size
    }

    // Prepend: Add a node at the beginning
    prepend(data)
    {
        const newNode = new Node(data); // Create a new node
        newNode.next = this.head; // Link the new node to the current head
        this.head = newNode; // Update the head to the new node
        this.size++; // Increment the size
    }

    // Display List: Display all elements in the list
    displayList()
    {
        let current = this.head; // Start at the head
        while (current)
        {
            console.log(current.data); // Display the current node's value
            current = current.next; // Move to the next node
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
        let current = this.head; // Start at the head
        while (current)
        {
            if (current.data === data)
            {
                return true; // Value found
            }
            current = current.next; // Move to the next ndoe
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
            this.size--;
            return;
        }

        let current = this.head;
        let previous = null;

        while (current && current.data !== data)
        {
            // Traverse to find the node
            previous = current;
            current = current.next;
        }

        if (current)
        {
            previous.next = current.next; // Bypass the node
            this.size--;
        }
    }

    // Remove by Index: Delete a node at a specific position
    removeAt(index)
    {
        if (index < 0 || index >= this.size) return; // Invalid index

        if (index === 0)
        {
            this.head = this.head.next; // Remove the head
        }
        else
        {
            let current = this.head;
            let previous = null;
            let count = 0;

            while (count < index)
            {
                previous = current;
                current = current.next;
                count++;
            }

            previous.next = current.next; // Bypass the node
        }
        this.size--;
    }

    // Insert: Add a node at a specific index
    insertAt(index, data)
    {
        if (index < 0 || index > this.size) return; // Invalid index

        const newNode = new Node(data);

        if (index === 0)
        {
            // Insert at the beginning
            newNode.next = this.head;
            this.head = newNode;
        }
        else
        {
            let current = this.head;
            let previous = null;
            let count = 0;

            while (count < index)
            {
                previous = current;
                current = current.next;
                count++;
            }

            previous.next = newNode;
            newNode.next = current;
        }
        this.size++;
    }

    // Reverse: Reverse the order of the list
    reverse()
    {
        let previous = null;
        let current = this.head;
        let next = null;

        while (current)
        {
            next = current.next; // Store the next node
            current.next = previous; // Reverse the link
            previous = current; // Move previous forward
            current = next; // Move current forward
        }

        this.head = previous; // Update the head to the new front
    }

    // Get: Return the value at a specific index
    getAt(index)
    {
        if (index < 0 || index >= this.size) return null; // Invalid index

        let current = this.head;
        let count = 0;

        while (count < index)
        {
            current = current.next;
            count++;
        }

        return current.data; // Return the node's value
    }
}

const list = new SinglyLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5); // List is now: 5 -> 10 -> 20 -> 30
list.displayList();
console.log("Size of the list:", list.getSize()); //  Output: 4
console.log("Is 20 in the list?", list.search(20)); // Output: true
list.remove(20); // List is now: 5 -> 10 -> 30
list.removeAt(1); // List is now: 5 -> 30
list.insertAt(1, 25); // List is now: 5 -> 25 -> 30
list.reverse(); // List is now: 30 -> 25 -> 5
console.log("Value at index 1:", list.getAt(1)); // Output: 25