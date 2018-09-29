var baidu = (function () {
	var timer = null

	return {
		init(ele) {
			if (typeof ele === 'string') {
				ele = document.querySelector(ele)
			}
		
			this.$input_search = ele.querySelector('.input_search')
			this.$input_tip = ele.querySelector('.input_tip')

			this.event(ele)
		},

		event(ele) {
			var _this = this
			//输入框值改变，获取相应的数据
			this.$input_search.oninput = function () {
				clearTimeout(timer)
				if (this.value) {
					timer=setTimeout(function(){
					_this.getData()
					_this.show_tip('block')
					},400)
				}
			}

			//点击下拉框的值，赋值到搜索框中
			this.$input_tip.onclick = function (e) {
				e=e||window.event
				var target = e.target|| e.srcElement
				if(target.nodeName == 'LI'){
					_this.$input_search.value = target.innerHTML
					_this.show_tip()
				}
			}

			// 失去焦点，隐藏
			document.onclick = function(e) {
                if(e.target.className != 'input_box') {
                    _this.show_tip()
				}
			}
		},
		//jsonp获取对应数据
		getData() {
			var _this = this
			var params = {
				wd: _this.$input_search.value,
				cb: "baidu.getBaiduParams"
			}
			fn("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", params);
		},
		//调用jsonp里的cb函数
		getBaiduParams(data) {
			data = data.s
			data = data.map(function (x) {
				return '<li>' + x + '</li>';
			})
			data = data.join('')
			this.$input_tip.innerHTML = data
		},

		show_tip(val) {
			val = val || 'none';
			this.$input_tip.style.display = val
		}
	}

}())