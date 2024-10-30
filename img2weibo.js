function getElementPos(elementId) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
 
    var el = elementId
 
    if(el.parentNode === null || el.style.display == 'none')
    {
        return false;
    }
 
    var parent = null;
    var pos = [];
    var box;
 
    if(el.getBoundingClientRect)    //IE
    {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
 
        return {x:box.left + scrollLeft, y:box.top + scrollTop};
    }
    else if(document.getBoxObjectFor)   // gecko
    {
        box = document.getBoxObjectFor(el);
 
        var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0;
        var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0;
 
        pos = [box.x - borderLeft, box.y - borderTop];
    }
    else    // safari & opera
    {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1
            || ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' ))
        {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
        }
    }
 
    if (el.parentNode) { parent = el.parentNode; }
    else { parent = null; }
 
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML')
    { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
 
        if (parent.parentNode) { parent = parent.parentNode; }
        else { parent = null; }
    }
    return {x:pos[0], y:pos[1]};
}
function img2weibo(img){
var imgsrc=img.src;
var imgShare=document.getElementById("imgSinaShare");
var imgTitle = document.getElementsByTagName("title")[0];
var pos=getElementPos(img);
var oimage = new Image();
oimage.src = img.src;
width = oimage.width;
height = oimage.height;
var left= pos.x+2;
var top= pos.y+img.height-28;
if(height>=10 && width>=10)
{
	if (imgsrc) {
			imgShare.style.display = "inline";
			imgShare.style.left = left + "px";
			imgShare.style.top = top + "px";
			var title = encodeURIComponent("图片分享来自："+((imgTitle && imgTitle.innerHTML)? imgTitle.innerHTML : "图片分享"));
			var imgsrcurl=encodeURIComponent(imgsrc);
			var linkurl=encodeURIComponent(window.location.href);
imgShare.href="http://service.weibo.com/share/share.php?url="+linkurl+"&title=" + title+"&appkey=2681605913&ralateUid=&pic="+imgsrcurl;
imgShare.target="_blank";
		}
}
}
function killit(obj, e) {
	var e = window.event || e, relatedTarget = e.toElement || e.relatedTarget;
	var imgShare=document.getElementById("imgSinaShare");
	while(relatedTarget && relatedTarget != obj)
	relatedTarget = relatedTarget.parentNode;
	if(e.relatedTarget){
		var tagName=e.relatedTarget.tagName;
	}else{
	var tagName=e.toElement.tagName;
	}
	if(!relatedTarget&&tagName!="IMG")
       {
        imgShare.style.display = "none";
       }
} 