class TodoTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }
  toggleEdit() {
    this.setState({edit: !this.state.edit});
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('change', this.props.onChange, true);
  }
  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('change', this.props.onChange, true);
  }
  componentDidUpdate() {
    // Focus the input.
    if (this.state.edit) {
      const el = this.refs.titleInput;
      CustomElements.upgrade(el);
      el.querySelector('input').focus();
      el.querySelector('input').select();
    }
  }
  render() {
    return (
      <span>
        { this.state.edit ?
          <ons-material-input ref="titleInput" value={this.props.title} label="Title" onBlur={this.toggleEdit.bind(this)}></ons-material-input> :
          <span className={this.props.done ? 'todo-text todo-text--done' : 'todo-text'} onClick={this.toggleEdit.bind(this)}>{this.props.title || 'Untitled'}</span>
        }
      </span>
    );
  }
}

class TodoItem extends React.Component {
  onTitleChange(event) {
    this.props.onTitleChange(event.target.value);
  }
  render() {
    return (
      <ons-list-item modifier="material">
        <label className="checkbox checkbox--material todo-checkbox">
          <input type="checkbox" checked={this.props.done} onChange={this.props.onToggle} className="checkbox__input checkbox--material__input" />
          <div className="checkbox__checkmark checkbox--material__checkmark"></div>
        </label>
        <TodoTitle done={this.props.done} title={this.props.title} onChange={this.onTitleChange.bind(this)} />
      </ons-list-item>
    );
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          title: 'Water the plants',
          done: false,
        },
        {
          title: 'Walk the dog',
          done: true,
        },
        {
          title: 'Go to the dentist',
          done: false,
        },
        {
          title: 'Buy milk',
          done: false,
        },
        {
          title: 'Play tennis',
          done: true,
        }
      ]
    };
  }
  toggleItem(i) {
    const todos = this.state.todos;
    todos[i].done = !todos[i].done;
    this.setState({todos: todos});
  }
  titleChange(i, title) {
    const todos = this.state.todos;
    todos[i].title = title;
    this.setState({todos: todos});
  }
  addTodo() {
    const todos = this.state.todos;
    todos.push({
      title: '',
      done: false
    });

    this.setState({todos: todos});
  }
  clearCompleted() {
    const todos = this.state.todos
      .filter(function(todo) {
        return !todo.done;
      });

    this.setState({todos: todos});
  }
  render() {
    return (
      <ons-page modifier="material">
        <ons-toolbar modifier="material">
          <div className="center">Todos</div>
        </ons-toolbar>
        <ons-list modifier="material">
          <ons-list-header modifier="material">Things to do</ons-list-header>
          {this.state.todos.map(function(todo, i) {
              return <TodoItem
                key={i}
                onToggle={this.toggleItem.bind(this, i)}
                onTitleChange={this.titleChange.bind(this, i)}
                done={todo.done}
                title={todo.title}>
              </TodoItem>
          }.bind(this))}
          <ons-list-item style={{textAlign: 'center'}} modifier="material">
            <ons-button onClick={this.clearCompleted.bind(this)} modifier="material--flat">
              <ons-ripple color="rgba(0, 150, 136, 0.1)"></ons-ripple>
              Clear completed
            </ons-button>
          </ons-list-item>
        </ons-list>
        <ons-fab onClick={this.addTodo.bind(this)} position="bottom right">
          <ons-ripple></ons-ripple>
          <ons-icon icon="md-plus"></ons-icon>
        </ons-fab>
      </ons-page>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
