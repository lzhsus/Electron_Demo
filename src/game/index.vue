<script setup>
import { Notice, Message, Modal } from "view-ui-plus";
import moment from "moment";
import GlobalData from "./data"
import set_UUID from "src/helper/uuid"
import { setInterval, clearInterval } from "buffer";

const gameSubmit = () => {
  window.location.href = "http://localhost:3000/index/index.html";
};



const total = ref(0)
const perSecondCount = computed(()=>{
    let data = list1.value||[]
    return data.filter(item=>item.lvl>=1).map(item=>item.cost).reduce((sum, current) => sum + current, 0);
})

watch(total,()=>{
    list1.value = list1.value.map(item=>{
        return {
            ...item,
            buy:total.value>item.cost
        }
    })
},{ deep:true })

const uuid = ref("")

const list1 = ref([])
const list2 = ref(GlobalData.list2)
const list3 = ref(GlobalData.list3)
const list4 = ref(GlobalData.list4)

const tempAdd = ()=>{
    let cost = 1;
    total.value+=cost;
}

// 选着指定的类型
const add = (index)=>{
    let cost = list1.value[index].cost;
    if( total.value<cost ) return
    list1.value[index].lvl++;
    // 总数减少
    total.value = total.value - cost;
    // 计算下一次升级需要的数量
    list1.value[index].cost = list1.value[index].cost_func(cost)
}

let timeer = ref(null)
onMounted(async ()=>{
    list1.value = (GlobalData.list1||[]).map(item=>{
        return {
            ...item,
            buy:total.value>item.cost
        }
    })
    uuid.value = await set_UUID()

    timeer.value&&clearInterval(timeer.value)
    timeer.value = setInterval(()=>{
        total.value+=perSecondCount;
    },1000)
})

onUnmounted(()=>{
    timeer.value&&clearInterval(timeer.value)
})


</script>

<template>
    <div>
        <header class="main-header">
            <h1 class="main-title">空格键点击器 - 终极自动点击器在线游戏</h1>
        </header>

        <div id="game">
            <div id="header">
                <div id="counter"><span>{{total}}</span></div>
                <div id="per_second">{{perSecondCount}} 每秒</div>
                <div class="button-container">
                    <div id="main-button" class="main-btn" @click="tempAdd()">空格键点击器</div>
                    <div class="keyboard-hint">💡提示：您也可以按空格键进行点击！</div>
                </div>
                <div class="reset-container">
                    <button id="reset-button" class="reset-btn" onclick="game.resetGameSure();">
                        🔄 重置游戏
                    </button>
                    <div class="reset-hint">清晰的进度和免费资源</div>
                </div>
            </div>
        </div>

        <section id="upgrades" class="content-section">
            <div class="section-container">
                <h2 class="section-title">🛒 可用的空格键点击器升级</h2>
                <ul id="items">
                    <li class="item" v-for="(item,index) in list1" :key="index" :class="item.buy?'item_buyable':'item_disabled'">
                        <span class="item-level"><template v-if="item.lvl">x{{item.lvl}}</template></span>
                        <h3 class="item-title">{{item.title}}</h3>
                        <p class="item-desc">{{item.desc}}<b>{{item.initial_value}}{{item.txt}}</b></p>
                        <div class="cost" @click="add(index)">
                            <span class="currency-icon">⌨️</span>
                            <span class="item-cost">{{ item.cost }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section id="how-to-play" class="content-section">
            <div class="section-container">
                <h2 class="section-title">🎮 如何玩空格键点击器</h2>
                <div class="play-steps">
                    <div class="step-card" v-for="(item,index) in list2" :key="index">
                        <div class="step-number">{{item.num}}</div>
                        <h3>{{item.title}}</h3>
                        <p>{{item.desc}}</p>
                    </div>
                </div>

                <div class="pro-tips">
                    <h2>⚡ 空格键点击器精通指南</h2>
                    <ul class="tips-list">
                        <li v-for="(item,index) in list3" :key="index">
                            <span class="tip-icon">{{item.icon}}</span> <strong>{{item.title}}:</strong>{{item.desc}}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="faq" class="content-section">
            <div class="section-container">
                <h2 class="section-title">❓ 空格键点击器常见问题解答</h2>
                <div class="faq-grid">
                    <div class="faq-item" v-for="(item,index) in list4" :key="index">
                        <h3 class="faq-question">{{item.icon}} {{item.title}}</h3>
                        <p class="faq-answer">{{item.desc}}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <Button class="btn" type="primary" size="large" long @click="gameSubmit()">返回首页</Button>

    <Space><div class="ivu-p-16" style="color:#808695;">设备标识:{{uuid}}</div></Space>
</template>

<style lang="scss" scoped>

/* Main Header */
.main-header {
  text-align: center;
  padding: 30px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
  .main-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    text-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
    filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.2));
    line-height: 1.2;
  }
}

.vertical-align-inherit {
  vertical-align: inherit;
}
</style>


<style lang="scss">
html {
  background-color: #f3f0ff;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

body {
  background-color: #f3f0ff;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f3f0ff 0%, #e9d5ff 50%, #ddd6fe 100%);
  z-index: -1;
  will-change: transform;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* Performance Monitor Styles */
.performance-monitor {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #00ff00;
  font-family: "Courier New", monospace;
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  min-width: 200px;
  display: none;
}

.performance-monitor.show {
  display: block;
}

.performance-monitor .fps {
  color: #00ff00;
}

.performance-monitor .fps.warning {
  color: #ffff00;
}

.performance-monitor .fps.critical {
  color: #ff0000;
}

.performance-monitor .mode {
  color: #00ffff;
}

.performance-monitor .particles {
  color: #ff00ff;
}

.performance-monitor .memory {
  color: #ff8800;
}

.performance-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  z-index: 1001;
}

.performance-toggle:hover {
  background: rgba(0, 0, 0, 0.9);
}
/* Modern Clicker Styles */
/* Color Scheme:
   Primary: #7c3aed (Purple)
   Secondary: #a855f7 (Light Purple)
   Accent: #c084fc (Soft Purple)
   Background: #f3f0ff (Very Light Purple)
   Dark: #5b21b6 (Dark Purple)
*/

/* Performance optimizations */
* {
  /* Reduce repaints and reflows */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Optimize box model */
  box-sizing: border-box;
  /* Reduce paint complexity */
  will-change: auto;
}

/* Hardware acceleration for animated elements */
.particle,
.currency-particle,
.main-btn,
.item,
.step-card,
.faq-item {
  /* Enable hardware acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Optimize for animations */
  will-change: transform, opacity;
  /* Prevent layout shifts */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Optimize scrolling container */
body,
html {
  /* Enable hardware acceleration */
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  /* Optimize scroll performance */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  /* Prevent horizontal scroll */
  overflow-x: hidden;
}

/* Prevent initial white flash */
html {
  background-color: #f3f0ff;
}

body {
  user-select: none;
  /* Fixed background to prevent repainting during scroll */
  background: linear-gradient(135deg, #f3f0ff 0%, #e9d5ff 50%, #ddd6fe 100%);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  padding-bottom: 60px; /* Add padding to account for fixed footer */
  min-height: 100vh;
  overflow-x: hidden;
  /* Hardware acceleration for smoother scrolling */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Prevent background flicker */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /* Optimize paint performance */
  contain: layout style paint;
}

/* Optimize animations for better performance */
@keyframes pulse {
  0% {
    transform: translateZ(0) scale(1);
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
  }
  70% {
    transform: translateZ(0) scale(1.05);
    box-shadow: 0 0 0 10px rgba(124, 58, 237, 0);
  }
  100% {
    transform: translateZ(0) scale(1);
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateZ(0) translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateZ(0) translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateZ(0) translateX(5px);
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(124, 58, 237, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.8),
      0 0 30px rgba(124, 58, 237, 0.6);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateZ(0) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateZ(0) translateY(0);
  }
}

@keyframes purchaseSuccess {
  0% {
    transform: translateZ(0) scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    transform: translateZ(0) scale(1.1);
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.4);
  }
  100% {
    transform: translateZ(0) scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Optimize particle animations */
.particle,
.currency-particle {
  position: absolute;
  pointer-events: none;
  z-index: 1000;
  /* Hardware acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Optimize for frequent updates */
  will-change: transform, opacity;
  /* Prevent layout impact */
  contain: layout style paint;
}

/* Optimize main button for frequent interactions */
.main-btn {
  /* Hardware acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Optimize for animations */
  will-change: transform, box-shadow;
  /* Prevent layout shifts */
  contain: layout style paint;
}

/* Optimize items for hover effects */
.item {
  /* Hardware acceleration */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Optimize for hover animations */
  will-change: transform, box-shadow;
  /* Prevent layout shifts */
  contain: layout style paint;
}

.main-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
  filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.2));
  line-height: 1.2;
}

.hide {
  display: none !important;
}

#game {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 10px;
}

#header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(168, 85, 247, 0.1) 100%
  );
  backdrop-filter: blur(15px);
  border-radius: 25px;
  margin-bottom: 30px;
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.2);
  /* Optimize rendering performance */
  will-change: transform;
  transform: translateZ(0);
}

#counter {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  text-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
  filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.2));
}

#counter span {
  display: block;
}

#per_second {
  font-size: 1.2rem;
  background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.9;
  margin-bottom: 30px;
  font-weight: 500;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.keyboard-hint {
  font-size: 0.9rem;
  color: #7c3aed;
  margin-top: 10px;
  opacity: 0.8;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(124, 58, 237, 0.2);
}

.reset-container {
  margin-top: 25px;
  text-align: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.reset-container:hover {
  opacity: 1;
}

.reset-btn {
  background: linear-gradient(145deg, #6b7280 0%, #9ca3af 50%, #4b5563 100%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(107, 114, 128, 0.2),
    0 1px 4px rgba(107, 114, 128, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.reset-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.6s;
}

.reset-btn:hover::before {
  left: 100%;
}

.reset-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 12px rgba(107, 114, 128, 0.3),
    0 2px 6px rgba(107, 114, 128, 0.2);
  background: linear-gradient(145deg, #9ca3af 0%, #d1d5db 50%, #6b7280 100%);
}

.reset-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 6px rgba(107, 114, 128, 0.2),
    0 1px 3px rgba(107, 114, 128, 0.1);
}

.reset-hint {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 6px;
  opacity: 0.6;
  font-weight: 400;
  text-shadow: none;
}

.main-btn {
  background: linear-gradient(145deg, #7c3aed 0%, #a855f7 50%, #5b21b6 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4),
    0 4px 12px rgba(124, 58, 237, 0.2);
  text-transform: uppercase;
  letter-spacing: 2px;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}

.main-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s;
}

.main-btn:hover::before {
  left: 100%;
}

.main-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(124, 58, 237, 0.5),
    0 6px 18px rgba(124, 58, 237, 0.3);
  background: linear-gradient(145deg, #a855f7 0%, #c084fc 50%, #7c3aed 100%);
}

.main-btn:active,
.btn-active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4),
    0 3px 10px rgba(124, 58, 237, 0.2);
}

/* Items */
#items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
  /* Remove max-height and overflow to prevent scroll conflicts */
  padding: 10px;
  /* Optimize for smooth scrolling */
  will-change: transform;
  transform: translateZ(0);
  /* Prevent scroll conflicts */
  pointer-events: auto;
  /* Optimize rendering */
  contain: layout style paint;
}

/* Remove custom scrollbar styles since we're not using internal scrolling */
/* #items::-webkit-scrollbar {
    width: 8px;
}

#items::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

#items::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    border-radius: 4px;
    will-change: background;
}

#items::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #a855f7 0%, #c084fc 100%);
}

#items {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
} */

.item {
  background: linear-gradient(
    135deg,
    rgba(200, 200, 200, 0.15) 0%,
    rgba(220, 220, 220, 0.2) 100%
  );
  backdrop-filter: blur(8px);
  border: 2px solid rgba(150, 150, 150, 0.2);
  border-radius: 15px;
  padding: 16px;
  cursor: not-allowed;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease,
    box-shadow 0.3s ease, border-color 0.3s ease;
  opacity: 0.4;
  position: relative;
  overflow: hidden;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Optimize rendering */
  will-change: transform;
  transform: translateZ(0);
}

.item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(124, 58, 237, 0.1),
    transparent
  );
  transition: left 0.6s;
}

.item:hover::before {
  left: 100%;
}

.item_buyable {
  opacity: 1;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(243, 240, 255, 0.5) 100%
  );
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.15),
    0 2px 8px rgba(124, 58, 237, 0.1);
  cursor: pointer;
}

.item_buyable:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 35px rgba(124, 58, 237, 0.25),
    0 4px 15px rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.5);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(243, 240, 255, 0.6) 100%
  );
}

.item_buyable:active {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3),
    0 3px 12px rgba(124, 58, 237, 0.2);
}

.item_disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: linear-gradient(
    135deg,
    rgba(200, 200, 200, 0.15) 0%,
    rgba(220, 220, 220, 0.2) 100%
  );
  border-color: rgba(150, 150, 150, 0.2);
}

.item_disabled .item-title {
  background: linear-gradient(135deg, #999 0%, #bbb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.item_disabled .cost {
  background: linear-gradient(90deg, #999 0%, #bbb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.item_disabled .item-level {
  background: linear-gradient(145deg, #999 0%, #bbb 50%, #888 100%);
  opacity: 0.6;
}

.item-level {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(145deg, #7c3aed 0%, #a855f7 50%, #5b21b6 100%);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 30px;
  text-align: center;
}

.item-title {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  padding-right: 50px;
  line-height: 1.2;
}

.item-desc {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 600;
  background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 6px 10px;
  background-color: rgba(124, 58, 237, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(124, 58, 237, 0.1);
  margin-top: auto;
}

.currency-icon {
  font-size: 1.2rem;
}

.item-cost {
  font-size: 1.1rem;
}

.item_last_child {
  margin-bottom: 100px;
}

/* Footer */
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.95) 0%,
    rgba(168, 85, 247, 0.9) 100%
  );
  backdrop-filter: blur(15px);
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  box-sizing: border-box;
  margin: 0;
}

#footer a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

#footer a:hover {
  color: white;
  text-decoration: underline;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Particles */
.particle {
  position: absolute;
  pointer-events: none;
  z-index: 1000;
}

.score {
  font-weight: 700;
  font-size: 1.4rem;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(124, 58, 237, 0.3);
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
}

.currency-particle {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  font-size: 1.5rem;
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
  #game {
    padding: 10px;
  }

  #header {
    padding: 30px 15px;
  }

  .main-btn {
    padding: 15px 30px;
    font-size: 1.2rem;
    min-width: 160px;
  }

  .reset-btn {
    padding: 6px 14px;
    font-size: 0.8rem;
  }

  .reset-hint {
    font-size: 0.65rem;
  }

  #items {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 12px;
    /* Remove max-height constraint for better mobile experience */
  }

  .item {
    padding: 12px;
    min-height: 120px;
  }

  .item-title {
    font-size: 1rem;
    padding-right: 45px;
  }

  .item-desc {
    font-size: 0.8rem;
  }

  .item-level {
    top: 10px;
    right: 10px;
    padding: 3px 8px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  #counter {
    font-size: clamp(2rem, 12vw, 4rem);
  }

  .main-btn {
    padding: 12px 25px;
    font-size: 1rem;
    min-width: 140px;
  }

  .reset-btn {
    padding: 5px 12px;
    font-size: 0.75rem;
  }

  .reset-hint {
    font-size: 0.6rem;
  }

  #items {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    /* Remove max-height constraint for better mobile experience */
  }

  .item {
    padding: 10px;
    min-height: 110px;
  }

  .item-title {
    font-size: 0.9rem;
    padding-right: 40px;
  }

  .item-desc {
    font-size: 0.75rem;
    -webkit-line-clamp: 3;
  }

  .item-level {
    padding: 2px 6px;
    font-size: 0.7rem;
  }

  .cost {
    padding: 4px 8px;
    font-size: 0.9rem;
  }
}

/* Animations */
.pulse {
  animation: pulse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.shake {
  animation: shake 0.6s ease-in-out;
}

.glow {
  animation: glow 2s ease-in-out infinite;
}

.item {
  animation: fadeInUp 0.6s ease-out;
}

/* Reduced animation delays for better performance */
.item:nth-child(1) {
  animation-delay: 0.05s;
}
.item:nth-child(2) {
  animation-delay: 0.1s;
}
.item:nth-child(3) {
  animation-delay: 0.15s;
}
.item:nth-child(4) {
  animation-delay: 0.2s;
}
.item:nth-child(5) {
  animation-delay: 0.25s;
}
.item:nth-child(6) {
  animation-delay: 0.3s;
}
.item:nth-child(7) {
  animation-delay: 0.35s;
}
.item:nth-child(8) {
  animation-delay: 0.4s;
}
.item:nth-child(9) {
  animation-delay: 0.45s;
}
.item:nth-child(10) {
  animation-delay: 0.5s;
}

.purchase-success {
  animation: purchaseSuccess 0.6s ease-out;
}

/* Content Sections */
.content-section {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

/* Specific spacing for upgrades section */
#upgrades {
  margin-top: 10px;
}

/* Add bottom spacing for last content section to prevent footer overlap */
.content-section:last-of-type {
  margin-bottom: 80px;
  padding-bottom: 20px;
}

.section-container {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(168, 85, 247, 0.1) 100%
  );
  backdrop-filter: blur(15px);
  border-radius: 25px;
  padding: 40px 30px;
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.2);
  /* Optimize rendering performance */
  will-change: transform;
  transform: translateZ(0);
  /* Prevent scroll conflicts */
  pointer-events: auto;
  /* Optimize rendering */
  contain: layout style paint;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  text-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
}

/* How to Play Styles */
.play-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.step-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(243, 240, 255, 0.4) 100%
  );
  border: 2px solid rgba(124, 58, 237, 0.2);
  border-radius: 18px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  /* Optimize for smooth animations */
  will-change: transform;
  transform: translateZ(0);
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(124, 58, 237, 0.2);
  border-color: rgba(124, 58, 237, 0.4);
}

.step-number {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.step-card h3 {
  color: #7c3aed;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.step-card p {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.pro-tips {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1) 0%,
    rgba(168, 85, 247, 0.05) 100%
  );
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.pro-tips h2 {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tips-list li:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateX(5px);
}

.tip-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  flex-shrink: 0;
}

/* FAQ Styles */
.faq-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.faq-item {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(243, 240, 255, 0.4) 100%
  );
  border: 2px solid rgba(124, 58, 237, 0.2);
  border-radius: 15px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  /* Optimize for smooth animations */
  will-change: transform;
  transform: translateZ(0);
}

.faq-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.3);
}

.faq-question {
  color: #7c3aed;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
}

.faq-answer {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
}

/* Responsive Design for Content Sections */
@media (max-width: 768px) {
  body {
    padding-bottom: 70px; /* Adjust for mobile footer */
  }

  .content-section {
    margin: 20px auto;
    padding: 0 15px;
  }

  #upgrades {
    margin-top: 5px;
  }

  #game {
    padding-bottom: 5px;
  }

  .content-section:last-of-type {
    margin-bottom: 20px;
    padding-bottom: 15px;
  }

  .section-container {
    padding: 30px 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .play-steps {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .step-card {
    padding: 20px;
  }

  .faq-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .faq-item {
    padding: 18px;
  }

  .pro-tips {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  body {
    padding-bottom: 60px; /* Adjust for smaller mobile footer */
  }

  .section-title {
    font-size: 1.8rem;
  }

  .step-number {
    font-size: 2rem;
  }

  .step-card h3 {
    font-size: 1.2rem;
  }

  .step-card p,
  .faq-answer {
    font-size: 0.9rem;
  }

  .play-steps {
    grid-template-columns: 1fr;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .main-title {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    padding: 0 10px;
  }

  .content-section:last-of-type {
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
}
</style>
