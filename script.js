// ==========================================
// ТЕМЫ
// ==========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.body.className = savedTheme;
} else {
    document.body.className = "theme-light";
}


// ==========================================
// КНОПКА ТЕМЫ
// ==========================================

const themeButton = document.createElement("button");

themeButton.id = "theme-button";
themeButton.textContent = "🎨 Тема";

document.body.insertBefore(
    themeButton,
    document.body.firstChild
);


// ==========================================
// МЕНЮ ТЕМ
// ==========================================

themeButton.addEventListener("click", () => {

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

            localStorage.setItem(
                "theme",
                theme
            );

            menu.remove();
        });

    });

    document
        .getElementById("close-theme")
        .addEventListener("click", () => {
            menu.remove();
        });
});


// ==========================================
// ЗАГРУЗКА ПОСТОВ
// ==========================================

fetch("data/posts.json")
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Не удалось загрузить посты"
            );
        }

        return response.json();
    })

    .then(posts => {

        const container =
            document.getElementById("posts");

        container.innerHTML = "";

        if (!posts.length) {

            container.innerHTML =
                "<p>Пока нет опубликованных постов.</p>";

            return;
        }

        posts
            .slice()
            .reverse()
            .forEach(post => {

                const article =
                    document.createElement("article");

                article.className = "post";

                let image = "";

                if (post.image) {

                    image = `
                        <img
                            src="${post.image}"
                            alt=""
                            class="post-image"
                        >
                    `;
                }

                // НИК АВТОРА ЗДЕСЬ БОЛЬШЕ НЕ ВЫВОДИМ

                article.innerHTML = `
                    <h2>${post.title}</h2>

                    <div class="post-date">
                        ${post.date}
                    </div>

                    ${image}

                    <div class="post-text">
                        ${post.text.replace(
                            /\n/g,
                            "<br>"
                        )}
                    </div>
                `;

                container.appendChild(article);
            });
    })

    .catch(error => {

        console.error(error);

        document.getElementById("posts").innerHTML =
            "<p>Не удалось загрузить посты.</p>";
    });
