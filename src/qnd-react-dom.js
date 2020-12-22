// file: src/qnd-react-dom.js
// file: src/qnd-react-dom.js
import QndReact from './qnd-react';
import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';

// update처리같은건 react-dom에서 한다
QndReact.__updater = (componentInstance) => {
    // logic on how to update the DOM when you call this.setState
    // get the oldVNode stored in __vNode
    const oldVNode = componentInstance.__vNode;
    // find the updated DOM node by calling the render method
    const newVNode = componentInstance.render();

    // update the __vNode property with updated __vNode
    componentInstance.__vNode = reconcile(oldVNode, newVNode);
}

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule, eventlistenersModule]);
// React.render(<App />, document.getElementById('root'));
// el -> <App />
// rootDomElement -> document.getElementById('root')
let rootVNode;

const render = (el, rootDomElement) => {
    // logic to put el into the rootDomElement
    if(rootVNode == null) {
        rootVNode = rootDomElement;
    }
    rootVNode = reconcile(rootDomElement, el); // 이전에다가 비교할 수 있도록
}

// to be exported like ReactDom.render
const QndReactDom = {
    render
};

export default QndReactDom;