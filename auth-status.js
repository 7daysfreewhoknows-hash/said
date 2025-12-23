import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVQ8c64g-HVjml3OeZC2YLfAdnJr5prOk",
    authDomain: "zalupa-2f7ed.firebaseapp.com",
    databaseURL: "https://zalupa-2f7ed-default-rtdb.firebaseio.com",
    projectId: "zalupa-2f7ed",
    storageBucket: "zalupa-2f7ed.firebasestorage.app",
    messagingSenderId: "375316254852",
    appId: "1:375316254852:web:21a34ecef6dd8be0d5b2d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const guestZone = document.getElementById('guest-zone');
    const userZone = document.getElementById('user-zone');
    const emailDisplay = document.getElementById('user-email-display');
    const initialDisplay = document.getElementById('user-initial');

    if (user) {
        guestZone.classList.add('hidden');
        userZone.classList.remove('hidden');

        // Показываем почту
        emailDisplay.textContent = user.email;

        // Берем первую букву почты и делаем её заглавной
        if (user.email) {
            initialDisplay.textContent = user.email.charAt(0).toUpperCase();
        }
    } else {
        guestZone.classList.remove('hidden');
        userZone.classList.add('hidden');
    }
});

// Логика выхода
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.reload();
    });
});