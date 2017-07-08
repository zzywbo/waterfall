

window.onload=function(){
	waterfall('main','box');

    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    
    window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
            	var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div'); //添加 元素节点
                oPic.className='pic';                   //添加 类名 name属性
                oBox.appendChild(oPic);              //添加 子节点
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        };
    }
}

function waterfall(parent,box){
	//将main下所有class为box的元素取出来
	var oparent=document.getElementById(parent);
	var oBoxs=getByClass(oparent,box);
	//计算显示列数
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main 的宽
	oparent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	
	var hArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//获取高度最低的
			var minH=Math.min.apply(null,hArr);
			var index=getMin(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			//或者是oBoxs[i].style.left=oBoxW*index+'px';

			//更新数组，把高度最低的更新
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}

}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array(),
		oElements=parent.getElementsByTagName('div');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMin(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}


function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getByClass(oParent,'box');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}