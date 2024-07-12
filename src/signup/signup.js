async function checkUsernameAvailability() {
    const usernameInput = document.querySelector('input[name="username"]');
    const usernameMessage = document.getElementById('username-message');
    const username = usernameInput.value;

    if (username) {
        try {
            const response = await fetch(`http://localhost:9000/users/getByUsername/${username}`);
            if (response.status === 200) {
                const user = await response.json();
                if (user.data) {
                    usernameMessage.textContent = 'Username is already taken.';
                    usernameMessage.style.color = 'red';
                } else {
                    usernameMessage.textContent = 'Username is available.';
                    usernameMessage.style.color = 'green';
                }
            } else if (response.status === 404) {
                usernameMessage.textContent = 'Username is available.';
                usernameMessage.style.color = 'green';
            } else {
                console.error('Error checking username availability:', response.statusText);
                usernameMessage.textContent = 'Error checking username availability.';
                usernameMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            usernameMessage.textContent = 'Error checking username availability. Please try again later.';
            usernameMessage.style.color = 'red';
        }
    } else {
        usernameMessage.textContent = '';
    }
}

function validatePassword() {
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordMessage = document.getElementById('password-message');
    const password = passwordInput.value;

    const hasMinimumLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&#^()+-=|/><;:{}]/.test(password);

    if (hasMinimumLength && hasLetter && hasNumber && hasSpecialChar) {
        passwordMessage.textContent = 'Password is strong!';
        passwordMessage.style.color = 'green';
    } else {
        passwordMessage.textContent = 'Password is weak. It must be at least 8 characters long and contain at least one special character, combination of letters & numbers.';
        passwordMessage.style.color = 'black';
    }
    validateConfirmPassword();
}

function validateConfirmPassword() {
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');
    const confirmPasswordMessage = document.getElementById('confirm-password-message');

    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordMessage.textContent = 'Passwords do not match.';
        confirmPasswordMessage.style.color = 'red';
    } else {
        confirmPasswordMessage.textContent = '';
        confirmPasswordMessage.style.color = 'green';
    }
}

function validateEmail() {
    const emailInput = document.querySelector('input[name="email"]');
    const emailMessage = document.getElementById('email-message');
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/i;

    if (!emailRegex.test(email)) {
        emailMessage.textContent = 'Please enter a valid email address ending with .com or .in.';
        emailMessage.style.color = 'red';
        return false;
    } else {
        emailMessage.textContent = '';
        emailMessage.style.color = 'green';
        return true;
    }
}

function clearEmailValidationMessage() {
    const emailMessage = document.getElementById('email-message');
    emailMessage.textContent = '';
}

async function validateForm() {
    const formData = new FormData(document.getElementById('registerForm'));
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');
    const email = formData.get('email');

    let isValid = true;

    validatePassword();
    const passwordMessage = document.getElementById('password-message').textContent;
    if (passwordMessage.includes('weak')) {
        isValid = false;
    }

    validateConfirmPassword();
    const confirmPasswordMessage = document.getElementById('confirm-password-message').textContent;
    if (confirmPasswordMessage.includes('do not match')) {
        isValid = false;
    }

    validateEmail();
    const emailMessage = document.getElementById('email-message').textContent;
    if (emailMessage.includes('valid email address')) {
        isValid = false;
    }

    await checkUsernameAvailability();
    const usernameMessage = document.getElementById('username-message').textContent;
    if (usernameMessage.includes('already taken') || usernameMessage.includes('Error')) {
        isValid = false;
    }

    if (isValid) {
        const data = {
            username,
            password,
            email,
            roleId: 1, // Set the role ID, assuming 1 is a valid role ID
            isActive: true // Set the user as active by default
        };
        try {
            const response = await fetch('http://localhost:9000/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Registration successful:', result);
                alert('Registration successful! Redirecting to login page...');
                return true;
            } else {
                console.error('Registration failed:', result);
                alert('Registration failed: ' + (result.message || 'Please try again.'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again later.');
        }
    }

    return false;
}

function handleRegistration(event) {
    event.preventDefault();
    validateForm().then((isFormValid) => {
        if (isFormValid) {
            window.location.href = '../login/login.html'; // Redirect to login page
        }
    });
    return false;
}
