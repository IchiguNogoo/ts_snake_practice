// ScoreBoard.ts

// 计分板类
export class ScoreBoard {

    private readonly SCORE_STEP = 10; // 每次增加的分数
    private readonly LEVEL_UP_SCORE = 100; // 升级所需分数
    private readonly MAX_LEVEL = 10; // 最大等级

    public score: number;
    public level: number;
    private scoreElement: HTMLElement;
    private levelElement: HTMLElement;

    constructor(){
        this.score = 0; // 初始分数
        this.level = 1; // 初始等级

        // 获取分数元素引用
        this.scoreElement = document.getElementById('score')!;
        // 获取等级元素引用
        this.levelElement = document.getElementById('level')!;
    }

    // 增加分数方法
    addScore(){
        this.score += this.SCORE_STEP; // 每次增加10分
        this.scoreElement.textContent = String(this.score); // 更新分数显示
        // 检查是否升级
        this.checkLevelUp();
    }

    // 升级方法
    levelUp(){
        this.checkLevelUp();
    }

    // 检查升级条件方法
    private checkLevelUp() {
        // 计算当前应达到的等级
        const expectedLevel = Math.floor(this.score / this.LEVEL_UP_SCORE) + 1;
        // 如果当前等级小于应达到的等级，则升级
        if (this.level < expectedLevel) {
            this.level = Math.min(expectedLevel, this.MAX_LEVEL); // 确保不超过最大等级
            this.levelElement.textContent = String(this.level); // 更新等级显示
        }
    }
}
