$(function () {

    $('.product__btn').on('click', function () {
        $('.product__list').toggleClass('active');
        $('.product__btn').toggleClass('active');
    });

    $('.main-slider').slick();


    $('.quantity_inner .bt_minus').on('click', function() {
        let $input = $(this).parent().find('.quantity');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
    });

    $('.quantity_inner .bt_plus').on('click', function() {
        let $input = $(this).parent().find('.quantity');
        let count = parseInt($input.val()) + 1;
        count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
        $input.val(parseInt(count));
    }); 

    $('.quantity_inner .quantity').bind("change keyup input click", function() {
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