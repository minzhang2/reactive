const React = {
  Component() {
    
  },
	/*
    null/false: 创建评论节点
    string/number: 创建文本节点
    object: 
      type === string: 创建dom节点
      type !== string: 创建自定义组件
  */
	instantiateReactComponent(node) {
		let instance;
    if(node === null || node === false) {
       instance = ReactElement.ReactDOMEmptyComponent();
    }else if(typeof node === 'string' || typeof node === 'number') {
       instance = ReactElement.ReactDOMTextComponent(node);
    }else if(typeof node === 'object') {
      if(typeof node.type === 'string') {
         instance = ReactElement.ReactDOMComponent(node);
      }else {
        
      }
    }
		return instance;
	},
  createElement(type, attrs, ...children) {
    return {
      type,
      attrs,
      children
    }
  },
}

const ReactDOM = {
  render(node, container, cb) {
    const element = React.instantiateReactComponent(node);
    container.appendChild(element);
  },
  setAttribute(attr, value) {
    console.log(attr, value)
  }
}

const ReactElement = {
	// 渲染空节点
  ReactDOMEmptyComponent() {
    return document.createComment('')
  },
	// 渲染文本节点
  ReactDOMTextComponent(string) {
    return document.createTextNode(string)
  },
	// 渲染dom节点
  ReactDOMComponent(node) {
    const ele = document.createElement(node.type);
    const attrs = node.attrs;
    const children = node.children;
    attrs && Object.keys(attrs).forEach(attr => ReactDOM.setAttribute(ele, attr, attrs[attr]))
    children && children.forEach(child => ele.appendChild(React.instantiateReactComponent(child)))
    return ele;
  },
	// 渲染自定义节点
  ReactCompositeComponent() {
    
  }
}

export {
	React,
	ReactDOM
}