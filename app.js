// app.js
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginOptions = document.getElementById('loginOptions');
    const studentLogin = document.getElementById('studentLogin');
    const teacherLogin = document.getElementById('teacherLogin');

    // Show options when "Login" is clicked
    loginButton.addEventListener('click', () => {
        loginOptions.classList.remove('hidden');
        loginButton.classList.add('hidden');
    });

    // Redirect to student login page
    studentLogin.addEventListener('click', () => {
        window.location.href = '/C:/Users/Kamakshi/OneDrive/Documents/Expo Project(1)/StudentLogin.html';
    });

    // Redirect to teacher login page
    teacherLogin.addEventListener('click', () => {
        window.location.href = '/C:/Users/Kamakshi/OneDrive/Documents/Expo Project(1)/TeacherLogin.html';
    });
});
