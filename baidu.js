var baidu = (function() {
	var timer = null

	return {
		init(ele) {
			if (typeof ele === 'string') {
				ele = document.querySelector(ele)
			}
			this.$input_search=ele.querySelector('.input_search')
			this.$input_tip=ele.querySelector('.input_tip')
	
			this.event()
		},

		event() {
			var _this = this
			//输入框值改变，获取相应的数据
			this.$input_search.oninput=function(){
				if(this.value){
				_this.getData()
				}
			}
			
			//获取焦点时，获取数据
			this.$input_search.onfocus=function(){
				_this.show_tip()
			}
		},
		//jsonp获取对应数据
		getData() {
			var _this=this
			var params = {
				wd: _this.$input_search.value,
				cb: "baidu.getBaiduParams"
			}
			fn("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", params);
		},
		//调用jsonp里的cb函数
		getBaiduParams(data) {
			data = data.s
			data = data.map(function(x){
				return '<li>'+x+'</li>';
			})
			data = data.join('')
			this.$input_tip.innerHTML = data
		},
		
		show_tip(val){
			val = val || 'none';
			this.$input_search.style.display=val
		}
	}

}())
