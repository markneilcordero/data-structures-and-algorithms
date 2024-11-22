class Node
{
    constructor(data)
    {
        this.data = data; // Value of the node
        this.next = null; // Pointer to the next node
    }
}

class CircularLinkedList
{
    constructor()
    {
        this.head = null; // Start of the list
        this.size = 0; // Total number of nodes
    }

    // Append: Add a node at the end
    append(data)
    {
        const newNode = new Node(data); // Create a new node
        if (!this.head)
        {
            // If the list is empty, set head to the new node and form a circle
            this.head = newNode;
            newNode.next = this.head;
        }
        else
        {
            let current = this.head;
            while (current.next !== this.head)
            {
                // Traverse to the last node
                current = current.next;
            }
            current.next = newNode; // Link the last node to the new node
            newNode.next = this.head; // Link the new node back to the head
        }
        this.size++; // Increment the size
    }

    // Prepend: Add a node at the beginning
    prepend(data)
    {
        const newNode = new Node(data); // Create a new node
        if (!this.head)
        {
            // If the list is empty, set head to the new node and form a circle
            this.head = newNode;
            newNode.next = this.head;
        }
        else
        {
            let current = this.head;
            while (current.next !== this.head)
            {
                // Traverse to the last node
                current = current.next;
            }
            newNode.next = this.head; // Link the new node to the current head
            current.next = newNode; // Link the last node to the new node
            this.head = newNode; // Update the head to the new node
        }
        this.size++; // Increment the size
    }

    // Display List: Display all elements in the list
    displayList()
    {
        if (!this.head)
        {
            console.log("List is empty");
            return;
        }

        let current = this.head;
        console.log("Circular Linked List:");
        do
        {
            console.log(current.data); // Print the current node's value
            current = current.next; // Move to the next node
        }
        while (current !== this.head); // Stop when back at the head
    }

    // Get Size: Return the number of nodes in the list
    getSize()
    {
        return this.size;
    }

    // Search: Check if a value exists in the list"
    search(data)
    {
        if (!this.head) return false; // If the list is empty, return false

        let current = this.head;
        do
        {
            if (current.data === data)
            {
                return true; // Value found
            }
            current = current.next;
        }
        while (current !== this.head); // Stop when back at the head

        return false; // Value not found;
    }

    // Remove: Delete the first occurrence of a value
    remove(data)
    {
        if (!this.head) return; // If the list is empty, do nothing

        let current = this.head;
        let previous = null;

        do
        {
            if (current.data === data)
            {
                if (previous)
                {
                    previous.next = current.next; // Bypass the current node
                    if (current === this.head)
                    {
                        // Update head if it's the node being removed
                        this.head = current.next;
                    }
                }
                else
                {
                    // If removing the head node
                    let last = this.head;
                    while (last.next !== this.head)
                    {
                        last = last.next;
                    }
                    if (this.head === this.head.next)
                    {
                        // If there's only one node
                        this.head = null;
                    }
                    else
                    {
                        last.next = this.head.next; // Update the last node to point to the next head
                        this.head = this.head.next; // Update the head
                    }
                }
                this.size--;
                return;
            }
            previous = current;
            current = current.next;
        }
        while (current !== this.head);
    }

    // Insert: Add a node at a specific index
    insertAt(index, data)
    {
        if (index < 0 || index > this.size) return; // Invalid index

        const newNode = new Node(data);

        if (index === 0)
        {
            this.prepend(data);
        }
        else
        {
            let current = this.head;
            let count = 0;

            while (count < index - 1)
            {
                current = current.next;
                count++;
            }

            newNode.next = current.next; // Link new node to the next node
            current.next = newNode; // Link current node to the new node
            this.size++;
        }
    }

    // Traverse Continously: Loop through the list a given number of times
    traverse(times)
    {
        if (!this.head) return;

        let current = this.head;
        for (let i = 0; i < times * this.size; i++)
        {
            console.log(current.data);
            current = current.next;
        }
    }
}

const list = new CircularLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5); // List is now: 5 -> 10 -> 20 -> 30 -> (back to 5)
list.displayList();
console.log("Size of the list:", list.getSize()); // Output: 4
console.log("Is 20 in the list?", list.search(20)); // Output: true
list.remove(20); // List is now: 5 -> 10 -> 30 -> (back to 5)
list.insertAt(1, 15); // List is now: 5 -> 15 -> 10 -> 30 -> (back to 5)
list.traverse(2); // Loops through the list twice