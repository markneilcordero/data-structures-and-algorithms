class CircularQueue
{
    constructor(capacity)
    {
        this.queue = new Array(capacity); // Array to store elements
        this.capacity = capacity; // Maximum size of the queue
        this.front = -1; // Points to the front element
        this.rear = -1; // Points to the rear element
        this.size = 0; // Current number of elements
    }

    // Enqueue: Add an element to the queue
    enqueue(element)
    {
        if (this.isFull())
        {
            console.log("Queue is full");
            return;
        }

        if (this.front === -1)
        {
            // Initialize front if the queue is empty
            this.front = 0;
        }

        this.rear = (this.rear + 1) % this.capacity; // Circular increment of rear
        this.queue[this.rear] = element; // Add the element
        this.size++;
    }

    // Dequeue: Remove an element from the queue
    dequeue()
    {
        if (this.isEmpty())
        {
            console.log("Queue is empty");
            return null;
        }

        const removedElement = this.queue[this.front]; // Get the front element
        this.queue[this.front] = undefined; // Clear the position
        this.front = (this.front + 1) % this.capacity; // Circular increment of front
        this.size--; // Decrement size

        if (this.size === 0)
        {
            // Reset pointers if the queue becomes empty
            this.front = -1;
            this.rear = -1;
        }

        return removedElement;
    }

    // Front: Return the front element without removing it
    getFront()
    {
        if (this.isEmpty())
        {
            console.log("Queue is empty");
            return null;
        }
        return this.queue[this.front];
    }

    // isEmpty: Check if the queue is empty
    isEmpty()
    {
        return this.size === 0;
    }

    // isFull: Check if the queue is full
    isFull()
    {
        return this.size === this.capacity;
    }

    // Size: Return the number of elements in the queue
    getSize()
    {
        return this.size;
    }

    displayQueue()
    {
        if (this.isEmpty())
        {
            console.log("Queue is empty");
            return;
        }

        let result = [];
        for (let i = 0; i < this.size; i++)
        {
            result.push(this.queue[(this.front + i) % this.capacity]);
        }
        console.log("Queue elements:", result.join(" -> "));
    }

    // Clear: Remove all elements from the queue
    clear()
    {
        this.queue = new Array(this.capacity);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    // Circular Traversal: Iterate over the queue multiple times
    circularTraversal(times)
    {
        if (this.isEmpty())
        {
            console.log("Queue is empty");
            return;
        }

        let result = [];
        for (let t = 0; t < times; t++)
        {
            for (let i = 0; i < this.size; i++)
            {
                result.push(this.queue[(this.front + i) % this.capacity]);
            }
        }
        console.log("Circular traversal:", result.join(" -> "));
    }    
}

const myQueue = new CircularQueue(5);
myQueue.enqueue(10);
myQueue.enqueue(20);
myQueue.enqueue(30);
console.log("After enqueuing:", myQueue.queue); // Output: [10, 20, 30, <empty>, <empty>]
console.log("Dequeued element:", myQueue.dequeue()); // Output: 10
console.log("After dequeuing:", myQueue.queue); // Output: [<empty>, 20, 30, <empty>, <empty>]
console.log("Front element:", myQueue.getFront()); // Output: 20
console.log("Is queue empty?", myQueue.isEmpty()); // Output: false
console.log("Is queue full?", myQueue.isFull()); // Output: false
console.log("Queue size:", myQueue.getSize()); // Output: 2
myQueue.displayQueue(); // Output: Queue elements: 20 -> 30
myQueue.clear();
console.log("After clearing:", myQueue.queue); // Output: [<empty>, <empty>, <empty>, <empty>, <empty>]
myQueue.enqueue(10);
myQueue.enqueue(20);
myQueue.circularTraversal(2); // Output: Circular traversal: 20 -> 30 -> 10 -> 20 -> 30 -> 10