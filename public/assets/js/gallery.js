/*
Template Name: Prompt - Tailwind CSS Multipurpose Landing Page Template
Version: 1.1.0
Author: coderthemes
Email: support@coderthemes.com
*/


function init() {
    const Shuffle = window.Shuffle;

    class Demo {
        constructor(element) {
            this.element = element;
            this.shuffle = new Shuffle(element, {
                itemSelector: '.picture-item'
            });

            this.activeFilters = [];
            this.addFilterButtons();
        }

        addFilterButtons() {
            const options = document.querySelector('.filter-options');
            if (!options) {
                return;
            }

            const filterButtons = Array.from(options.children);
            const onClick = this.handleFilterClick.bind(this);
            filterButtons.forEach((button) => {
                button.addEventListener('click', onClick, false);
            });
        }

        handleFilterClick(evt) {
            const button = evt.currentTarget;
            const isActive = button.classList.contains('active');
            const buttonGroup = button.getAttribute('data-group');

            this.removeActiveClassFromChildren(button.parentNode);

            button.classList.add('active');
            this.shuffle.filter(buttonGroup);
        }

        removeActiveClassFromChildren(parent) {
            const { children } = parent;
            for (let i = children.length - 1; i >= 0; i--) {
                children[i].classList.remove('active');
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.demo = new Demo(document.getElementById('gallery-wrapper'));
    });


    // GLightbox Popup
    var lightbox = GLightbox({
        selector: '.image-popup',
        title: false,
    });
};

init();