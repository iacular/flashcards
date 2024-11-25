const flashcardContainer = document.getElementById("flashcard-container");

// Array of questions and answers (code snippets)
const flashcards = [
    { question: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.", 

answer: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;

        for (int i = 0; i < nums.size(); i++) {
            if (seen.find(nums[i]) != seen.end())
                return true;
            seen.insert(nums[i]);
        }

        return false;
    }
};` },
    { question: "What is the time complexity of binary search?", 
answer: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}` },
    // Add more flashcards here
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
