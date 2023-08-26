
const { reviews } = window;

// Function to generate a review card HTML for each review object
function generateReviewsCard(review) {

  // Change format of rating and date
  const ratingStars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  const formattedDate = new Date(review.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  // Create div element to contain the content of the card.
  const card = document.createElement("div");
  card.classList.add("reviewsBox");

  const nameElem = document.createElement("h3")
  nameElem.textContent = review.name;
  const dateElem = document.createElement("p");
  dateElem.textContent = formattedDate;
  const ratingElem = document.createElement("p");
  ratingElem.textContent = ratingStars;
  const reviewElem = document.createElement("p");
  reviewElem.textContent = review.review;

  card.appendChild(nameElem);
  card.appendChild(dateElem);
  card.appendChild(ratingElem);
  card.appendChild(reviewElem);

  return card;
}

// Function to render all review cards
function renderReviewCards() {
  const reviewContainer = document.getElementById("review-container");

  // Clear existing review cards
  reviewContainer.innerHTML = "";

  // Loop through each review in the reviewData and generate the corresponding review card
  for (const review of window.reviewData) {
    const reviewCard = generateReviewsCard(review);
    reviewContainer.appendChild(reviewCard);
  }
}

// Function to handle form submission
function addReview(event) {
  event.preventDefault();

  // Get form values
  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const ratingInput = document.getElementById("rating");
  const reviewInput = document.getElementById("review");

  const newReview = {
    name: nameInput.value,
    date: dateInput.value,
    rating: parseInt(ratingInput.value),
    review: reviewInput.value,
  };

  // Add the new review to the reviewData array
  window.reviewData.push(newReview);

  // Reset form inputs
  nameInput.value = "";
  dateInput.value = "";
  ratingInput.value = "1";
  reviewInput.value = "";

  // Render all review cards, including the new one
  renderReviewCards();
}

// Event listener for form submission
const reviewForm = document.getElementById("review-form");
reviewForm.addEventListener("submit", addReview);

// Load review data from local storage when the page loads
window.addEventListener("load", () => {
  renderReviewCards();
});