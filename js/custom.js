document.addEventListener("DOMContentLoaded", function() {
    function updateBackgroundImage() {
        const parallaxSection = document.getElementById('parallax-section');
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) {
            parallaxSection.setAttribute('data-image-src', 'img/demos/fundo-nutri-tami-celular.png');
        } else if (screenWidth <= 768) {
            parallaxSection.setAttribute('data-image-src', 'img/demos/fundo-nutri-tami-tablet2.png');
        } else if (screenWidth <= 991) {
            parallaxSection.setAttribute('data-image-src', 'img/demos/fundo-nutri-tami-tablet1.png');
        } else if (screenWidth <= 1380) {
            parallaxSection.setAttribute('data-image-src', 'img/demos/fundo-nutri-tami-note.png');
        } else {
            // Caso queira uma imagem padrão para telas maiores que 1380
            parallaxSection.setAttribute('data-image-src', 'img/demos/fundo-nutri-tami-desktop.png');
        }

        // Reinitialize the parallax plugin if necessary
        if (typeof parallaxSection.pluginParallax !== 'undefined') {
            parallaxSection.pluginParallax();
        }
    }

    // Atualiza a imagem quando a página é carregada
    updateBackgroundImage();

    // Atualiza a imagem quando a janela é redimensionada
    window.addEventListener('resize', updateBackgroundImage);
});