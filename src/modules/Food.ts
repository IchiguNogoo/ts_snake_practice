// Food.ts

const GAME_WIDTH = 650; // 游戏区域宽度
const GAME_HEIGHT = 450; // 游戏区域高度
const GRID_SIZE = 10; // 网格大小

// 食物类
export class Food{
    // 获取食物元素的引用并缓存
    element: HTMLElement

    constructor(){
        // 获取食物元素
        this.element = document.getElementById('food')!;
        // 初始化食物位置
        this.change();
    }

    // 获取食物X轴坐标
    get X(){
        return this.element.offsetLeft;
    }

    // 获取食物Y轴坐标
    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物位置
    change(){
        // 计算食物可出现的最大X和Y坐标
        const maxX = GAME_WIDTH - this.element.offsetWidth;
        const maxY = GAME_HEIGHT - this.element.offsetHeight;
        // 生成随机的X和Y坐标，确保它们是GRID_SIZE的倍数
        const X = Math.round(Math.random() * (maxX / GRID_SIZE)) * GRID_SIZE;
        const Y = Math.round(Math.random() * (maxY / GRID_SIZE)) * GRID_SIZE;
        // 设置食物的新位置
        this.element.style.left = `${X}px`;
        this.element.style.top = `${Y}px`;
        // 显示食物
        this.element.style.display = 'block';
    }
}
