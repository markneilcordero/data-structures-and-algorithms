<?php declare(strict_types=1);
final Class Greeter
{
    public function greet(string $name): string
    {
        return 'Hello, ' . $name . "!";
    }
}