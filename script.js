const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(el => observer.observe(el));

const themeToggle = document.getElementById("themeToggle");

// Cargar tema guardado
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

// Cambiar tema
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

const downloadPDF = document.getElementById("downloadPDF");

downloadPDF.addEventListener("click", async () => {

    alert("Generando PDF...");

    await MathJax.typesetPromise();

    const element = document.querySelector("main");

    const options = {
        margin: 0.5,
        filename: "The_Fundamental_MDGB-JOPA_Theorem.pdf",
        image: {
            type: "jpeg",
            quality: 1
        },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };

    html2pdf()
        .set(options)
        .from(element)
        .save();

});
