const posts = [
    {
        title: "Добро пожаловать!",
        date: "8 сентября 2026",
        text: "Это первый пост на сайте."
    }
];

const container = document.getElementById("posts");

container.innerHTML = "";

posts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
        <h2>${post.title}</h2>
        <div class="post-date">${post.date}</div>
        <div class="post-text">${post.text}</div>
    `;

    container.appendChild(article);
});