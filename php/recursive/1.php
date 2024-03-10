<?php
function factorialx(int $n): int {
    if ($n == 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}
factorialx(5);
factorialx(4);
factorialx(3);
factorialx(2);
factorialx(1);

function factorial(int $n): int {
    $result = 1;
    for ($i = $n; $i > 0; $i--) {
        $result *= $i;
    }
    return $result;
}
factorial(5);
factorial(4);
factorial(3);
factorial(2);
factorial(1);
?>