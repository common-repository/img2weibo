<?php
/*
Plugin Name:分享图片到新浪微博
Plugin URI: http://www.nextonce.com/bo/img2weibo-1051/
Description: This plugin share your image to sina weibo. 
Author: zern 
Author URI: http://www.nextonce.com/
Version: 1.4
Put in /wp-content/plugins/ of your Wordpress installation
*/
/* Add Image to sina weibo Code */
add_filter('the_content', 'addimgtoweibo_replace');
function addimgtoweibo_replace ($content)
{   global $post;
	$pattern = "/<img(.*?)src=('|\")([^>]*).(bmp|gif|jpeg|jpg|png)('|\")(.*?)\/>/i";
    $replacement = '<img$1src=$2$3.$4$5 onmouseover="img2weibo(this);" onmouseout="killit(this,event);" $6/>';
    $content = preg_replace($pattern, $replacement, $content);
    return $content;
}
/* Add image js */
function imgtoweibo_foot(){
	print('
<script type="text/javascript" src="'.get_bloginfo('wpurl').'/wp-content/plugins/img2weibo/img2weibo.js"></script>
<a href="javascript:void(0);" id="imgSinaShare" style="display:none;position:absolute;"><img alt="分享图片到新浪微博" src="http://simg.sinajs.cn/blog7style/images/common/share.gif" /></a>
	');
}
add_action( 'wp_footer', 'imgtoweibo_foot' );
?>