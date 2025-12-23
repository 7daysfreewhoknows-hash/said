import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);

const handleAuth = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassInput = document.getElementById('confirm-password');

    try {
        if (confirmPassInput) {
            // --- РЕГИСТРАЦИЯ ---
            if (password !== confirmPassInput.value) {
                alert("Пароли не совпадают!");
                return;
            }

            // Создаем пользователя в системе Firebase Auth
            await createUserWithEmailAndPassword(auth, email, password);

            // Определяем следующий ID для ветки Authorization
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `Authorization`));
            let nextId = 1;
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Берем все ключи, превращаем в числа и находим максимум
                const ids = Object.keys(data).map(Number).filter(n => !isNaN(n));
                if (ids.length > 0) {
                    nextId = Math.max(...ids) + 1;
                }
            }

            // Записываем ТОЛЬКО в ветку Authorization
            await set(ref(db, 'Authorization/' + nextId), {
                ID_Authorization: nextId,
                Login: email,
                Password: password
            });

            alert(`Регистрация успешна! Создан аккаунт под номером: ${nextId}`);
        } else {
            // --- ВХОД ---
            await signInWithEmailAndPassword(auth, email, password);
        }

        // Перенаправление на главную
        window.location.href = "index.html";
    } catch (error) {
        alert("Ошибка: " + error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('form');
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }
});