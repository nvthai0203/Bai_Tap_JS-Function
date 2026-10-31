const menuButtons = document.querySelectorAll(".menu-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

function doiTab(tabId) {
    tabPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.id !== tabId);
    });

    menuButtons.forEach((button) => {
        const isActive = button.dataset.tab === tabId;
        button.classList.toggle("bg-indigo-600", isActive);
        button.classList.toggle("text-white", isActive);
        button.classList.toggle("text-slate-300", !isActive);
        button.classList.toggle("hover:bg-slate-800", !isActive);
    });
}

menuButtons.forEach((button) => {
    button.addEventListener("click", () => doiTab(button.dataset.tab));
});
