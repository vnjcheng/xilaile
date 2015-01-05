//
// 功能说明：选择商品
// @author maoxiaomi
// @date 2015-01-05
//

$(function() {

	var choose = {
		/**
		 * 页面初始化
		 * @return {[type]} [description]
		 */
		init: function() {
			// 初始化数量选择控件
			choosenum();

			// 绑定事件
			this.bindEvent();

			// 提交数据缓存
			this.submitdata = [];
		},
		/**
		 * 绑定事件
		 * @return {[type]} [description]
		 */
		bindEvent: function() {
			var self = this;

			// tab页切换
			$('.tab > li').click(function(e) {
				var index = $(this).index();

				if ($(this).hasClass('active')) {
					return;
				}

				$('.tab > li').removeClass('active');
				$('.tab-content > .tab-pane').removeClass('active');
				$(this).addClass('active');
				$('.tab-content > .tab-pane').eq(index).addClass('active');
			});

			// 选择衣物
			$('.tab-pane .num-choose input').change(function(e, index) {
				var li = $(this).parents('li'),
					price = parseInt(li.attr('price'), 10),
					id = li.attr('id');

				var submitdata = self.submitdata;

				if (!$('#type_' + price).length && index !== 0) {
					var template = '<li id="type_' + price + '"><span class="peace-price price">' + price + '</span> × <span name="count">0</span> = <span class="peace-total price">0</span>元</li>';

					$('#chooseList').append(template);
				}

				var count = 0;
				$('#type_' + price).find('[name=count]').html(function(i, old) {
					count = (index === 0 ? (parseInt(old, 10) - 1) : (parseInt(old, 10) + 1));
					return count;
				});

				if (count <= 0) {
					$('#type_' + price).remove();

					// 删除已选资源
					var i = submitdata.indexOf(price);
					submitdata = submitdata.splice(i, 1);
				} else {
					// 计算单品类总价
					$('#type_' + price + ' .peace-total, .total-price').html(function(i, old) {
						return (index === 0 ? (parseInt(old, 10) - price) : (parseInt(old, 10) + price));
					});

					submitdata.push(id);
				}

				if ($('#chooseList').find('li').length) {
					$('.basket').removeClass('hide');
				} else {
					$('.basket').addClass('hide');
				}
			});

			// 结算
			$('#submit').click(function(e) {
				if(self.submitdata.length === 0) {
					dialog({
						type: 'info',
						message: '请选择洗衣类型'
					});

					return;
				}

				$('[name=params]').val(JSON.stringify(self.submitdata));

				$('#submitForm').submit();
			});
		}
	}.init();
});