fetch("data/posts.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Не удалось загрузить посты");
        }

        return response.json();
    })
    .then(posts => {
        const container = document.getElementById("posts");

        container.innerHTML = "";

        if (!posts.length) {
            container.innerHTML =
                "<p>Пока нет опубликованных постов.</p>";
            return;
        }

        posts.slice().reverse().forEach(post => {
            const article = document.createElement("article");

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

            article.innerHTML = `
                <h2>${post.title}</h2>

                <div class="post-date">
                    ${post.date}
                </div>

                ${image}

                <div class="post-text">
                    ${post.text.replace(/\n/g, "<br>")}
                </div>

                <div class="post-author">
                    Автор: ${post.author}
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
