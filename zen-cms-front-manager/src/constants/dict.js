export function match(dictArr, value) {
    for (let i = 0; i < dictArr.length; i++) {
        if (dictArr[i].value == value) return dictArr[i].label;
    }
    return 'not defined';
}

export const RESOURCE_TYPE = [{
    value: 'content',
    label: '内容'
}, {
    value: 'htmlPlugin',
    label: 'HTML插件'
}, {
    value: 'pic',
    label: '图片'
}, {
    value: 'file',
    label: '文件'
}];