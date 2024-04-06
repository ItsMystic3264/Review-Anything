document.addEventListener('DOMContentLoaded', function () {
    const openReviewFormButton = document.getElementById('openReviewFormButton');
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    const reviewForm = document.getElementById('reviewForm');
  
    openReviewFormButton.addEventListener('click', function () {
      // Show review form elements
      reviewFormContainer.style.display = 'block';
    });
  
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Hide review form elements
      reviewFormContainer.style.display = 'none';
  
      // Process form submission (save review, display review, etc.)
      // Add your code here
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviews');
    const searchForm = document.getElementById('searchForm');
    const reviewsHeading = document.getElementById('reviewsHeading');
    const resetStoragePassword = '01062010'; // Change this to your desired password
  
    // Display existing reviews when the page loads
    displayExistingReviews();
  
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const reviewing = this.reviewing.value;
      const rating = this.rating.value;
      const comment = this.comment.value;
  
      // Validate inputs
      if (!reviewing || !rating) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Create review object
      const review = {
        reviewing: reviewing,
        rating: rating,
        comment: comment
      };
  
      // Add review to localStorage
      saveReview(review);
  
      // Display review on the page
      displayReview(review);
  
      // Clear form inputs
      reviewForm.reset();
    });
  
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const searchTerm = this.search.value.trim().toLowerCase();
  
      if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
      }
  
      // Clear previous search results
      clearSearchResults();
  
      // Search for reviews matching the search term
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      const matchingReviews = reviews.filter(review => review.reviewing.toLowerCase().includes(searchTerm));
  
      if (matchingReviews.length === 0) {
        alert('No reviews found matching the search term.');
        return;
      }
  
      // Display matching reviews
      matchingReviews.forEach(review => {
        displayReview(review);
      });
  
      // Change the reviews heading text
      reviewsHeading.textContent = 'Searched Reviews';
    });
  
    function saveReview(review) {
      let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  
    function displayReview(review) {
      // Create review item
      const reviewItem = document.createElement('li');
      reviewItem.classList.add('review-item');
      let reviewContent = `<strong>${review.reviewing}</strong> - ${review.rating}/10`;
      if (review.comment.trim() !== '') {
        reviewContent += `<br><p>${review.comment}</p>`;
      }
      reviewItem.innerHTML = reviewContent;
  
      // Append review item to the list
      reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
    }
  
    function displayExistingReviews() {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.forEach(review => {
        displayReview(review);
      });
    }
  
    function clearSearchResults() {
      while (reviewsList.firstChild) {
        reviewsList.removeChild(reviewsList.firstChild);
      }
    }
  
    function resetStorage() {
      const userInput = prompt('To reset the storage, please enter the password:');
      if (userInput === resetStoragePassword) {
        localStorage.removeItem('reviews');
        reviewsList.innerHTML = ''; // Clear the reviews displayed on the page
        alert('Local storage has been reset successfully.');
      } else {
        alert('Incorrect password. Local storage reset canceled.');
      }
    }
  
    // Listen for keydown events to detect key combination
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        // Reset storage when Ctrl + Shift + R is pressed
        resetStorage();
      }
    });
  });
