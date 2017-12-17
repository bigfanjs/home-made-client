import React, {Component} from 'react';

export default (load) => (
  class AsyncComponent extends Component {
    state = {component: null}

    async componentWillMount() {
      const { default: component } = await load();

      this.setState({ component });
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  }
);