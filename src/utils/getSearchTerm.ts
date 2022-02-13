export const getSearchTerm = (searchText: string, term: string): string => {
    // 第1步：按照&来拆分为 array
    const arr = searchText.split('&')

    // 第2步：获取 term 所在的 element
    const el = arr.find((el) => el.includes(term))

    if (el === undefined) {
        throw Error('找不到 term')
    }
    // 第3步：获取 = 后面的字符串
    return el.split('=')[1]
}
