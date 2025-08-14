let list1 = [
    {   
        lvl: 0,
        cost: 25,
        initial_value: 0.5,
        cost_func: (x) => 1.15 * x,
        value_func: (x) => 1.0 * x,
        title:"橡皮擦助手",
        desc:"经典学生技巧——把橡皮擦塞到空格键下面，保持按下状态。每秒可产生",
        txt:"次点击。"
    },{   
        lvl: 0,
        cost: 100,
        initial_value: 2,
        cost_func: (x) => 1.25 * x,
        value_func: (x) => 1.0 * x,
        title:"机械键盘",
        desc:"职业玩家之选！Cherry MX 轴，闪电般响应，每秒",
        txt:"次完美点击。"
    },{   
        lvl: 0,
        cost: 500,
        initial_value: 8,
        cost_func: (x) => 1.3 * x,
        value_func: (x) => 1.0 * x,
        title:"程序员之手",
        desc:"无数次编程马拉松磨练出的双手。肌肉记忆力臻完美。每秒精准敲击 MX 轴，闪电般响应，每秒",
        txt:"个空格键。"
    },{   
        lvl: 0,
        cost: 2500,
        multiplier: 2,
        cost_func: (x) => 3.0 * x,
        title:"金拇指",
        desc:"传说中的黄金拇指，蕴含神秘力量。每次升级，你的手动点击能力",
        txt:"都会翻倍！"
    },{   
        lvl: 0,
        cost: 5000,
        initial_value: 50,
        cost_func: (x) => 1.4 * x,
        value_func: (x) => 1.15 * x,
        title:"自动点击器",
        desc:"USB 供电机械式按键装置。即插即用，简单便捷。每秒机械式按压",
        txt:"个空格键，永不疲倦。"
    },{   
        lvl: 0,
        cost: 25000,
        initial_value: 200,
        cost_func: (x) => 1.35 * x,
        value_func: (x) => 1.2 * x,
        title:"电竞团队",
        desc:"USB 精英职业电竞团队完美协作。闪电般的反应，协调一致的攻击。团队合作，每秒点击次数高达",
        txt:"次。"
    },{   
        lvl: 0,
        cost: 100000,
        initial_value: 1000,
        cost_func: (x) => 1.4 * x,
        value_func: (x) => 1.25 * x,
        title:"AI点击助手",
        desc:"USB 深度学习驱动的点击系统，可预测最佳点击时机。AI 精准控制，每秒可执行",
        txt:"次完美点击。"
    },{   
        lvl: 0,
        cost: 500000,
        initial_value: 5000,
        cost_func: (x) => 1.4 * x,
        value_func: (x) => 1.3 * x,
        title:"量子键盘",
        desc:"未来科技利用量子纠缠，实现跨维度同时点击。量子速度可达每秒",
        txt:"次点击。"
    },{   
        lvl: 0,
        cost: 2500000,
        initial_value: 20000,
        cost_func: (x) => 1.4 * x,
        value_func: (x) => 1.3 * x,
        title:"宇宙点击矩阵",
        desc:"横跨宇宙的空格键网络，连接着无数个世界。银河系协调每秒产生",
        txt:"次宇宙咔哒声。"
    }
    
]
let list2 = [
    {   
        num:"1️⃣",
        title:"开始你的空格键点击器之旅",
        desc:"在“空格键点击器”中，点击空格键或按下实际的空格键即可获得积分。每次点击都会获得宝贵的空格键积分，您可以使用这些积分在这款令人上瘾的“空格键点击器”游戏中升级。"
    },{
        num:"2️⃣",
        title:"购买自动点击器",
        desc:"在“空格键点击器”游戏中获得 25 分后，购买第一个“橡皮擦助手”。自动点击器会持续工作，即使您没有在“空格键点击器”游戏中主动点击，它也会为您产生分数。"
    },{
        num:"3️⃣",
        title:"升级策略",
        desc:"在“空格键点击器”中尽早关注“金拇指” ——它会让你的手动点击能力翻倍！在“空格键点击器”的冒险之旅中，平衡自动点击器的被动收入和主动点击的乘数。"
    },{
        num:"4️⃣",
        title:"空格键点击器高级技巧",
        desc:"当自动点击器的价格低于您总积分的 10% 时，请购买。Spacebar Clicker游戏奖励耐心——让您的自动点击器在 Spacebar Clicker 中一夜之间积累积分！"
    },{
        num:"5️⃣",
        title:"放置策略",
        desc:"让 Spacebar Clicker 游戏在浏览器标签页中运行！即使您没有在玩 Spacebar Clicker，自动点击器也会继续工作。请定期回来使用您 Spacebar Clicker 帝国中积累的积分。"
    },{
        num:"6️⃣",
        title:"最终目标",
        desc:"瞄准宇宙点击矩阵——终极空格键点击器升级！它需要花费250万点数，但对于忠实的空格键点击器玩家来说，却能带来丰厚的回报。"
    }
]
let list3 = [
    {
        icon:"💡",
        title:"游戏初期",
        desc:"首先在 Spacebar Clicker 中购买 Eraser Helper，然后保存 Golden Thumb 以使您在 Spacebar Clicker 游戏中的点击能力加倍"
    },{
        icon:"⚙️",
        title:"游戏中期",
        desc:"专注于机械键盘和 Coder's Hands，以获得 Spacebar Clicker 中稳定的自动点击收入"
    },{
        icon:"🚀",
        title:"游戏后期",
        desc:"投资 AI Click Assistant 和 Quantum Keyboard，让您的 Spacebar Clicker 帝国实现指数级增长"
    },{
        icon:"🌟",
        title:"最优策略",
        desc:"当自动点击器在 Spacebar Clicker 中工作时，请继续手动点击 - 结合主动和被动游戏以最大程度地提高 Spacebar Clicker 的效率！"
    }
]
let list4 = [
    {   
        icon:"🎯",
        title:"什么是空格键点击器？",
        desc:"空格键点击器是一款令人上瘾的放置点击游戏，您可以从简单的空格键点击开始，逐渐掌握宇宙级的自动点击系统。在这款精彩的空格键点击器体验中，从基础技巧进阶到由人工智能驱动的高级点击器！"
    },{   
        icon:"⚡",
        title:"空格键点击器中的自动点击器如何工作？",
        desc:"Spacebar Clicker 中的自动点击器无需手动点击即可自动得分。每个自动点击器的点击速率各不相同——从每秒 0.5 次点击（Eraser Helper）到 Spacebar Clicker 游戏中的每秒 25,000 次点击（Cosmic Click Matrix）。"
    },{   
        icon:"💰",
        title:"我应该何时购买 Spacebar Clicker 的升级版？",
        desc:"当自动点击器的价格低于您在“空格键点击器”中总积分的 10% 时，请购买它们。尽早优先购买“金拇指”以获得点击倍增效果，然后在您的“空格键点击器”策略中专注于最具成本效益的自动点击器。"
    },{   
        icon:"🔄",
        title:"Spacebar Clicker 游戏会自动保存吗？",
        desc:"是的！您的 Spacebar Clicker 进度每隔几秒就会自动保存。您可以关闭浏览器，稍后再返回继续在 Spacebar Clicker 中畅玩您的点击帝国。"
    },{   
        icon:"⌨️",
        title:"我可以在 Spacebar Clicker 中使用我的真实空格键吗？",
        desc:"当然可以！按下实体空格键，或点击 Spacebar Clicker 中的屏幕空格键按钮。在这款名为 Spacebar Clicker 的空格键点击游戏中，这两种方法都能完美兼容。"
    },{   
        icon:"📱",
        title:"Spacebar Clicker 可以在移动设备上使用吗？",
        desc:"是的！Spacebar Clicker 响应速度极快，在手机和平板电脑上都能流畅运行。Spacebar Clicker 的触控界面让移动设备上的点击体验流畅愉悦。"
    },{   
        icon:"🎮",
        title:"Spacebar Clicker 真的免费吗？",
        desc:"完全免费！Spacebar Clicker 无需下载、无需注册、无任何隐藏费用。只需打开浏览器，即可立即开启 Spacebar Clicker 的空格键点击冒险之旅。"
    },{   
        icon:"🚀",
        title:"Spacebar Clicker 有最终升级吗？",
        desc:"官方说法？不——宇宙数字还在不断膨胀！然而，一旦你以100次点击解锁量子奇点生成器，你基本上就达到了“软无限”，可以重新获得声望值，获得巨大的乘数。"
    },{   
        icon:"⏰",
        title:"打败 Spacebar Clicker 需要多长时间？",
        desc:"空格键点击器是一款无尽的放置类游戏！想要达到宇宙点击矩阵需要付出努力，但从简单的点击到宇宙自动点击的旅程才是《空格键点击器》真正的乐趣所在。"
    }
]
export default {
    list1,
    list2,
    list3,
    list4
}
