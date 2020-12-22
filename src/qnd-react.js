import { h } from 'snabbdom';
// file: src/qnd-react.js
const createElement = (type, props = {}, ...children) => {
    console.log(typeof (type), type);
    if (type.prototype && type.prototype.isQndReactClassComponent) {
        const componentInstance = new type(props);
    
        // remember the current vNode instance
        componentInstance.__vNode = componentInstance.render();

        componentInstance.__vNode.data.hook = {
            create: () => {
                // 내가 준 인스턴스의 componentDidMount 메소드를 실행하는것
                componentInstance.componentDidMount()
            }
        }

        console.log(componentInstance.__vNode.data.hook)
        return componentInstance.__vNode;
    }

    if (typeof (type) == 'function') {
        return type(props); // type이 함수니까 넘겨준다
    }

    props = props || {};
    let dataProps = {};
    let eventProps = {};

    // This is to seperate out the text attributes and event listener attributes
    for(let propKey in props) {
        // event props always startwith on eg. onClick, onDblClick etc.
        if (propKey.startsWith('on')) {
        // onClick -> click
        const event = propKey.substring(2).toLowerCase();

        eventProps[event] = props[propKey];
        }
        else {
        dataProps[propKey] = props[propKey];
        }
    }

    console.log(dataProps, eventProps)
    return h(type, { props: dataProps, on: eventProps }, children);
};

// component base class
class Component {
    constructor() { }
  
    componentDidMount() { }
  
    setState(partialState) { 
        this.state = {
            ...this.state,
            ...partialState
        }
        // call the __updater function that QndReactDom gave
        QndReact.__updater(this);
    }
  
    render() { }
}
Component.prototype.isQndReactClassComponent = true;

// to be exported like React.createElement
const QndReact = {
createElement,
Component
};

export default QndReact;