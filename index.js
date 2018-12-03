import { React, ReactDOM } from './reactive';

function handleChild1(ev) {
	ev.stopPropagation();
	console.log('handleChild1')
}

function handleChild2(ev) {
	console.log('handleChild2')
}

function handleParent(ev) {
	console.log('handleParent')
}

function HelloWorld(prop) {
	return (
		<div>{prop},HelloWorld</div>
	)
}

const content = (
  <div id="parent" onClick={handleParent} data-v="sss">
    <div id="child1" onClick={handleChild1} style={{
				background: '#000', 
				color: '#fff',
				fontSize: 40
			}}
		>eeee</div>
    <div id="child2"onClick={handleChild2}>fsgsg</div>
    <div>ffffffff</div>
    sss
  </div>
)

//console.log(HelloWorld)

ReactDOM.render(content, document.getElementById('root'));
//ReactDOM.render(HelloWorld, document.getElementById('root'));