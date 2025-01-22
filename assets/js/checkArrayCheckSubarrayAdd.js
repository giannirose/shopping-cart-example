// Function to check and add subarray to booksList in local storage
function checkAndAddToBooksList(idValue, titleValue, author, price) {
  // Retrieve the array from local storage or initialize an empty array if it doesn't exist
  const booksList = JSON.parse(localStorage.getItem('booksList')) || [];

  // Check if any object in booksList includes the key-value pair 'id': idValue
  const exists = booksList.some((item) => item.id === `${idValue}`);

  if (!exists) {
    // If it doesn't exist, add the new object with 'id': idValue and 'title': titleValue
    booksList.push({
      id: `${idValue}`,
      title: `${titleValue}`,
      author: `${author}`,
      price: `${price}`,
    });
    localStorage.setItem('booksList', JSON.stringify(booksList));
    console.log(
      `Added new object with id: "${idValue}" and title: "${titleValue}" and author and price listings to booksList in local storage.`,
    );
  } else {
    // If it exists, do nothing
    console.log(
      `Object with id: "${idValue}" already exists in booksList in local storage.`,
    );
  }
}

// Usage for this item
const idValue = 'aoh';
const titleValue = 'All of Him';
const author = 'Matthew Dickman';
const price = '$2200';
document.getElementById('addBookButton').addEventListener('click', () => {
  checkAndAddToBooksList(idValue, titleValue, author, price);
});

// Add event listener to the button and show "item is in cart" text
const addToCartBtn = document.querySelector('#addBookButton');
const opt = {
  initialText: 'Add to Cart',
  textOnClick: 'Item is now in the Cart',
  interval: 5000,
};

const setAddToCartText = () => {
  addToCartBtn.innerHTML = opt.textOnClick;
  const reinit = () => {
    addToCartBtn.innerHTML = opt.initialText;
  };
  setTimeout(reinit, opt.interval);
};

addToCartBtn.addEventListener('click', setAddToCartText);
