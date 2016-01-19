var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../lib/react-ui-tree.js');
var tree = require('./tree');
var tree2 = require('./tree2');

require('../lib/react-ui-tree.less');
require('./theme.less');
require('./app.less');

var App = React.createClass({
  getInitialState() {
    return {
      active: null,
      tree: tree,
      tree2: tree2
    };
  },

  renderNode(node) {
    // return (
    //   <Tree
    //     paddingLeft={20}
    //     tree={this.state.tree2}
    //     onChange={this.handleChange}
    //     isNodeCollapsed={this.isNodeCollapsed}
    //     renderNode={this.renderNode2}
    //   />
    // );
    console.log(node.module)
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.module}
        <Tree
          paddingLeft={20}
          tree={this.state.tree2}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode2}
        />
       </span>
    );
  },

  renderNode2(node) {
    // return (
    //   <Tree
    //     paddingLeft={20}
    //     tree={this.state.tree2}
    //     onChange={this.handleChange}
    //     isNodeCollapsed={this.isNodeCollapsed}
    //     renderNode={this.renderNode2}
    //   />
    // );
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.module}
      </span>
    );
  },

  onClickNode(node) {
    this.setState({
      active: node
    });
  },

  render() {
    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector">
          <button onClick={this.updateTree}>update tree</button>
          <pre>
          {JSON.stringify(this.state.tree, null, '  ')}
          </pre>
         </div>
      </div>
    );
  },

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  },

  updateTree() {
    var tree = this.state.tree;
    tree.children.push({module: 'test'});
    this.setState({
      tree: tree
    });
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
