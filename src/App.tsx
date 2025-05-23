import React from 'react';
import './App.scss';
import { Clock } from './Clock/Clock';

type State = {
  today: Date;
  clockName: string;
  hasClock: boolean;
  timerId1: number;
  timerId2: number;
};

export class App extends React.Component {
  state: Readonly<State> = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
    timerId1: 0,
    timerId2: 0,
  };

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

  // This code starts a timer
  componentDidMount(): void {
    this.setState({
      timerId1: window.setInterval(() => {
        this.setState({ clockName: this.getRandomName() });
      }, 3300),
    });

    this.setState({
      timerId2: window.setInterval(() => {
        this.setState({ today: new Date() });
      }, 1000),
    });

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault(); // not to show the context

      if (event) {
        this.setState({ hasClock: false });
      }
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (event) {
        this.setState({ hasClock: true });
      }
    });
  }

  componentDidUpdate(): void {
    if (this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));
    }

    if (this.getRandomName() !== this.state.clockName && this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.log(
        `Renamed from ${this.state.clockName} to ${this.getRandomName()}`,
      );
    }
  }

  // this code stops the timer
  componentWillUnmount(): void {
    window.clearInterval(this.state.timerId1);
    window.clearInterval(this.state.timerId2);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock && (
          <div className="Clock">
            <Clock name={this.state.clockName} />

            {' time is '}

            <span className="Clock__time">
              {this.state.today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
