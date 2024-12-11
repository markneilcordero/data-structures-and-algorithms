import java.util.Arrays;
public class DynamicArray<T> {
    private Object[] array; // Underlying array to store elements
    private int size; // Current number of elements

    // Constructor to initialize the array with an initial capacity
    public DynamicArray()
    {
        this.array = new Object[2]; // Initial capacity of 2
        this.size = 0;
    }

    // Add an element to the end
    public void add(T element)
    {
        if (size == array.length)
        {
            resize(); // Resize the array if it's full
        }
        array[size] = element;
        size++;
    }

    // Get an element by index
    @SuppressWarnings("unchecked")
    public T get(int index)
    {
        if (index < 0 || index >= size)
        {
            throw new IndexOutOfBoundsException("Index " + index + " is out of bounds");
        }
        return (T) array[index];
    }

    // Get the number of elements
    public int size()
    {
        return size;
    }

    // Check if the array is empty
    public boolean isEmpty()
    {
        return size == 0;
    }

    // Remove an element by index
    public T removeAt(int index)
    {
        if (index < 0 || index >= size)
        {
            throw new IndexOutOfBoundsException("Index " + index + " is out of bounds");
        }
        @SuppressWarnings("unchecked")
        T removedElement = (T) array[index];
        for (int i = index; i < size - 1; i++)
        {
            array[i] = array[i + 1]; // Shift elements to the left
        }
        array[size - 1] = null; // Clear the last element
        size--;
        return removedElement;
    }

    // Clear all elements
    public void clear()
    {
        Arrays.fill(array, 0, size, null);
        size = 0;
    }

    // Check if the array contains an element
    public boolean contains(T element)
    {
        for (int i = 0; i < size; i++)
        {
            if (array[i].equals(element))
            {
                return true;
            }
        }
        return false;
    }

    // Insert an element at a specific index
    public void insertAt(int index, T element)
    {
        if (index < 0 || index > size)
        {
            throw new IndexOutOfBoundsException("Index " + index + " is out of bounds");
        }
        if (size == array.length)
        {
            resize(); // Resize the array if it's full
        }
        for (int i = size; i > index; i--)
        {
            array[i] = array[i - 1]; // Shift elements to the right
        }
        array[index] = element;
        size++;
    }

    // Resize the array to twice its current capacity
    private void resize()
    {
        int newCapacity = array.length * 2;
        array = Arrays.copyOf(array, newCapacity);
    }

    // Traverse and print all elements
    public void traverse()
    {
        for (int i = 0; i < size; i++)
        {
            System.out.println(array[i] + " ");
        }
        System.out.println();
    }
}
