// To display books list in a table
function displayBooksList() {
  const booksTableBody = document.querySelector('#booksTable .cart-items');
  booksTableBody.innerHTML = ''; // Clear existing rows

  // Retrieve the booksList array from local storage
  const booksList = JSON.parse(localStorage.getItem('booksList')) || [];

  // Loop through the booksList array and create table columns
  booksList.forEach((book, index) => {
    const row = booksTableBody.insertRow();
    row.classList.add('cart-row');

    const cellTitle = row.insertCell(0);
    cellTitle.classList.add('cart-column');
    cellTitle.classList.add('cart-title');
    cellTitle.textContent = book.title;

    const cellAuthor = row.insertCell(1);
    cellAuthor.classList.add('cart-column');
    cellAuthor.classList.add('cart-author');
    cellAuthor.textContent = book.author;

    const cellPrice = row.insertCell(2);
    cellPrice.classList.add('cart-column');
    cellPrice.classList.add('cart-price');
    cellPrice.textContent = book.price;

    // Insert increment decrement counter
    const cellCounter = row.insertCell(3);
    cellCounter.classList.add('cart-column');
    cellCounter.classList.add('cart-quantity');
    cellCounter.innerHTML =
      '<input class="cart-quantity-input" type="number" value="1">';

    const cellRemove = row.insertCell(4);
    cellRemove.classList.add('cart-column');
    cellRemove.classList.add('cart-remove');
    cellRemove.textContent = 'Remove';
    cellRemove.innerHTML = `<button class="btn btn-danger" type="button" onclick="removeBookFromBooksList(this, ${
      index
    })">Remove</button>`;
  });

  // At change to input value run quantityChanged function
  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  //  Force input value to 1 if 0 or negative number entered
  function quantityChanged(event) {
    // event.target is the input value
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    calculateTotalPrice();
  }

  // Calculate the total price
  calculateTotalPrice();
}

// To calculate the total price
function calculateTotalPrice() {
  // Select cart items- first of the cart-row array
  const cartItems = document.getElementsByClassName('cart-items')[0];
  // Get all cart-row individual items
  const cartRows = cartItems.getElementsByClassName('cart-row');
  // Loop over all the cart-row items
  // Set the total to 0 before the loop
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    // Get the price
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    // Get the quantity
    const quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input',
    )[0];
    // Convert string to a number without $ sign
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    // Get the value of the input element of type number
    const quantity = quantityElement.value;
    console.log(price * quantity);
    console.log(price);
    console.log(quantity);
    total += price * quantity;
  }

  // Account for computing to return an accurate amount
  total = Math.round(total * 100) / 100;
  // Set inner Text with the price and add $ sign
  document.getElementsByClassName('cart-total-price')[0].innerText =
    `$${total.toFixed(2)}`;
}

// Function to remove a book from the booksList array in local storage
function removeBookFromBooksList(button, index) {
  const booksList = JSON.parse(localStorage.getItem('booksList')) || [];
  booksList.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('booksList', JSON.stringify(booksList));
  displayBooksList(); // Update the table
}

// Function to remove the booksList array from local storage and add a thank you message
function purchaseBooks() {
  localStorage.removeItem('booksList');
  console.log('booksList has been removed from local storage.');
  displayBooksList(); // Update the table

  // Create new thank you paragraph at purchase
  const divElement = document.getElementById('divButton');
  const thankYouParagraph = document.createElement('p');
  thankYouParagraph.classList.add('thank-you');
  thankYouParagraph.textContent = 'Thank you for your purchase.';

  // Append the paragraph to an existing element on the page
  divElement.appendChild(thankYouParagraph);
}

// Add event listener to the Purchase button
document
  .getElementById('purchaseButton')
  .addEventListener('click', purchaseBooks);

// Initial display of books list
displayBooksList();

// Listen for changes in local storage and update the table
window.addEventListener('storage', (event) => {
  if (event.key === 'booksList') {
    displayBooksList();
    location.reload(); // Force the page to reload
    // window.reload();
  }
});

// Listen for changes in quantity inputs and recalculate the total price
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('cart-quantity-input')) {
    calculateTotalPrice();
  }
});
