// main.js
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
});
