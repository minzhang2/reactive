import { React, ReactDOM } from './reactive';

function handleChild(ev) {
	console.log('handleChild')
}

function handleParent(ev) {
	console.log('handleParent')
}

const content = (
  <div onClick={handleParent}>
    <div onClick={handleChild}>eeee</div>
    <div id="ss">fsgsg</div>
    <div>ffffffff</div>
    sss
  </div>
)

ReactDOM.render(content, document.getElementById('root'));