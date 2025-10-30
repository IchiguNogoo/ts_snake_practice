// GameController.ts

// 引入外部类
import {Snake} from './Snake';
import {Food} from './Food';
import {ScoreBoard} from './ScoreBoard';

// 游戏控制类
export class GameController{
    snake: Snake; // 蛇实例
    food: Food; // 食物实例
    scoreBoard: ScoreBoard; // 计分板实例
    direction: string = 'ArrowRight'; // 当前移动方向
    isLive = true; // 游戏状态

    constructor(snake: Snake, food: Food, scoreBoard: ScoreBoard){
        this.snake = snake;
        this.food = food;
        this.scoreBoard = scoreBoard;
    }

    // 游戏初始化方法
    init(){
        console.log('Game initialized···');
        // 绑定键盘事件监听
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 开始游戏
        this.run();
    }

    // 键盘事件处理方法
    keydownHandler(event: KeyboardEvent){
        // 检查按键的合法性
        // console.log(`Key pressed: ${event.key}`);
        // console.log(this);
        this.direction = event.key;
    }

    // 控制蛇移动方法
    run(){
        // 获取当前蛇头坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据当前方向更新坐标
        switch(this.direction){
            case 'ArrowUp':
            case 'Up':
            case 'w':
            case 'W':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
            case 's':
            case 'S':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
            case 'a':
            case 'A':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
            case 'd':
            case 'D':
                X += 10;
                break;
            default:
                // 如果不是方向键，不移动
                return;
        }

        // 检查是否吃到食物
        if(this.checkEat(X, Y)){
            console.log("吃到食物了！");
            // 食物位置更新
            this.food.change();
            // 蛇身增加
            this.snake.addBody();
            // 分数增加
            this.scoreBoard.addScore();
        }

        try{
            // 更新蛇头位置
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){
            // 捕获异常，游戏结束
            alert((e as Error).message + ' 游戏结束！');
            this.isLive = false;
            return;
        }

        // 定时调用，实现持续移动
        this.isLive && setTimeout(this.run.bind(this), 200 - (this.scoreBoard.level - 1) * 10);
    }

    // 检查蛇是否吃到食物方法
    checkEat(X: number, Y: number){
        // 判断蛇头坐标与食物坐标的距离
        return Math.abs(X - this.food.X) < 10 && Math.abs(Y - this.food.Y) < 10;
    }
}

