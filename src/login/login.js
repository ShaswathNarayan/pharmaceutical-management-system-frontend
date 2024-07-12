async function validateAndSubmit(event) {
    event.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await fetch(`http://localhost:9000/pharmaceutical/users/getByUsername/${username}`);
        if (response.ok) {
            const userResponse = await response.json();
            const user = userResponse.data; // Assuming response structure from backend

            if (user && user.password === password) {
                // Display success message
                showPopup(`User login successful, welcome ${username}! Redirecting to medicine list page.`, 'success');

                // Delay redirection to allow time for the message to be seen
                setTimeout(() => {
                    window.location.href = `../pharmacydashboard/dashboard.html?userId=${user.id}`; // Map userId to URL
                }, 2000); // Redirect after 2 seconds
            } else {
                showPopup('Login failed. Incorrect username or password.', 'error');
            }
        } else if (response.status === 404) {
            // Username not found, display message to register
            showPopup('Username not found. Please register!', 'error');
        } else {
            console.error('Error:', response.statusText);
            showPopup('Login failed. Please try again later.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showPopup('Login failed. Please try again later.', 'error');
    }
}

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

    // Automatically close the modal after 3 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            modal.remove();
        }, 3000);
    }
}
