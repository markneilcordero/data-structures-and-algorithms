class PriorityQueue
{
    constructor()
    {
        this.queue = []; // Array to store the elements of the priority queue
    }

    enqueue(value, priority)
    {
        const newItem = { value, priority };

        // Find the correct position for the new item
        let added = false;
        for (let i = 0; i < this.queue.length; i++)
        {
            if (this.queue[i].priority > priority)
            {
                this.queue.splice(i, 0, newItem); // Insert at the correct position
                added = true;
                break;
            }
        }

        if (!added)
        {
            // If the item has the lowest priority, add it to the end
            this.queue.push(newItem);
        }

        console.log(`Enqueued: { value: ${value}, priority: ${priority} }`);
    }

    dequeue()
    {
        if (this.isEmpty())
        {
            console.log("Priority Queue is empty. Cannot dequeue.");
            return null;
        }

        const item = this.queue.shift(); // Remove the first element
        console.log(`Dequeued: { value: ${item.value}, priority: ${item.priority} }`);
        return item;
    }

    peek()
    {
        if (this.isEmpty())
        {
            console.log("Priority Queue is empty. Nothing to peek.");
            return null;
        }

        return this.queue[0];
    }

    isEmpty()
    {
        return this.queue.length === 0;
    }

    size()
    {
        return this.queue.length;
    }

    changePriority(value, newPriority)
    {
        let index = this.queue.findIndex(item => item.value === value);

        if (index === -1)
        {
            console.log(`Element with value ${value} not found.`);
            return false;
        }

        // Remove the element and reinsert it with the new priority
        this.queue.splice(index, 1);
        this.enqueue(value, newPriority);
        console.log(`Updated priority of ${value} to ${newPriority}.`);
        return true;
    }

    display()
    {
        if (this.isEmpty())
        {
            console.log("Priority Queue is empty.");
            return;
        }

        console.log("Priority Queue elements (value, priority):");
        this.queue.forEach(item => {
            console.log(`{value: ${item.value}, priority: ${item.priority} }`);
        });
    }
}

const pq = new PriorityQueue();
pq.enqueue("A", 3);
pq.enqueue("B", 1);
pq.enqueue("C", 2);

pq.display(); // Output: B, C, A

pq.dequeue(); // Removes B
pq.display(); // Output: C, A

console.log("Peek:", pq.peek()); // Output: C

pq.changePriority("A", 0); // Updates A's priority
pq.display(); // Output: A, C

console.log("Queue size:", pq.size()); // Output: 2