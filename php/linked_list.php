<?php
class ListNode {
    public $data = NULL;
    public $next = NULL;

    public function __construct(string $data = NULL) {
        $this->data = $data;
    }
}

class LinkedList {
    private $_firstNode = NULL;
    private $_totalNodes = 0;

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
        $this->_totalNodes++;
        return TRUE;
    }

    public function display() {
        echo "Total book titles: " . $this->_totalNodes . "\n";
        $currentNode = $this->_firstNode;
        while ($currentNode !== NULL) {
            echo $currentNode->data . "\n";
            $currentNode = $currentNode->next;
        }
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
        $this->_totalNodes++;
        return TRUE;
    }

    public function search(string $data = NULL) {
        if ($this->_totalNodes) {
            $currentNode = $this->_firstNode;
            while ($currentNode !== NULL) {
                if ($currentNode->data === $data) {
                    return $currentNode;
                }
                $currentNode = $currentNode->next;
            }
        }
        return FALSE;
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
                    $this->_totalNodes++;
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
                    $this->_totalNodes++;
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
            $this->_totalNodes--;
            return TRUE;
        }
        return FALSE;
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
                $this->_totalNodes--;
                return TRUE;
            }
        }
        return FALSE;
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
                    $this->_totalNodes--;
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
        if ($this->_firstNode !== NULL) {
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
}

$BookTitles = new LinkedList();
$BookTitles->insert("Introduction to Algorithm");
$BookTitles->insert("Introduction to PHP and Data Structures");
$BookTitles->insert("Programming Intelligence");
$BookTitles->insertAtFirst("Mediawiki Administrative tutorial guide");
$BookTitles->insertBefore("Introduction to Calculus", "Programming Intelligence");
$BookTitles->insertAfter("Introduction to Calculus", "Programming Intelligence");
$BookTitles->display();
$BookTitles->deleteFirst();
$BookTitles->deleteLast();
$BookTitles->delete("Introduction to PHP and Data Structures");
$BookTitles->reverse();
$BookTitles->display();
echo "2nd Item is: " . $BookTitles->getNthNode(2)->data;
?>