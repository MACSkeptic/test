import React, { Fragment } from 'react';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      edges: [],
      machine: props.machine
    }
  }

  initializeMachine() {
    const { machine } = this.state;
    const nodes = [];
    const edges = [];

    function addNodesAndEdges(node, key, parent) {
      const id = parent ? parent + '.' + key : key;

      if (parent) {
        nodes.push({
          data: {
            id,
            label: key,
            parent
          }
        });
      }

      if (node.states) {
        const states = Object.keys(node.states)
          .map(key => ({
            ...node.states[key],
            id: key
          }))
          .concat({
            id: '$initial',
            initial: 1,
            on: {'': node.initial}
          });

        states.forEach(state => {
          addNodesAndEdges(state, state.id, id)
        });
      }

      if (node.on) {
        const visited = {};
        Object.keys(node.on).forEach(event => {
          const target = node.on[event];
          if (target && target.length) {
            (visited[target] || (visited[target] = [])).push(event);
          } else {
            target && Object.keys(target).forEach(complexTarget => {
              if (complexTarget && complexTarget.length) {
                (visited[complexTarget] || (visited[complexTarget] = [])).push(event);
              }
            });
          }
        });

        Object.keys(visited).forEach(target => {
          edges.push({
            data: {
              id: key + ':' + target,
              source: id,
              target: parent ? parent + '.' + target : target,
              label: visited[target].join(',\n'),
            }
          });
        });
      }
    }
    addNodesAndEdges(machine, machine.id || 'machine');

    this.cy = window.cytoscape({
      container: this.cyNode,

      boxSelectionEnabled: true,
      autounselectify: true,

      style: `
        node[label != '$initial'] {
          content: data(label);
          text-valign: center;
          text-halign: center;
          shape: roundrectangle;
          width: label;
          height: label;
          padding-left: 5px;
          padding-right: 5px;
          padding-top: 5px;
          padding-bottom: 5px;
          background-color: white;
          border-width: 1px;
          border-color: black;
          font-size: 10px;
          font-family: Helvetica Neue;
        }
        node:active {
          overlay-color: black;
          overlay-padding: 0;
          overlay-opacity: 0.1;
        }
        .foo {
          background-color: blue;
        }
        node[label = '$initial'] {
          visibility: hidden;
        }
        $node > node {
          padding-top: 1px;
          padding-left: 10px;
          padding-bottom: 10px;
          padding-right: 10px;
          text-valign: top;
          text-halign: center;
          border-width: 1px;
          border-color: black;
          background-color: white;
        }
        edge {
          curve-style: bezier;
          width: 1px;
          target-arrow-shape: triangle;
          label: data(label);
          font-size: 5px;
          font-weight: bold;
          text-background-color: #fff;
          text-background-padding: 3px;
          line-color: black;
          target-arrow-color: black;
          z-index: 100;
          text-wrap: wrap;
          text-background-color: white;
          text-background-opacity: 1;
          target-distance-from-node: 2px;
        }
        edge[label = ''] {
          source-arrow-shape: circle;
          source-arrow-color: black;
        }
      `,

      elements: {
        nodes,
        edges
      },

      layout: {
        name: 'cose-bilkent',
        randomize: true,
        idealEdgeLength: 70,
        animate: false
      }
    });
    setTimeout(() => ([this.cy.userZoomingEnabled(false), this.cy.userPanningEnabled(true)]), 1);
  }

  componentDidMount() {
    this.initializeMachine();
  }

  render() {
    return (
      <Fragment>
        <div id="cy" ref={n => this.cyNode = n} />
        <button className="graph-button" onClick={() => this.initializeMachine()}>regenerate</button>
      </Fragment>
    );
  }
}

export default Graph;
