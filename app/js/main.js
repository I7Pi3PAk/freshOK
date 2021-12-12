$(function () {

    $('.select-product__btn').on('click', function () {
        $('.select-product__list').toggleClass('active');
        $('.select-product__btn').toggleClass('active');
    });

    $('.header__bottom-cart, .header__cart-close').on('click', function () {
        $('.header__cart').toggleClass('active');
    });

    $('.header__bottom-search_btn').on('click', function () {
        $('.search-form').toggleClass('active');
    });

    $('.burger__btn, .burger__close').on('click', function () {
        $('.burger__menu').toggleClass('active');
    });

    $('.main-slider').slick({
        responsive: [{
            breakpoint: 1600,
            settings: {
                dots: true,
                arrows: false,
            }
        }]
    });


    $('.quantity_inner .bt_minus').on('click', function () {
        let $input = $(this).parent().find('.quantity');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
    });

    $('.quantity_inner .bt_plus').on('click', function () {
        let $input = $(this).parent().find('.quantity');
        let count = parseInt($input.val()) + 1;
        count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
        $input.val(parseInt(count));
    });

    $('.quantity_inner .quantity').bind("change keyup input click", function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        if (this.value == "") {
            this.value = 1;
        }
        if (this.value > parseInt($(this).data('max-count'))) {
            this.value = parseInt($(this).data('max-count'));
        }
    });

    var containerEl1 = $('[data-ref="container-1"]');
    var containerEl2 = $('[data-ref="container-2"]');

    var config = {
        controls: {
            scope: 'local'
        }
    };

    var mixer1 = mixitup(containerEl1, config);
    var mixer2 = mixitup(containerEl2, config);
});