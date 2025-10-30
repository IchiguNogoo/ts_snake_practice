// Snake.ts

export class Snake{
    // 蛇头元素
    head: HTMLElement;
    // 蛇身元素集合
    bodies: HTMLCollection;
    // 蛇的容器元素
    element: HTMLElement;
    // 记录蛇头的坐标
    private _x : number = 0;
    private _y : number = 0;

    constructor() {
        // 获取蛇头元素引用
        this.head = document.querySelector('#snake > div') as HTMLElement;
        // 获取蛇身元素集合引用
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        // 获取蛇的容器元素引用
        this.element = document.getElementById('snake')!;

        // 初始化蛇头坐标
        this._x = this.head.offsetLeft;
        this._y = this.head.offsetTop;
    }

    // // 获取蛇头X轴坐标
    get X() {
        return this._x;
    }

    // 获取蛇头Y轴坐标
    get Y() {
        return this._y;
    }

    // 设置蛇头X轴坐标
    set X(value: number) {
        if (this._x === value) return;
        if (value < 0 || value > 640) throw new Error("蛇撞墙了！");

        // 检测蛇是否试图向相反方向移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果试图向相反方向移动，调整方向以避免碰撞
            if (value > this._x) {
                value = this._x - 10;
            } else {
                value = this._x + 10;
            }
        }
        // 移动蛇身
        this.moveBody()
        // 更新蛇头X坐标
        this._x = value;
        this.head.style.left = `${value}px`;
        // 检查蛇头是否撞到蛇身
        this.checkHeadBody();
    }

    // 设置蛇头Y轴坐标
    set Y(value: number) {
        if (this._y === value) return;
        if (value < 0 || value > 440) throw new Error("蛇撞墙了！");
        // 检测蛇是否试图向相反方向移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果试图向相反方向移动，调整方向以避免碰撞
            if (value > this._y) {
                value = this._y - 10;
            } else {
                value = this._y + 10;
            }
        }
        // 移动蛇身
        this.moveBody()
        // 更新蛇头Y坐标
        this._y = value;
        this.head.style.top = `${value}px`;
        // 检查蛇头是否撞到蛇身
        this.checkHeadBody();
    }

    // 蛇身增加方法
    addBody() {
        // 在蛇的容器中添加一个新的div元素作为蛇身
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // 蛇身移动方法
    moveBody() {
        // 从后往前遍历蛇身，更新每一节蛇身的位置
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前一节蛇身的位置
            const prevX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            const prevY = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将当前蛇身移动到前一节蛇身的位置
            (this.bodies[i] as HTMLElement).style.left = `${prevX}px`;
            (this.bodies[i] as HTMLElement).style.top = `${prevY}px`;
        }
    }

    // 检查蛇头是否撞到蛇身方法
    checkHeadBody(){
        // 遍历蛇身，检查蛇头是否与蛇身重叠
        for(let i = 1; i < this.bodies.length; i++){
            const bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error("蛇撞到自己了！");
            }
        }
    }
}