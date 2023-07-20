(function () {
    var picker_column=document.querySelector(".picker_column")
    var picker_selector=document.querySelector(".picker_selector")
    var picker_items=document.getElementsByClassName("picker_item")
    var confirm=document.querySelector(".confirm")
    // console.log(picker_column[0]);   使用querySelector可读取年月日的集合，通过循环加判断可以单独拿出某个

    var pointerDown=false                //鼠标/手指是否按下
    var itemHeight=17.6                  //每个picker_item高1.1rem=1.1*16=17.6px
    var highPoint=2*itemHeight           //picker_column从初始状态到达最高点的y轴移动量（此时0被选中）
    var lowPoint=-7*itemHeight           //picker_column从初始状态到达最低点的y轴移动量（此时9被选中）
    var lastPoint=0                      //鼠标/手指按下且移动，刚才的y轴位置
    var currentPoint=0                   //鼠标/手指保持按下且移动，此时的y轴位置
    var distance=0                       //鼠标/手指的移动距离=currentPoint-lastPoint
    var friction=0.8                     //摩擦系数。鼠标拖动距离*friction=picker滚动距离
    var selected=picker_items[2]         //被选中的picker_item（默认是数字2）

    //picker_column事件：鼠标/手指按下
    picker_column.addEventListener("pointerdown",function(event){
        // picker_column.classList.add('aaa');
        // console.log(this.classList[0]);
        // console.log(event.target.parentElement);
        pointerDown=true
        lastPoint=event.clientY
        picker_column.style.transition="initial"
    })
    //picker_column事件：鼠标/手指移动
    picker_column.addEventListener("pointermove",function(event){
        if(pointerDown){
            //计算picker_cloumn在y轴上移动的距离distance
            currentPoint=event.clientY
            distance+=(currentPoint-lastPoint)*friction
            //picker_column上下移动的距离被限制在highPoint与lowPoint之间
            if(distance<=highPoint&&distance>=lowPoint){
                picker_column.style.transform=`translate(0px,${distance}px)`
                lastPoint=currentPoint
            }else if(distance>highPoint){
                distance=highPoint
            }else if(distance<lowPoint){
                distance=lowPoint
            }
        }            
    })
    //picker_column事件：鼠标/手指离开
    picker_column.addEventListener("pointerup",function(event){
        pointerDown=false
        //picker_selector自动对齐并选中picker_item
        //1、判断移动距离distance与itemHeight的关系
        var remainder=distance%itemHeight
        //2、distance为itemHeight的整数倍，这样就可以对齐picker_selector
        if(distance<0&&Math.abs(remainder)<0.5*itemHeight){
            distance-=remainder
        }else if(distance<0&&Math.abs(remainder)>=0.5*itemHeight){
            distance=distance-remainder-itemHeight
        }else if(distance>=0&&Math.abs(remainder)<0.5*itemHeight){
            distance-=remainder
        }else if(distance>=0&&Math.abs(remainder)>=0.5*itemHeight){
            distance=distance-remainder+itemHeight
        }
        picker_column.style.transition="transform 1s"
        picker_column.style.transform=`translate(0px,${distance}px)`
        //3、选中对应的picker_item(标签多一个selected属性)
        var index=2-distance/itemHeight
        selected.removeAttribute("selected")
        selected=picker_items[index]
        selected.setAttribute("selected","")
        //判断
        //if()  加类名年月日， 根据判断返回赋值
    })
    //提交
    confirm.addEventListener("click",function (e) {  

    })
})()