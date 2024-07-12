let orders = []; // Array to store selected orders
let userId = ''; // Variable to store userId

function fetchAllMedicines() {
    fetch('http://localhost:9000/pharmaceutical/medicines/getAll')
        .then(response => response.json())
        .then(data => {
            if (data.data.length === 0) {
                showPopup('Not found! Try to search other medicines.', 'error');
            } else {
                displayMedicines(data.data); // Call function to display medicines in table
            }
        })
        .catch(error => {
            console.error('Error fetching medicines:', error);
        });
}

// Function to display medicines in card format
function displayMedicines(medicines) {
    const cardsContainer = document.getElementById("medicineCardsContainer");
    cardsContainer.innerHTML = ""; // Clear previous details

    medicines.forEach(med => {
        const card = document.createElement("div");
        card.className = "medicine-card";
        card.innerHTML = `
            <h3>${med.name}</h3>
            <p class="details">${med.type}, ${med.strengthVolume}</p>
            <p class="price">Price: ₹${med.price.toFixed(2)}</p>
            <p class="quantity">Available Quantity: ${med.availableQuantity}</p>
            <div class="actions">
                <input type="number" min="1" max="${med.availableQuantity}" placeholder="Qty" id="quantity-${med.id}">
                <button onclick="addToOrders(${med.id}, '${med.name}', ${med.price}, ${med.availableQuantity})">Add to Cart</button>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}
// Function to handle search for medicines
function searchMedicines() {
    const searchTerm = document.getElementById('searchTerm').value.trim();

    if (searchTerm === '') {
        showPopup('Please enter a search term.', 'error');
        return;
    }

    fetch(`http://localhost:9000/pharmaceutical/medicines/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                showPopup(data.message, 'error');
            } else {
                displayMedicines(data.data);
            }
        })
        .catch(error => {
            console.error('Error searching medicines:', error);
            showPopup('Error searching medicines. Please try again later.', 'error');
        });
}

// Function to handle adding medicines to orders
function addToOrders(medicineId, name, price, availableQuantity) {
    const quantityInput = document.getElementById(`quantity-${medicineId}`);
    const quantity = parseInt(quantityInput.value);

    if (!quantity || quantity <= 0 || quantity > availableQuantity) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Logic to add the selected medicine and quantity to the orders
    console.log(`Medicine ID: ${medicineId}, Name: ${name}, Price: ₹${price.toFixed(2)}, Quantity: ${quantity}`);
    // You can add the code to update the cart or orders here
}

// Function to redirect to cart
function redirectToCart() {
    // Logic to redirect to cart page
    console.log('Redirecting to cart...');
}

// Function to view orders
function viewOrders() {
    // Logic to view orders
    console.log('Viewing orders...');
}

// Fetch and display medicines when the page loads
document.addEventListener('DOMContentLoaded', fetchAllMedicines);


// Function to add selected medicine to orders
function addToOrders(medicineId, medicineName, medicinePrice, availableQuantity) {
    const quantityInput = document.getElementById(`quantity-${medicineId}`);
    const selectedQuantity = parseInt(quantityInput.value);

    // Validate quantity
    if (isNaN(selectedQuantity) || selectedQuantity < 1 || selectedQuantity > availableQuantity) {
        showPopup("Please enter a valid quantity.", "error");
        return;
    }

    // Calculate total price for the selected quantity
    const totalPrice = (medicinePrice * selectedQuantity).toFixed(2);

    // Check if the medicine is already in orders
    const existingOrderIndex = orders.findIndex(order => order.medicineId === medicineId);

    if (existingOrderIndex !== -1) {
        // Update existing order
        orders[existingOrderIndex].quantity = selectedQuantity;
        orders[existingOrderIndex].totalPrice = totalPrice;
    } else {
        // Add new order
        orders.push({
            medicineId: medicineId,
            medicineName: medicineName,
            quantity: selectedQuantity,
            price: medicinePrice,
            totalPrice: totalPrice
        });
    }

    // Update cart count
    updateCartCount();

    // Show success message
    showPopup("Item added successfully to the cart.", "success");
}

// Function to update the cart count display
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    cartCount.textContent = orders.length; // Update cart count with the number of items in orders
}

// Function to show popup messages
function showPopup(message, type) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content ${type === 'success' ? 'success' : 'error'}">
            <span class="close">&times;</span>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', function() {
        modal.remove();
    });

    setTimeout(() => {
        modal.remove();
    }, 3000);
}

// Function to redirect to the cart page
function redirectToCart() {
    localStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
    window.location.href = `../cart/cart.html?userId=${userId}`; // Pass userId as URL parameter
}

// Function to initialize page
function initializePage() {
    // Extract userId from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

    fetchAllMedicines(); // Fetch and display all medicines

    // Check if there are saved orders in localStorage
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${userId}`));
    if (savedOrders && savedOrders.length > 0) {
        orders = savedOrders;
        updateCartCount(); // Update cart count if there are saved orders
    }
}

// Call initializePage function when the page loads
initializePage(); // Call directly without waiting for DOMContentLoaded
