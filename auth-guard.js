// This script runs before the page content is rendered to protect the route.
(function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const isGuest = sessionStorage.getItem('userRole') === 'Guest';

    // If the user is not logged in AND is not a guest, redirect them to the login page.
    // This allows logged-in users and guests to access the main app, but blocks everyone else.
    if (!isLoggedIn && !isGuest) {
        // Use window.location.replace so the user can't click "Back" to the protected page.
        window.location.replace('/login.html');
    }
})();
