function fn(url,obj){
	var $script=document.createElement('script')
	var f;
	url.indexOf('?')>-1?f='&':f='?';
	url+=f+'_='+Date.now();
	for(var i in obj){
		url+='&'+i+'='+obj[i]
	}
	$script.src=url
	document.body.appendChild($script);
}