<?php
# Source: "PHP 7 Data Structures and Algorithms" by Mizanur Rahman

class ListNode {
    public $data = NULL;
    public $next = NULL;

    public function __construct(string $data = NULL) {
        $this->data = $data;
    }
}

class LinkedList implements Iterator {
    private $_firstNode = NULL;
    private $_totalNode = 0;
    private $_currentNode = NULL;
    private $_currentPosition = 0;

    public function insert(string $data = NULL) {
        $newNode = new ListNode($data);
        if ($this->_firstNode === NULL) {
            $this->_firstNode = &$newNode;
        } else {
            $currentNode = $this->_firstNode;
            while ($currentNode->next !== NULL) {
                $currentNode = $currentNode->next;
            }
            $currentNode->next = $newNode;
        }
        $this->_totalNode++;
        return True;
    }

    public function insertAtFirst(string $data = NULL) {
        $newNode = new ListNode($data);
        if ($this->_firstNode === NULL) {
            $this->_firstNode = &$newNode;
        } else {
            $currentFirstNode = $this->_firstNode;
            $this->_firstNode = &$newNode;
            $newNode->next = $currentFirstNode;
        }
        $this->_totalNode++;
        return True;
    }

    public function search(string $data = NULL) {
        if ($this->_totalNode) {
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($currentNode->data === $data) {
                    return $currentNode;
                }
                $currentNode = $currentNode->next;
            }
        }
        return False;
    }

    public function insertBefore(string $data = NULL, string $query = NULL) {
        $newNode = new ListNode($data);
        if ($this->_firstNode) {
            $previous = NULL;
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($currentNode->data === $query) {
                    $newNode->next = $currentNode;
                    $previous->next = $newNode;
                    $this->_totalNode++;
                    break;
                }
                $previous = $currentNode;
                $currentNode = $currentNode->next;
            }
        }
    }

    public function insertAfter(string $data = NULL, string $query = NULL) {
        $newNode = new ListNode($data);
        if ($this->_firstNode) {
            $nextNode = NULL;
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($currentNode->data === $query) {
                    if ($nextNode !== NULL) {
                        $newNode->next = $nextNode;
                    }
                    $currentNode->next = $newNode;
                    $this->_totalNode++;
                    break;
                }
                $currentNode = $currentNode->next;
                $nextNode = $currentNode->next;
            }
        }
    }

    public function deleteFirst() {
        if ($this->_firstNode !== NULL) {
            if ($this->_firstNode->next !== NULL) {
                $this->_firstNode = $this->_firstNode->next;
            } else {
                $this->_firstNode = NULL;
            }
            $this->_totalNode--;
            return True;
        }
        return False;
    }

    public function deleteLast() {
        if ($this->_firstNode !== NULL) {
            $currentNode = $this->_firstNode;
            if ($currentNode->next === NULL) {
                $this->_firstNode = NULL;
            } else {
                $previousNode = NULL;
                while ($currentNode->next !== NULL) {
                    $previousNode = $currentNode;
                    $currentNode = $currentNode->next;
                }
                $previousNode->next = NULL;
                $this->_totalNode--;
                return True;
            }
        }
        return False;
    }

    public function delete(string $query = NULL) {
        if ($this->_firstNode) {
            $previous = NULL;
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($currentNode->data === $query) {
                    if ($currentNode->next === NULL) {
                        $previous->next = NULL;
                    } else {
                        $previous->next = $currentNode->next;
                    }
                    $this->_totalNode--;
                    break;
                }
                $previous = $currentNode;
                $currentNode = $currentNode->next;
            }
        }
    }

    public function reverse() {
        if ($this->_firstNode !== NULL) {
            if ($this->_firstNode->next !== NULL) {
                $reversedList = NULL;
                $next = NULL;
                $currentNode = $this->_firstNode;
                while ($currentNode !== NULL) {
                    $next = $currentNode->next;
                    $currentNode->next = $reversedList;
                    $reversedList = $currentNode;
                    $currentNode = $next;
                }
                $this->_firstNode = $reversedList;
            }
        }
    }

    public function getNthNode(int $n = 0) {
        $count = 1;
        if ($this->_firstNode !== NULL && $n <= $this->_totalNode) {
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($count === $n) {
                    return $currentNode;
                }
                $count++;
                $currentNode = $currentNode->next;
            }
        }
    }

    public function display() {
        echo "Total book titles: " . $this->_totalNode . "\n";
        $currentNode = $this->_firstNode;
        while ($currentNode !== NULL) {
            echo $currentNode->data . "\n";
            $currentNode = $currentNode->next;
        }
    }

    public function getSize() {
        return $this->_totalNode;
    }

    public function current() {
        return $this->_currentNode->data;
    }

    public function next() {
        $this->_currentPosition++;
        $this->_currentNode = $this->_currentNode->next;
    }

    public function key() {
        return $this->_currentPosition;
    }

    public function rewind() {
        $this->_currentPosition = 0;
        $this->_currentNode = $this->_firstNode;
    }

    public function valid() {
        return $this->_currentNode !== NULL;
    }
}

$booktitles = new LinkedList();
$booktitles->insert("Introduction to Algorithm");
$booktitles->insert("Introduction to PHP and Data Structures");
$booktitles->insert("Programming Intelligence");
$booktitles->insertAtFirst("Mediawiki Administrative Tutorial Guide");
$booktitles->insertBefore("Introduction to Calculus", "Programming Intelligence");
$booktitles->insertAfter("Introduction to Calculus", "Programming Intelligence");

$booktitles->display();
$booktitles->deleteFirst();
$booktitles->deleteLast();
$booktitles->delete("Introduction to PHP and Data Structures");
$booktitles->reverse();
$booktitles->display();
?>