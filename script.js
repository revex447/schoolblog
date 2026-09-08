const POSTS_URL = "data/posts.json?cache=" + Date.now();

// ==========================================
// ТЕМЫ
// ==========================================

const savedTheme = localStorage.getItem("theme") || "theme-light";

document.body.className = savedTheme;

// ==========================================
// КНОПКА ТЕМЫ
// ==========================================

const themeButton = document.createElement("button");

themeButton.id = "theme-button";
themeButton.textContent = "🎨 Тема";

document.body.appendChild(themeButton);

// ==========================================
// МЕНЮ ТЕМ
// ==========================================

themeButton.addEventListener("click", () => {

```
if (document.getElementById("theme-menu")) {
    return;
}

const menu = document.createElement("div");

menu.id = "theme-menu";

menu.innerHTML = `
    <div class="theme-menu-content">

        <h3>🎨 Выберите тему</h3>

        <button data-theme="theme-light">
            ☀️ Светлая
        </button>

        <button data-theme="theme-dark">
            🌙 Тёмная
        </button>

        <button data-theme="theme-blue">
            🔵 Синяя
        </button>

        <button data-theme="theme-purple">
            🟣 Фиолетовая
        </button>

        <button data-theme="theme-green">
            🟢 Зелёная
        </button>

        <button id="close-theme">
            ✖ Закрыть
        </button>

    </div>
`;

document.body.appendChild(menu);

menu.querySelectorAll("[data-theme]").forEach(button => {

    button.addEventListener("click", () => {

        const theme = button.dataset.theme;

        document.body.className = theme;

        localStorage.setItem("theme", theme);

        menu.remove();
    });

});

document
    .getElementById("close-theme")
    .addEventListener("click", () => {
        menu.remove();
    });

menu.addEventListener("click", event => {

    if (event.target === menu) {
        menu.remove();
    }

});
```

});

// ==========================================
// ЭКРАНИРОВАНИЕ HTML
// ==========================================

function escapeHTML(value) {

```
const div = document.createElement("div");

div.textContent = value ?? "";

return div.innerHTML;
```

}

// ==========================================
// ЗАГРУЗКА ПОСТОВ
// ==========================================

fetch(POSTS_URL, {
cache: "no-store"
})

.then(response => {

```
if (!response.ok) {
    throw new Error(
        "Не удалось загрузить posts.json"
    );
}

return response.json();
```

})

.then(posts => {

```
const container =
    document.getElementById("posts");

if (!container) {
    throw new Error(
        "В index.html не найден элемент #posts"
    );
}

container.innerHTML = "";

if (!Array.isArray(posts) || posts.length === 0) {

    container.innerHTML =
        "<p class='empty-posts'>Пока нет опубликованных постов.</p>";

    return;
}


// Новые посты сверху
posts
    .slice()
    .reverse()
    .forEach(post => {

        const article =
            document.createElement("article");

        article.className = "post";


        const title =
            escapeHTML(post.title);

        const text =
            escapeHTML(post.text)
                .replace(/\n/g, "<br>");


        let media = "";


        // ==================================
        // ФОТО
        // ==================================

        if (post.image) {

            media = `
                <div class="post-media">
                    <img
                        src="${encodeURI(post.image)}"
                        alt=""
                        loading="lazy"
                        class="post-image"
                    >
                </div>
            `;
        }


        // ==================================
        // ВИДЕО
        // ==================================

        if (post.video) {

            media = `
                <div class="post-media">
                    <video
                        class="post-video"
                        controls
                        preload="metadata"
                        playsinline
                    >
                        <source
                            src="${encodeURI(post.video)}"
                            type="video/mp4"
                        >
                        Ваш браузер не поддерживает видео.
                    </video>
                </div>
            `;
        }


        article.innerHTML = `
            <h2>${title}</h2>

            <div class="post-date">
                ${escapeHTML(post.date)}
            </div>

            ${media}

            <div class="post-text">
                ${text}
            </div>
        `;

        container.appendChild(article);

    });
```

})

.catch(error => {

```
console.error(error);

const container =
    document.getElementById("posts");

if (container) {

    container.innerHTML = `
        <p class="error-message">
            Не удалось загрузить посты.
        </p>
    `;
}
```

});

