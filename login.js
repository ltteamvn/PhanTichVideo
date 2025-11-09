import { users } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const guestLoginBtn = document.getElementById('guest-login-btn');

    // Nếu đã đăng nhập, chuyển hướng đến trang ứng dụng
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '/app.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;

        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // Đăng nhập thành công
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUser', foundUser.username);
            sessionStorage.setItem('userRole', foundUser.role);
            errorMessage.textContent = '';
            window.location.href = '/app.html';
        } else {
            // Đăng nhập thất bại
            errorMessage.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
            passwordInput.value = ''; // Xóa trường mật khẩu
            loginForm.classList.add('animate-shake');
            setTimeout(() => {
                loginForm.classList.remove('animate-shake');
            }, 500);
        }
    });
    
    guestLoginBtn.addEventListener('click', () => {
        sessionStorage.setItem('isLoggedIn', 'false'); // Guests are not "fully" logged in
        sessionStorage.setItem('loggedInUser', 'Khách');
        sessionStorage.setItem('userRole', 'Guest');
        window.location.href = '/app.html';
    });


    // Thêm keyframes cho animation lắc
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(style);
});