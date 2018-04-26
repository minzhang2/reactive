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
		let event;
		if(attr === null) return;
		if(attr === 'className') attr = 'class'; // className -> class
		
		if(event = /^on(\w+)$/.exec(attr)) { // event
			event = event[1].toLowerCase();
			value = typeof value === 'function' ? value : noop;
			!(event in ReactEvent.events) && (ReactEvent.events[event] = []);
			// unshift: 保证子代事件先触发
			ReactEvent.events[event].unshift({
				ele,
				handleFn: value
			});
		}else if(attr === 'style') { // style
			if(!value) {
				return;
			}else if(typeof value === 'object') {
				let cssText = '';
				for(let prop in value) {
					const item = value[prop];
					prop = utils.hyphenate(prop);
					cssText += `${prop}:${item}${typeof item === 'number' ? 'px' : ''};`;
				}
				value = cssText;
			}
			ele.style.cssText = value;
		}else {
			// dom自带属性可直接添加，否则需要使用setAttribute
			if(attr in ele) {
				ele[attr] = value || '';
			}else if(value) {
				ele.setAttribute(attr, value)
			}
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
		let stopPropagation = false; // 是否使用阻止冒泡的标志位
		for(let event in events) {
			document.addEventListener(event, (ev) => {
				// todo 可以对原生事件进行一些封装
				const target = ev.target || ev.srcElement;
				for(let i = 0; i < events[event].length; i++) {
					const { ele, handleFn } = events[event][i];
					ev.stopPropagation = () => stopPropagation = true;
					if(stopPropagation) { // 如果当前事件阻止冒泡则中断循环
						stopPropagation = false;
						break;
					}
					// 绑定事件的元素节点是否包含触发的节点
					if(ele.contains(target)) {
						handleFn.call(target, ev);
					}
				}
			}, false)
		}
	}
}

const utils = {
	camelize(string) {
		return string.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
	},
	hyphenate(string) {
		return string.replace(/[A-Z]/g, ($0) => `-${$0.toLowerCase()}`)
	}
}

export {
	React,
	ReactDOM
}