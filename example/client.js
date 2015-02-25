/*
var { client } = require('../index');
let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  var kollab = client(socket);

  kollab.update({
    detta: 'ar',
    bara: {
      ett: 'test'
    }
  });

  kollab.merge({ mer: 'ge' });
});
*/

let React = require('react');

let data = {
  title: 'Topp 10 programmeringsspråk',
  data: {
    item0: { text: 'Javascript', position: 1 },
    item1: { text: 'Ecmascript', position: 2 },
    item2: { text: 'JScript', position: 3 },
    item3: { text: 'Haskell', position: 4 },
    item4: { text: 'Ruby', position: 5 },
    item5: { text: 'CoffeeScript', position: 6 },
    item6: { text: 'Erlang', position: 7 },
    item7: { text: 'Python', position: 8 },
    item8: { text: 'Java', position: 9 },
    item9: { text: 'C#', position: 10 }
  }
}

let Title = React.createClass({
  getInitialState() {
    return { edit: false };
  },

  handleClick(e) {
    e.preventDefault();
    this.setState({ edit: true });
  },

  handleSubmit(e) {
    e.preventDefault();
    // vvvvv
    data.title = this.refs.title.getDOMNode().value;
    // AAAAA
    this.setState({ edit: false });
  },

  render() {
    var content;
    if (this.state.edit) {
      content = (
          <form action="#" onSubmit={this.handleSubmit}>
            <input type="text" defaultValue={data.title} ref="title" />
          </form>
          );
    } else {
      content = (
          <a href="#" onClick={this.handleClick}>
            {data.title}
          </a>
          );
    }

    return (
        <h1>{content}</h1>
        );
  }
});

let Item = React.createClass({
  getInitialState() {
    return { edit: false };
  },

  handleClick(e) {
    e.preventDefault();
    this.setState({ edit: true });
  },

  handleSubmit(e) {
    e.preventDefault();
    // vvvvv
    data.data[this.props.item].text = this.refs.text.getDOMNode().value;
    // AAAAA
    this.setState({ edit: false });
  },

  render() {
    let item = data.data[this.props.item];

    let style = {
      padding: '10px',
      margin: '5px auto',
      width: '200px',
      backgroundColor: 'rgb(219, 219, 219)'
    };

    let linkStyle = {
      color: 'black',
      textDecoration: 'none'
    };

    let content;
    if (this.state.edit) {
      content = (
          <form action="#" onSubmit={this.handleSubmit}>
            <input type="text" defaultValue={item.text} ref="text" />
          </form>
          );
    } else {
      content = (
          <a href="#" style={linkStyle} onClick={this.handleClick}>{item.text}</a>
          );
    }

    return (<div style={style}>{content}</div>);
  }
});

let List = React.createClass({
  render() {
    return (
        <div>
          {Object.keys(data.data).map(x => <Item
                                             key={x}
                                             item={x} />)}
        </div>
        );
  }
});

let App = React.createClass({
  render() {
    return (
        <div>
          <Title />
          <List />
        </div>
        );
  }
});

React.render(
    <App />,
    document.getElementById('list')
    );
