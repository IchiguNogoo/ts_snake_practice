import './style/index.less'
import { GameController } from "./modules/GameController";
import { Snake } from "./modules/Snake";
import { Food } from "./modules/Food";
import { ScoreBoard } from "./modules/ScoreBoard";

// 创建各个模块实例
const snake = new Snake();
const food = new Food();
const scoreBoard = new ScoreBoard();

// 将实例传递给 GameController 并初始化游戏
const gameController = new GameController(snake, food, scoreBoard);
gameController.init();