//
// 功能说明：下单流程
// @author maoxiaomi
// @date 2015-01-05
//

$(function() {

	var addorder = {
		/**
		 * 页面初始化
		 * @return {[type]} [description]
		 */
		init: function() {
			// 绑定事件
			this.bindEvent();
		},
		/**
		 * 绑定事件
		 * @return {[type]} [description]
		 */
		bindEvent: function() {
			var self = this;

			// 新增地址
			$('#add').click(function(e) {
				self.showAdd();
			});

			// 删除记录
			$('.list').on('click', '.item-delete', function(e) {
				var node = $(this); 
				var params = {
					id: node.parents('li').find('[name="address"]').attr('id')
				};

				self.removeRecord(params, function() {
					node.parents('li').remove();
				});
			});

			// 编辑记录
			$('.list').on('click', '.item-edit', function(e) {
				// 此处加入获取data对象的代码
				var data = {};

				self.showAdd(data);
			});

			// 保存地址
			$('#save').on('click', function(e) {
				if(self.checkAddress('#addAddress input, #addAddress textarea')) {
					self.saveAddress();
				}
			});

			// 立即下单
			$('#submit').on('click', function(e) {
				if(self.checkAddress('#addressList input')) {
					self.showConfirm();
				}
			});

			// 确认下单
			$('#confirmBtn').on('click', function(e) {
				if(self.checkAddress('#addressList input')) {
					self.submitData();
				}
			});

			// 蒙层点击
			$('.mask').on('click', function(e) {
				self.showMain();
			});

			// 选中地址
			$('.list').on('click', '.item', function(e) {
				$('.item [name="address"]').removeAttr('checked');
				$(this).find('[name="address"]').attr('checked', 'checked');
			});
		},
		/**
		 * 显示主页面
		 * @return {[type]} [description]
		 */
		showMain: function() {
			$('#addressList').removeClass('hide');
			$('#addAddress').addClass('hide');
			$('.mask').addClass('hide');
			$('#confirm').addClass('hide');
		},
		/**
		 * 显示添加地址页面
		 * @return {[type]} [description]
		 */
		showAdd: function(data) {
			$('#addressList').addClass('hide');
			$('#addAddress').removeClass('hide');	
			// 将已有数据塞入分支流程
			if(data) {
				this.setData('#addAddress input, #addAddress textarea');
			}
		},
		showConfirm: function() {
			$('.mask').removeClass('hide');
			$('#confirm').removeClass('hide');
		},
		/**
		 * 删除数据
		 * @return {[type]} [description]
		 */
		removeRecord: function(id, callback) {
			// 此处加入删除数据的方法

			if(callback && typeof callback == 'function') {
				callback();
			}
		},
		/**
		 * 设置数据
		 * @return {[type]} [description]
		 */
		setData: function(node, data) {
			if(!data) {
				return;
			}

			$(node).each(function(i, item) {
				var name = $(item).attr('name');

				$(item).val(data.name);
			});
		},
		/**
		 * 获取数据
		 * @return {[type]} [description]
		 */
		getData: function(node) {
			var data = {};

			$(node).each(function(i, item) {
				var name = $(item).attr('name');

				data[name] = $.trim($(item).val());
			});

			return data;
		},
		/**
		 * 校验数据
		 * @return {[type]} [description]
		 */
		checkAddress: function(node) {
			var self = this;
			var flag = true;

			$(node).each(function(i, item) {
				var value = $.trim($(item).val());

				$(item).removeClass('error');
				if(value == '' || value == 'on') {
					$(item).addClass('error');
					flag = false;

					// 提示
					dialog({
						type: 'info',
						message: $(item).attr('placeholder')
					});

					return false;
				}
			});

			return flag;
		},
		/**
		 * 校验数据
		 * @return {[type]} [description]
		 */
		saveAddress: function() {
			var self = this;

			var data = self.getData('#addAddress input, #addAddress textarea');
			console.debug(data);
			// 此处加入保存地址的操作

			// 保存成功
			// 增加一行记录
			var template = $('<li><div class="item"><div class="item-check"><input type="radio" name="address"></div><div class="item-info"><p>程文晶 15651869865</p><p>江苏省南京市</p></div></div><div class="operate"><a class="item-edit">编辑</a><a class="item-delete">删除</a></div></li>');
			$('#add').before(template);
			template.find('[name=address]').click();
			dialog({
				type: 'info',
				message: '保存成功'
			});

			self.showMain();
		},
		/**
		 * 提交数据
		 * @return {[type]} [description]
		 */
		submitData: function() {
			var self = this;

			var data = self.getData('#addressList input');
			console.debug(data);
			// 此处加入确认下单代码
		}
	}.init();
});