document.addEventListener('DOMContentLoaded', function() {
    displayCartItems(); // Display cart items when the page loads
});

function displayCartItems() {
    // Retrieve userId from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // Retrieve cart items for the specific userId
    let cartItems = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceElement = document.getElementById('totalPrice');
    const totalGSTElement = document.getElementById('totalGST');
    const finalPriceElement = document.getElementById('finalPrice');

    cartItemsContainer.innerHTML = ''; // Clear previous items

    let totalPriceBeforeGST = 0;

    cartItems.forEach(item => {
        const totalItemPrice = item.price * item.quantity;
        totalPriceBeforeGST += totalItemPrice; // Accumulate total price before GST

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-details">
                <p><strong>Name:</strong> ${item.medicineName}</p>
                <p><strong>Price:</strong> ₹${item.price.toFixed(2)}</p>
                <p><strong>Quantity:</strong></p>
                <input type="number" value="${item.quantity}" min="1" max="${item.availableQuantity}" onchange="updateQuantity(${item.medicineId}, this.value)">
                <p><strong>Total Price (excl. GST):</strong> ₹${totalItemPrice.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${item.medicineId})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Calculate total GST amount (assuming 12% GST rate)
    const gstRate = 0.12; // 12% GST rate
    const totalGST = totalPriceBeforeGST * gstRate;

    // Calculate final total amount including GST
    const finalTotalWithGST = totalPriceBeforeGST + totalGST;

    // Display total price before GST
    totalPriceElement.textContent = `Total (excl. GST): ₹${totalPriceBeforeGST.toFixed(2)}`;

    // Display total GST amount
    totalGSTElement.textContent = `Total GST (12%): ₹${totalGST.toFixed(2)}`;

    // Display final total amount including GST
    finalPriceElement.textContent = `Final Price (incl. GST): ₹${finalTotalWithGST.toFixed(2)}`;
}

function updateQuantity(medicineId, newQuantity) {
    // Retrieve userId from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // Retrieve cart items for the specific userId
    let cartItems = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    const itemIndex = cartItems.findIndex(item => item.medicineId === medicineId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = parseInt(newQuantity);
        localStorage.setItem(`orders_${userId}`, JSON.stringify(cartItems));
        displayCartItems(); // Refresh cart display
    }
}

function removeFromCart(medicineId) {
    // Retrieve userId from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // Retrieve cart items for the specific userId
    let cartItems = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    const itemIndex = cartItems.findIndex(item => item.medicineId === medicineId);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem(`orders_${userId}`, JSON.stringify(cartItems)); // Update localStorage
        displayCartItems(); // Refresh cart display
    }
}

async function confirmOrder() {
    if (confirm('Are you sure you want to place this order?')) {
        // Retrieve userId from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');

        // Retrieve cart items for the specific userId
        let cartItems = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
        const saleDate = new Date().toISOString(); // Get the current date and time in ISO format

        try {
            for (let item of cartItems) {
                const apiUrl = `http://localhost:9000/sales/sale/processSaleTransaction?userId=${userId}&saleDate=${saleDate}&medicineId=${item.medicineId}&quantity=${item.quantity}`;
                const response = await fetch(apiUrl, {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error(`Failed to process order for medicine ID ${item.medicineId}. Status: ${response.status}`);
                }
            }

            // Show order success pop-up
            const orderSuccessPopup = document.getElementById('orderSuccessPopup');
            if (orderSuccessPopup) {
                orderSuccessPopup.classList.remove('hidden');
            } else {
                console.error('Order success pop-up element not found.');
                return;
            }

            // Wait for a few seconds before redirecting
            setTimeout(() => {
                localStorage.removeItem(`orders_${userId}`); // Clear cart items after placing order
                window.location.href = '../orders/orders.html?userId=' + userId; // Redirect to orders page with userId
            }, 2000); // 2 seconds delay
        } catch (error) {
            alert(`Order failed: ${error.message}`);
        }
    } else {
        // Cancel order confirmation
        alert('Order cancelled.');
    }
}
