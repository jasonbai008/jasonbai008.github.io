<template>
  <div class="wrap contactMe">
    <!-- 微信 -->
    <div class="item">
      <div class="left">
        <img src="/touchme/wechat.png" alt />
      </div>
      <div class="right">
        <h2>Wechat</h2>
        <p>1105843831</p>
      </div>
    </div>
    <!-- 邮箱 -->
    <div class="item">
      <div class="left">
        <img src="/touchme/email.png" alt />
      </div>
      <div class="right">
        <h2>Email</h2>
        <p>
          <a href="mailto:byygkcg@163.com">byygkcg@163.com</a>
        </p>
      </div>
    </div>
    <!-- 地址 -->
    <div class="item">
      <div class="left">
        <img src="/touchme/address.png" alt />
      </div>
      <div class="right">
        <h2>Address</h2>
        <p>
          <a href="https://j.map.baidu.com/a1/ptGJ" target="_blank">Chaoyang District, Beijing</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contact-me",
};
</script>
<style>
.wrap {
  margin: 50px 0;
}

.contactMe .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  opacity: 0; /* 开头隐藏 */
}

/* forwards表示：动画结束后，元素将保持动画的最后一帧状态 */
.item:nth-of-type(1) {
  animation: fadeIn 0.8s 0s forwards;
}
.item:nth-of-type(2) {
  animation: fadeIn 0.8s 0.3s forwards;
}
.item:nth-of-type(3) {
  animation: fadeIn 0.8s 0.6s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.contactMe .left {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  margin-right: 20px;
}
.item:nth-of-type(1) .left {
  background: #dbfbd9;
}
.item:nth-of-type(2) .left {
  background: #ece8fd;
}
.item:nth-of-type(3) .left {
  background: #fedfd7;
}

.contactMe .left img {
  width: 30px;
  height: 30px;
  display: block;
  margin: auto;
}

.contactMe .right {
  flex-grow: 1;
}

.contactMe h2 {
  margin-top: 15px;
  margin-bottom: 0;
  border: none;
}

.contactMe p {
  margin-top: 5px;
}
.contactMe p a:hover {
  cursor: pointer;
}
.contactMe p::selection {
  color: #fff;
  background: #46bd87;
}
</style>
