//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main
{
    public static void main(String[] args)
    {
        DynamicArray<Integer> dynamicArray = new DynamicArray<>();

        System.out.println("Adding elements:");
        dynamicArray.add(10);
        dynamicArray.add(20);
        dynamicArray.traverse(); // Output: 10 20

        System.out.println("\nElement at index 1: " + dynamicArray.get(1)); // Output: 20

        System.out.println("\nSize of the array: " + dynamicArray.size()); // Output: 2
        System.out.println("Is the array empty? " + dynamicArray.isEmpty()); // Output: false

        System.out.println("\nRemoving element at index 0:");
        dynamicArray.removeAt(0);
        dynamicArray.traverse(); // Output: 20

        System.out.println("\nClearing the array:");
        dynamicArray.clear();
        dynamicArray.traverse(); // Output: (empty line)

        System.out.println("\nAdding more elements:");
        dynamicArray.add(30);
        dynamicArray.add(40);
        dynamicArray.insertAt(1, 35);
        dynamicArray.traverse(); // Output: 30 35 40

        System.out.println("\nDoes the array contain 30? " + dynamicArray.contains(30)); // Output: true
        System.out.println("Does the array contain 50? " + dynamicArray.contains(50)); // Output: false
    }
}