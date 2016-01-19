var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../lib/react-ui-tree.js');
var tree = require('./tree');
var TreeObj = require('../lib/tree.js');
var tree2 = require('./tree2');

require('../lib/react-ui-tree.less');
require('./theme.less');
require('./app.less');

var App = React.createClass({
  getInitialState() {
    return {
      active: null,
      tree: tree
    };
  },

  renderNode(node) {
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
            onCallApi={this.handleAJAX}
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
  },

  handleAJAX(nodeId) {
    var tree = new TreeObj(this.state.tree);
    tree.isNodeCollapsed = this.isNodeCollapsed;
    tree.renderNode = this.renderNode;
    tree.changeNodeCollapsed = this.changeNodeCollapsed;
    tree.updateNodesPosition();
    var index = tree.getIndex(nodeId);
    var node = index.node;
    if ( node.collapsed ) {
      node.children = [tree2];
    }
    node.collapsed = !node.collapsed;
    tree.updateNodesPosition();
    this.setState({
      tree: tree.obj
    });
    // console.log('FUCK', nodeId)
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
