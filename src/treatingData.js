
class treatingData {
  constructor (res, arr) {
    this.res = res
    this.arr = arr
  }
  
  // 将arr为null 设置为 [],其他为''
  transform() {
    let commonObj = {}
    for (let [k, v] of Object.entries(this.res)) {
      if(v){
        commonObj[k] = v
      } else {
        if (this.arr.includes(k)) {
          commonObj[k] = []
        } else {
          commonObj[k] = ''
        }
      }
    }
  
    return commonObj
  }
}

class list extends treatingData {
  constructor (res, arr) {
    super(res, arr)
    this.listTemp = res
    
    // console.log(res, arr)
  }

  listTransForm () {
    let tempList = []
    let temp = {}
  // console.log(this.lista)
    this.listTemp.forEach(ele => {    
      super.res = ele
      temp = super.transform()
      tempList.push(temp)
    });
    

    return tempList
  }
}

class tree extends treatingData {
  constructor(res, arr, obj) {
    super(res, arr)
    this.tempRes = res
    this.tempArr = arr 
    this.options = obj
  }

  treeTransForm () {
    let firstChild = {} // 一级子级
    let result = [] // 处理完成数据的总结果集
    let result1 = [] // 子节点处理完成数据的结果集
    let temp = {} // 处理数据临时遍历
    let i = this.tempRes.length // 第一层数组长度

    while(i--){
      // 获取一级子级
      firstChild = this.tempRes[i]
      super.res = firstChild
      super.arr = this.tempArr
      temp = super.transform()
      // 将处理好的数据放到结果集里
      result.push(temp)

      // 将处理好的孙子集放到另外的变量里
      result1 = this.recursion(firstChild[this.options.childern])
      
      // 合并处理好的子级和孙子集
      result[i][this.options.childern] = result1

    }

    return result

  }

  recursion(child) {
   
    let i = child.length // 子节点数组长度
    let childItem = {} // 子节点项
    let temp = {} // 处理数据临时遍历
    while(i--){
      // 获取子级一项
      childItem = child[i]
      super.res = childItem
      super.arr = this.tempArr
      temp = super.transform()
    
      child[i] = temp
     
      if(childItem[this.options.childern] && childItem[this.options.childern].length){
        this.recursion(childItem[this.options.childern])
      
      }
    }
    return child
    
  }
}