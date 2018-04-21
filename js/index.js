// 获取元素离 document 顶部的距离
var getElementTop = function(elem) {
    //获得elem元素距相对定位的父元素的top
    var elemTop = elem.offsetTop
    //将elem换成起相对定位的父元素
    elem = elem.offsetParent
    //只要还有相对定位的父元素
    while (elem != null) {
        // 获得父元素 距他父元素的top值,累加到结果中
        elemTop += elem.offsetTop
        //再次将elem换成他相对定位的父元素上;
        elem = elem.offsetParent
    }
    return elemTop
}

// 添加隐藏的表头，滚动到页面顶部时显示（接收一个表格参数）
var tableScroll = function(table) {
    // 表头离页面顶部的距离
    var pos = getElementTop(table)
    var head = table.querySelector('tr')
    var headThHtml = head.innerHTML
    // 创建一个一模一样的新表头
    var hide_head = document.createElement('tr')
    hide_head.classList.add('_table-head-hide')
    hide_head.innerHTML = headThHtml
    // 添加表头到表格
    table.appendChild(hide_head)
    // 隐藏创建的新表头
    hide_head.style.display = 'none'
    // 把原表头的 class 添加到隐藏的新表头
    hide_head.classList.add(head.classList)
    // 设定新表头的位置
    hide_head.style.position = 'fixed'
    hide_head.style.top = '0'
    // 页面滚动事件
    document.addEventListener('scroll', function(e) {
        var dataShow = hide_head.dataset.show
        dataShow = dataShow || 'false'
        var html = document.querySelector('html')
        if (scrollY >= pos) {
            // 如果原表头滚动超过页面顶部，显示固定在顶部的的表头，并设置其外观和原表头一样
            hide_head.style.display = ''
            hide_head.style.width = head.offsetWidth + 'px'
            hide_head.dataset.show = true
            // 实时获取表头对应列的宽度给新表头
            var hide_th_all = hide_head.querySelectorAll('th')
            for (var i = 0; i < hide_th_all.length; i++) {
                hide_th_all[i].style.width = head.querySelectorAll('th')[i].offsetWidth + 'px'
            }
        } else {
            // 表头没超过顶部
            if (dataShow == 'true') {
                // 如果固定表头是显示状态
                hide_head.style.display = 'none'
                hide_head.dataset.show = 'false'
            }
        }
    })
}
