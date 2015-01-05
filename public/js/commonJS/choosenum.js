//
// 功能说明：数量选择控件
// @author maoxiaomi
// @date 2015-01-05
//
function choosenum() {
    $('.num-choose span').off('click').on('click', function(e) {
        e.stopPropagation();
        if ($(this).hasClass('disabled') || $(this).parent().hasClass('disabled')) {
            return;
        }

        var node = $(e.target),
            // index=0表示'-'，=2表示'+'
            index = node.index(),
            count = index ? 1 : -1,
            input = $(e.target).parent().find('input'),
            num = parseInt($.trim(input.val()), 10);

        num += count;
        // num < 0 && (num = 0);

        input.val(num);

        // 定义最大值和最小值区间
        var min = parseInt(input.attr('min')) || 0,
            max = typeof input.attr('max') == 'undefined' ? 0 : parseInt(input.attr('max'));

        // 增加时
        num < min && index == 2 && input.val(min);
        num > max && index == 2 && input.val(max);

        // 减少时
        if (num < min && index == 0) {
            input.val(0);
        }

        if (input.val() == min) {
            $('span:first', node.parent()).addClass('disabled');
        } else {
            $('span:first', node.parent()).removeClass('disabled');
        }

        if (input.val() == max) {
            $('span:last', node.parent()).addClass('disabled');
        } else {
            $('span:last', node.parent()).removeClass('disabled');
        }

        input.trigger('change', index);
    });

    $('.num-choose').each(function(i, item) {
        var node = $(item),
            min = parseInt($('input', node).attr('min')) || 0,
            max = typeof $('input', node).attr('max') == 'undefined' ? 0 : parseInt($('input', node).attr('max')),
            num = parseInt($('input', node).val());

        if (num <= min) {
            $('input', node).html(min);
            $('span:first', node).addClass('disabled');
        } else {
            $('span:first', node).removeClass('disabled');
        }

        if (num >= max) {
            $('input', node).html(max);
            $('span:last', node).addClass('disabled');
        } else {
            $('span:last', node).removeClass('disabled');
        }
    });


    $('.num-choose input').focus(function(e) {
        $(this).blur();
    });
}