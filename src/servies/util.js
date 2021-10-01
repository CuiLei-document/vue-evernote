import dayjs from 'dayjs';
export function beautify(dataTime){
    let day = dayjs(dataTime)
    let now = dayjs()
    if(day.isSame(now , 'day')){
        return '今天'
    }else if(day.isSame(now.subtract('1','day'),'day')){
        return '昨天'
    }else if(day.isSame(now.subtract('2','day'),'day')){
        return '前天'
    }else{
        day.format('MM月DD日')
    }
}