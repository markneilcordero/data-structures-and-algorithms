fun initializeArray()
{
    // Initialize a 2D array with default values (0)
    val array = Array(3) { IntArray(3) }

    // Initialize a 2D array with predefined values
    val predefinedArray = arrayOf(
        intArrayOf(1, 2, 3),
        intArrayOf(4, 5, 6),
        intArrayOf(7, 8, 9)
    )

    println("Default Array: ${array.contentDeepToString()}")
    println("Predefined Array: ${predefinedArray.contentDeepToString()}")
}

fun accessAndUpdateElements()
{
    val array = Array(3) { IntArray(3) }

    // Update element at position (1, 2)
    array[1][2] = 42
    println("Updated Array: ${array.contentDeepToString()}")

    // Access element at position (1, 2)
    val element = array[1][2]
    println("Element at (1, 2): $element")
}

fun iterateArray()
{
    val array = arrayOf(
        intArrayOf(1, 2, 3),
        intArrayOf(4, 5, 6),
        intArrayOf(7, 8, 9)
    )

    println("Iterating over the array:")
    for (row in array)
    {
        for (col in row)
        {
            print("$col ")
        }
        println()
    }
}

fun rowAndColumnOperations()
{
    val array = arrayOf(
        intArrayOf(1, 2, 3),
        intArrayOf(4, 5, 6),
        intArrayOf(7, 8, 9)
    )

    // Calculate the sum of each row
    for ((index, row) in array.withIndex())
    {
        val rowSum = row.sum()
        println("Sum of row $index: $rowSum")
    }

    // Calculate the sum of each column
    for (col in 0 until array[0].size)
    {
        var colSum = 0
        for (row in array)
        {
            colSum += row[col]
        }
        println("Sum of column $col: $colSum")
    }
}

fun matrixAddition()
{
    val matrix1 = arrayOf(
        intArrayOf(1, 2, 3),
        intArrayOf(4, 5, 6),
        intArrayOf(7, 8, 9)
    )

    val matrix2 = arrayOf(
        intArrayOf(9, 8, 7),
        intArrayOf(6, 5, 4),
        intArrayOf(3, 2, 1)
    )

    val result = Array(matrix1.size) { IntArray(matrix1[0].size) }

    for (i in matrix1.indices)
    {
        for (j in matrix1[i].indices)
        {
            result[i][j] = matrix1[i][j] + matrix2[i][j]
        }
    }

    println("Matrix Additional Result: ${result.contentDeepToString()}")
}

fun main()
{
    println("Step 1: Initialize Arrays")
    initializeArray()

    println("\nStep 2: Access and Update Elements")
    accessAndUpdateElements()

    println("\nStep 3: Iterate Over the Array")
    iterateArray()

    println("\nStep 4: Perform Row and Column Operations")
    rowAndColumnOperations()

    println("\nStep 5: Perform Matrix Addition")
    matrixAddition()
}