const flashcardContainer = document.getElementById("flashcard-container");

// Array of questions and answers (code snippets)

//----------------------------------- ARRAY SECTION ---------------------------------------------------//
const flashcards = [
    { question: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.", 

answer: `
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;

    for (int i = 0; i < nums.size(); i++) {
        if (seen.find(nums[i]) != seen.end())
            return true;
        seen.insert(nums[i]);
    }

    return false;
}`
},
    { 
        question: "Do binary search!", 
        answer: 
        `
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) 
            return mid;

        if (arr[mid] < target) 
            left = mid + 1;

        else right = mid - 1;
    }
    return -1;
}` 
    },
    { 
        question: "Given two strings s and t, return true if t is an anagram of s, and false otherwise",
        answer: 
`
bool isAnagram(string s, string t) {
    if (s.size() != t.size())
        return false;
    
    vector<int> freq(26, 0);

    for (int i = 0; i < s.size(); i++) {
        freq[s[i] - 'a']++;
        freq[t[i] - 'a']--;
    }

    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0)
            return false;
    }
    return true;
}

`
    }, 

 // ----------------------------------- STACK SECTION ---------------------------------------------------//   
    {
        question: 
        "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.", 

        answer: `
void backtrack(int opened, int closed, int n, 
                string &stack, vector<string> &res) {

    if (opened == closed && opened == n) {
        res.push_back(stack);
    }

    if (opened < n) {
        stack += '(';

        backtrack(opened + 1, closed, n, stack, res);

        // remove the ( so we can explore more possibilities
        stack.pop_back(); 
    }

    if (closed < opened) {
        stack += ')';

        backtrack(opened, closed + 1, n, stack, res);

        stack.pop_back();
    }
}
vector<string> generateParenthesis(int n) {
    string stack;
    vector<string> result;

    backtrack(0, 0, n, stack, result);

    return result;
}
`
    },{
        question: 
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", 
        answer: `
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int i = 0; i < nums.size(); i++) {

        int complement = target - nums[i];

        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }

        seen[nums[i]] = i; // set the value to the index
    }
    return {};
}`
    },{
        question:
        "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2. The tests are generated such that there is exactly one solution. You may not use the same element twice. Your solution must use only constant extra space."
        , answer: `
vector<int> twoSumTwo(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    vector<int> result(2, 0);

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            result[0] = left + 1;
            result[1] = right + 1;
            return result;
        } 

        if (target < sum)
            right--;
        else
            left++;
    }

    return result;
}`
    },{
        question:
        "3Sum",
        answer: `

        `
    },
    {
        question: 
        "Given a string s, find the length of the longest substring without repeating characters.", 
        answer: `
int lengthOfLongestSubstring(string s) {

        unordered_set<char> sub;

        int l = 0;
        int lmax = 1, curr;

        for (int r = 0; r < s.size(); r++) {
            sub.insert(s[r]);

            while (sub.find(s[r]) != sub.end()) {
                curr = r - l; 

                sub.erase(s[r]);

                lmax = max(lmax, curr);

                l++;
            }
        }

        return lmax;
    }
`
    },
    
    
    //----------------------------------- LINKED LIST SECTION ---------------------------------------------------//
    
    {
        question: "Merge two sorted linked lists and return it as a sorted list.",
        answer: `
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Edge case
        if (list1 == nullptr) return list2;
        if (list2 == nullptr) return list1;

        // Initialize the head node and the current node
        ListNode* head = new ListNode(-1);
        ListNode* curr = head;

        // Merge the two lists while both are non-empty
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val < list2->val) {
                curr->next = list1;  // Append list1 node
                list1 = list1->next; // Move list1 pointer
            } else {
                curr->next = list2;  // Append list2 node
                list2 = list2->next; // Move list2 pointer
            }
            curr = curr->next; // Move curr to the newly added node
        }

        // If one list is not empty, append it to the result
        if (list1 != nullptr) {
            curr->next = list1;
        } else {
            curr->next = list2;
        }

        // Return the merged list starting from the next node after head
        return head->next;
    }
};
        `
    }

];

// Function to create a flashcard
function createFlashcard(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("front");
    front.innerHTML = `<p>${card.question}</p>`;

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<pre><code class="language-javascript">${Prism.highlight(card.answer, Prism.languages.javascript, 'javascript')}</code></pre>`;

    cardElement.appendChild(front);
    cardElement.appendChild(back);
    flashcardContainer.appendChild(cardElement);

    cardElement.addEventListener("click", function () {
        cardElement.style.transform = "rotateY(180deg)";
    });

    return cardElement;
}

// Shuffle the flashcards
function shuffleCards() {
    const shuffledCards = [...flashcards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
}

// Display the first flashcard
let currentCardIndex = 0;
let flashcardElements = [];
let cardFlipped = false;  // Track if the current card is flipped
let spacePressTimeout;  // Timer for double space press detection

function displayNextCard() {
    flashcardContainer.innerHTML = "";  // Clear the current flashcard
    const shuffledCards = shuffleCards();  // Shuffle and get the next card
    if (currentCardIndex < shuffledCards.length) {
        const newCard = createFlashcard(shuffledCards[currentCardIndex]);
        flashcardElements.push(newCard);
        currentCardIndex++;
    } else {
        currentCardIndex = 0;  // Restart the loop when all cards have been shown
        const newCard = createFlashcard(shuffledCards[currentCardIndex]);
        flashcardElements.push(newCard);
    }
}

// Handle spacebar presses
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        if (spacePressTimeout) {
            clearTimeout(spacePressTimeout);  // Clear the previous timeout if space was pressed again
        }

        // Check if the card is flipped or not
        if (!cardFlipped) {
            // Flip the card if not flipped yet
            const card = flashcardElements[flashcardElements.length - 1];
            card.style.transform = "rotateY(180deg)";
            cardFlipped = true;
        } else {
            // Double press detected, move to next card
            spacePressTimeout = setTimeout(() => {
                cardFlipped = false;  // Reset flip state for the new card
                displayNextCard();  // Show next card
            }, 300);  // Set a timeout to detect a quick double press (300ms)
        }
    }
});

// Initial call to display the first card
displayNextCard();
