module.exports = (resource) => {
    let date = new Date();
    let time = date.getTime();
    if (resource && resource.length > 0) {
        resource.forEach(item => { //如果试卷的开始时间小于当前时间，这表示开始
            if (item.time[0] < time) {
                item.isStart = true;
            }
            //如果试卷的结束时间小于当前时间，表示为过期
            if (item.time[1] < time) {
                item.isEnd = true;
            }
        })
    }
}