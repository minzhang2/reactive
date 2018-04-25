const React = {
  Component() {
    
  },
  createElement(type, attrs, ...children) {
    return {
      type,
      attrs,
      children
    }
  }
}

const ReactDOM = {
  /*
    null/false: 创建评论节点
    string/number: 创建文本节点
    object: 
      type === string: 创建dom节点
      type !== string: 创建自定义组件
  */
  render(node, container, cb) {
    let element;
    if(node === null || node === false) {
       element = ReactElement.ReactDOMEmptyComponent();
    }else if(typeof node === 'string' || typeof node === 'number') {
       element = ReactElement.ReactDOMTextComponent(node);
    }else if(typeof node === 'object') {
      if(typeof node.type === 'string') {
         element = ReactElement.ReactDOMComponent(node);
      }else {
        
      }
    }
    container.appendChild(element);
  },
  setAttribute(attr, value) {
    console.log(attr, value)
  }
}

const ReactElement = {
  ReactDOMEmptyComponent() {
    return document.createComment('')
  },
  ReactDOMTextComponent(string) {
    return document.createTextNode(string)
  },
  ReactDOMComponent(node) {
    if(typeof node !== 'object') {
       return node;
    }
    const ele = document.createElement(node.type);
    const attrs = node.attrs;
    const children = node.children;
    attrs && Object.keys(attrs).forEach(attr => ReactDOM.setAttribute(attr, attrs[attr]))
//    children && children.forEach(child => ele.appendChild(ReactElement.ReactDOMComponent(child)))
    return ele;
  },
  ReactCompositeComponent() {
    
  }
}

const content = (
  <div>
    <div>eeee</div>
    <div id="ss">fsgsg</div>
    <div></div>
  </div>
)

const string = 'ssss'

//console.log(string)
console.log(content)

const container = document.getElementById('root')

ReactDOM.render(content, container)