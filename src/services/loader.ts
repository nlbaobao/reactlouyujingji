/**
 * React动态组件加载器
 */
import * as ReactDOM from "react-dom";

export default new class {
  private unmount(node: Element, removeContainer: boolean = true) {
    ReactDOM.unmountComponentAtNode(node);
    if (node && removeContainer === true) {
      node.parentNode.removeChild(node);
    }
  }

  mount(element: JSX.Element, node?: Element) {
    let target = node;
    if (!target) {
      target = document.createElement("div");
      document.body.appendChild(target);
    }
    ReactDOM.render(element, target);
    return () => {
      this.unmount(target, node === undefined);
    };
  }
}();
