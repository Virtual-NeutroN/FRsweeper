
function option(){
document.getElementById("yes").onclick()
//if(document.getElementById("width").){

//}
console.log(document.getElementById("yes"))
}
































//第一阶段完成，芜湖
document.oncontextmenu = function () { //菜单不显示，不然右键按倒菜单夺笋那
    return false;
}
var time = 0//全局变量（只是为了方便调用移到上方）
window.onload = function () {  //判断点击的次数以及点击的坐标
    var arr = document.getElementsByTagName('img');//获取所有关于img标签的元素
    for (let i = 0; i < arr.length; i++) {//因为只有9*9=81，所以要小于81（不定）
        arr[i].onmousedown = function a() {//指定按下的元素的img tag

           // document.getElementById('nocursor').style.cursor = 'none';//sb难度

            //变量定义
            var fullID = this.id;//你点击方块的完整id
            var disLength = fullID.length;//你点击方块的字符长度
            var xAxis = fullID.substring(0, 1);//设置点击中心横坐标
            var yAxis = fullID.substring(2, 3);//设置点击中心纵坐标
            var openNum = fullID.substring(disLength - 1, disLength);//设置点击中心纵坐标
            if (event.button == 2 && time > 0) {//按下的是右键
                console.log("a")
                if (this.className == openNum + " right" || this.className == "Bomb right") {
                    this.src = "img/unknow-1.png"
                    this.classList.remove("right")
                } else if (this.className == "open" || this.className == openNum + " open") { }
                else {
                    this.src = "img/right.png"
                    this.classList.add("right")
                }


            } else {//按下的是左键
                time = time + 1;
                //第一次打开的3*3范围不会被判雷，先记作firstTry的class
                if (time <= 1) {//第一次打开，初始化
                    for (let i = -1; i < 2; i++) {//for嵌套,i指向y轴
                        for (let j = -1; j < 2; j++) {//j指向x轴
                            var varXAxis = parseInt(xAxis) + parseInt(i)//不知道是不是bug，无法直接加，因为是文本型？
                            var varYAxis = parseInt(yAxis) + parseInt(j)
                            if (varXAxis <= 9 && varXAxis >= 1 && varYAxis <= 9 && varYAxis >= 1) {//判断是否大于范围内
                                document.getElementById(varXAxis + "-" + varYAxis + " " + openNum).src = "img/num-0.png";
                                document.getElementById(varXAxis + "-" + varYAxis + " " + openNum).classList.add("firstTry");//设置fristTry的class
                            }
                        }
                    }
                    //随机置雷
                    for (let i = 0; i < 10; i++) {
                        //一次循环给一个随机方块安雷（排除已有的雷、含有“firstTry”class的）
                        var varBombXAxis = Math.floor(Math.random() * 9 + 1);//取雷的x轴随机数，1<=x<=9
                        var varBombYAxis = Math.floor(Math.random() * 9 + 1);//取雷的y轴随机数，1<=y<=9
                        while (document.getElementById(varBombXAxis + "-" + varBombYAxis + " 0").className == "firstTry" || document.getElementById(varBombXAxis + "-" + varBombYAxis + " 0").className == "Bomb") {
                            //判断是否符合安雷标准,暂时的openNum为0，所以可以直接写（有没有相同ID的雷存在/含有firstTry的class）
                            varBombXAxis = Math.floor(Math.random() * 9 + 1);//重新取雷的x轴随机数
                            varBombYAxis = Math.floor(Math.random() * 9 + 1);//重新取雷的y轴随机数
                        }//如果没有，正常安雷
                        document.getElementById(varBombXAxis + "-" + varBombYAxis + " 0").classList.add("Bomb");//设置Bomb的class
                    }
                    //判断出每一个方块周围的个数
                    for (let i = 1; i < 10; i++) {
                        for (let j = 1; j < 10; j++) {
                            var sumAreaBomb = 0;
                            var varCheckNumXAxis = parseInt(i);
                            var varCheckNumYAxis = parseInt(j);
                            if (document.getElementById(varCheckNumXAxis + "-" + varCheckNumYAxis + " 0").className !== "Bomb" && document.getElementById(varCheckNumXAxis + "-" + varCheckNumYAxis + " 0") !== document.getElementById(xAxis + "-" + yAxis + " 0")) {
                                //每一个方块在周围8个的搜索是否有雷
                                for (let k = -1; k < 2; k++) {
                                    for (let l = -1; l < 2; l++) {
                                        var varCheckNumAreaXAxis = parseInt(varCheckNumXAxis) + parseInt(l);//k指向y轴
                                        var varCheckNumAreaYAxis = parseInt(varCheckNumYAxis) + parseInt(k);//l指向x轴
                                        if (varCheckNumAreaXAxis <= 9 && varCheckNumAreaXAxis >= 1 && varCheckNumAreaYAxis <= 9 & varCheckNumAreaYAxis >= 1 && document.getElementById(varCheckNumAreaXAxis + "-" + varCheckNumAreaYAxis + " 0").className == "Bomb") {
                                            sumAreaBomb = sumAreaBomb + 1;
                                        }
                                    }
                                }
                                document.getElementById(varCheckNumXAxis + "-" + varCheckNumYAxis + " 0").classList.add(sumAreaBomb);
                                //document.getElementById(varCheckNumXAxis + "-" + varCheckNumYAxis + " 0").src = "img/num-" + sumAreaBomb + ".png";//后期要删除加注释
                            }
                        }
                    }
                    for (let i = -1; i < 2; i++) {//移除firstTry
                        for (let j = -1; j < 2; j++) {
                            var varXAxis = parseInt(xAxis) + parseInt(i)
                            var varYAxis = parseInt(yAxis) + parseInt(j)
                            if (varXAxis <= 9 && varXAxis >= 1 && varYAxis <= 9 && varYAxis >= 1) {//判断是否大于范围内
                                document.getElementById(varXAxis + "-" + varYAxis + " 0").classList.remove("firstTry");
                                this.classList.add("0")
                                var cleanFirstTryClassNum = document.getElementById(varXAxis + "-" + varYAxis + " 0").className
                                document.getElementById(varXAxis + "-" + varYAxis + " 0").id = varXAxis + "-" + varYAxis + " " + cleanFirstTryClassNum
                                document.getElementById(varXAxis + "-" + varYAxis + " " + cleanFirstTryClassNum).src = "img/num-" + cleanFirstTryClassNum + ".png"
                                document.getElementById(varXAxis + "-" + varYAxis + " " + cleanFirstTryClassNum).classList.add("open");
                            }
                        }
                    }
                    for (let i = 0; i < 10; i++) {//给每个都加上雷数的id，不再是0
                        var className = document.getElementsByClassName(i)
                        for (let j = 0; j < className.length; j++) {
                            var classAxis = className[j].id.substring(0, 3)
                            className[j].id = classAxis + " " + i
                        }
                    }
                    //计时装置
                    var gameTime = 0;//初始化游戏时间
                    setInterval(function () { gameTimer() }, 1000);//计时函数
                    function gameTimer() {
                        gameTime = gameTime + 1
                        document.getElementById("gameTime").innerHTML = "用时：" + gameTime + " 秒";//输出到HTML上
                    }
                }
                else {//后面普通打开
                    if (this.className == "Bomb") {//死亡
                        for (let i = 0; i < 10; i++) {
                            var BombClassNum = document.getElementsByClassName("Bomb")
                            BombClassNum[i].src = "img/false.png"
                        }
                        var rightButFalseClass = document.getElementsByClassName("right")
                        for (let i = 0; i < rightButFalseClass.length; i++) {
                            if (rightButFalseClass[i].className != "Bomb right") {
                                rightButFalseClass[i].src = "img/rightButFalse.png"
                            }
                        }
                        setTimeout(dieFunc, 100);
                        function dieFunc() {
                            alert("抱歉！您输了！用时: " + document.getElementById("gameTime").innerHTML.substring(3) + "，点击确认开启新的一局")//利用alert特性，将计时器暂停，随后选取时间（id为gameTime3位后的内容）
                            location.reload()//刷新，其实是重置
                        }
                    } else {
                        if (this.className == openNum + " right" || this.className == "Bomb right") {//限制
                        } else {//继续
                            var openNumClass = this.className
                            this.src = "img/num-" + openNum + ".png"//打开的不同雷数判断
                            this.classList.remove(openNum)
                            this.classList.add("open")
                            var CheckWinClass = document.getElementsByClassName("open")//赢的条件判断

                            if (openNum == 0 && openNumClass!="open" && openNumClass!="0 open") {
                                console.log(openNumClass)
                            }


                            if (CheckWinClass.length >= 70 && CheckWinClass.length - 81 == -10) {
                                setTimeout(dieFunc, 100);
                                function dieFunc() {
                                    alert("恭喜！您赢了！所用时间: " + document.getElementById("gameTime").innerHTML.substring(3) + "，点击确认开启新的一局，")
                                    location.reload()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}