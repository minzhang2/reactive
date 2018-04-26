const noop = function() {}

const React = {
  Component() {
    
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
    const element = ReactElement.ReactComponent(node);
		ReactEvent.bind();
    container.appendChild(element);
  },
}

const ReactElement = {
	/*
    null/false: 创建评论节点
    string/number: 创建文本节点
    object: 
      type === string: 创建dom节点
      type !== string: 创建自定义组件
  */
	ReactComponent(node) {
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
    attrs && Object.keys(attrs).forEach(attr => {
			ReactElement.setAttribute(ele, attr, attrs[attr])
		});
    children && children.forEach(child => {
			ele.appendChild(ReactElement.ReactComponent(child))
		});
    return ele;
  },
	// 渲染自定义节点
  ReactCompositeComponent() {
    
  },
	setAttribute(ele, attr, value) {
		if(attr === 'className') { // className -> class 
			attr = 'class'
		}
		
		if(attr === 'className') { // style
			ele.setAttribute(attr, value)
		}else if(attr = /^on(\w+)$/.exec(attr)) { // event
			attr = attr[1].toLowerCase();
			value = typeof value === 'function' ? value : noop;
			!(attr in ReactEvent.events) && (ReactEvent.events[attr] = []);
			ReactEvent.events[attr].push({
				target: ele,
				handleFn: value
			});
//			document.addEventListener(attr, (ev) => {
//				debugger
//			}, false);
		}
  }
}

const ReactEvent = {
	events: {},
	// 避免事件的多次绑定，通过遍历对同一类型事件只绑定一次
	// 通过target判断不同事件，触发时执行对应事件
	// 当前是对target进行缓存，必然会导致内存占用，后期将改为domId进行标识
	bind() {
		const events = this.events;
		for(let event in events) {
			document.addEventListener(event, (ev) => {
				// todo 可以对原生事件进行一些封装
				const target = ev.target || ev.srcElement;
				events[event].forEach(item => {
					// 绑定事件的元素节点是否包含触发的节点
					if(item.target.contains(target)) {
						item.handleFn.call(target, ev);
					}
				})
			}, false)
		}
	}
}

export {
	React,
	ReactDOM
}