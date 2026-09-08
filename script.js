const POSTS_URL = "data/posts.json?cache=" + Date.now();

fetch(POSTS_URL, {
    cache: "no-store"
})
.then(response => {
    if (!response.ok) {
        throw new Error("Не удалось загрузить posts.json");
    }

    return response.json();
})
.then(posts => {

    const container = document.getElementById("posts");

    if (!container) {
        throw new Error("Элемент #posts не найден");
    }

    container.innerHTML = "";

    if (!Array.isArray(posts) || posts.length === 0) {
        container.innerHTML =
            "<p>Пока нет опубликованных постов.</p>";
        return;
    }

    posts
        .slice()
        .reverse()
        .forEach(post => {

            const article = document.createElement("article");
            article.className = "post";

            const title = document.createElement("h2");
            title.textContent = post.title || "Без названия";

            const date = document.createElement("div");
            date.className = "post-date";
            date.textContent = post.date || "";

            const text = document.createElement("div");
            text.className = "post-text";
            text.textContent = post.text || "";

            article.appendChild(title);
            article.appendChild(date);
            article.appendChild(text);

            // ФОТО
            if (post.image) {

                const image = document.createElement("img");

                image.className = "post-image";
                image.src = post.image;
                image.alt = "";
                image.loading = "lazy";

                article.appendChild(image);
            }

            // ВИДЕО
            if (post.video) {

                const video = document.createElement("video");

                video.className = "post-video";
                video.src = post.video;

                video.controls = true;
                video.preload = "metadata";
                video.playsInline = true;

                article.appendChild(video);
            }

            container.appendChild(article);
        });

})
.catch(error => {

    console.error(error);

    const container = document.getElementById("posts");

    if (container) {
        container.innerHTML =
            "<p>Не удалось загрузить посты.</p>";
    }

});
