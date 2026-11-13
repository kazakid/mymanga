const searchInput = document.getElementById("searchInput");

const mangaCards = document.querySelectorAll(".manga-card");

searchInput.addEventListener("input", function() {

    const keyword = searchInput.value.toLowerCase();

    mangaCards.forEach(function(card) {

        const mangaName = card.querySelector("h3").textContent.toLowerCase();

        if (mangaName.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
const randomButton = document.getElementById("randomMangaBtn");
const randomResult = document.getElementById("randomResult");

if (randomButton && randomResult) {
    randomButton.addEventListener("click", function() {

        const mangaCards = Array.from(
            document.querySelectorAll(".manga-card")
        ).filter(card => card.querySelector("a[href]"));

        if (mangaCards.length === 0) {
            alert("Chưa có truyện để random!");
            return;
        }

        let drawn = JSON.parse(
            localStorage.getItem("randomMangaDrawn") || "[]"
        );

        const limit = Math.min(10, mangaCards.length);

        if (drawn.length >= limit) {
            drawn = [];
        }

        const available = mangaCards
            .map((card, index) => index)
            .filter(index => !drawn.includes(index));

        const randomIndex = Math.floor(
            Math.random() * available.length
        );

        const selectedIndex = available[randomIndex];
        const selectedCard = mangaCards[selectedIndex];

        drawn.push(selectedIndex);

        localStorage.setItem(
            "randomMangaDrawn",
            JSON.stringify(drawn)
        );

        const link = selectedCard.querySelector("a[href]");
        const img = selectedCard.querySelector("img");
        const title = selectedCard.querySelector("h3");

        randomResult.innerHTML = `
            <a href="${link.href}">
                <img src="${img.src}" alt="${img.alt}">
            </a>
            <h3>${title.textContent}</h3>
        `;

        randomResult.style.display = "block";
    });
}
// ===== Nút lọc truyện tiếng Anh =====
var filterEnBtn = document.getElementById("filterEnBtn");
var dangLocEN = false;

filterEnBtn.addEventListener("click", function () {
    dangLocEN = !dangLocEN;   // bấm 1 lần bật, bấm lần nữa tắt

    var cacTruyen = document.querySelectorAll(".manga-card");
    cacTruyen.forEach(function (truyen) {
        if (dangLocEN && truyen.dataset.lang !== "en") {
            truyen.style.display = "none";   // ẩn truyện không phải EN
        } else {
            truyen.style.display = "";       // hiện lại như mặc định
        }
    });

    filterEnBtn.classList.toggle("active", dangLocEN);
});