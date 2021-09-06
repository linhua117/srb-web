<template>
	<div class="popup-box" @dblclick.self="close">
		<div :style="{width:Width}" class="box">
			<div class="header"  @mousedown.self="dragFun">
				<p>{{Title}}</p>
				<p @click="close" class="el-icon-close"></p>
			</div>
			<div class="content">
				<slot name="content"></slot>
			</div>
			<div class="footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'popup-box',
		props:["Title","Width"],
		methods:{
			close(){
				this.$emit('close');
			},
			dragFun(e){
				        var oDiv = e.path[1];
				        var disX = e.clientX - oDiv.offsetLeft;
				        var disY = e.clientY - oDiv.offsetTop;
				        document.onmousemove = function(e){
				            e.preventDefault();
							let boxWidth = e.target.offsetWidth * 2/3
				            var l = -(e.clientX - disX) >= boxWidth? -boxWidth : e.clientX - disX;
				            var t = e.clientY - disY >= 0 ? e.clientY - disY : 0;
							oDiv.style.left = l + "px"
				            oDiv.style.top = t + "px"
				        } 
				        document.onmouseup = function(){
				            document.onmousemove = null;
				            document.onmouseup = null;
				        }
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.popup-box{
			position: fixed;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
		    background: rgba(0,0,0,.3);
		    z-index: 10;
			display: flex;
			justify-content: center;
			align-items: center;
			.box{
				width: 50%;
				background:#fff;
				height: auto;
				border-radius: 4px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				position: absolute;
				.header{
					height:36px;
					background: #153d77;
					display: flex;
					justify-content: space-between;
					padding: 0 15px;
					cursor: move;
					font-size:16px;
					color: #fff;
					display: flex;
					align-items: center;
					.el-icon-close {
						line-height:36px;;
						padding: 0 2px;
						cursor: pointer;
						color: #fff;
						&:hover {
							color: #4aabd5;
						}
					}
				}
				.content {
					width: 100%;
					position: relative;
					display: flex;
					flex-direction: column;
				}
			}
	}
</style>
