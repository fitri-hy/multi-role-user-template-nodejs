document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = document.querySelectorAll('[data-dropdown]');

    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.stopPropagation();
            const dropdownKey = this.getAttribute('data-dropdown');
            const dropdownMenu = document.querySelector(`.dropdown-menu[data-dropdown="${dropdownKey}"]`);
            closeAllDropdowns();
            dropdownMenu.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', function () {
        closeAllDropdowns();
    });

    function closeAllDropdowns() {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function (menu) {
            menu.classList.add('hidden');
        });
    }
});
