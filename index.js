import { React, ReactDOM } from './reactive';

function handleClick(ev) {
	console.log(arguments)
	debugger
}

const content = (
  <div>
    <div onClick={handleClick}>eeee</div>
    <div id="ss">fsgsg</div>
    <div onClick={handleClick}>ffffffff</div>
    sss
  </div>
)

ReactDOM.render(content, document.getElementById('root'));