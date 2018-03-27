// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Bind } from 'lodash-decorators/bind';
import AppActions from '_state/app/AppActions';
import type { AppTitleType } from '_state/app/app.types';
import type { GlobalState } from '_state/state.types';

type TitleBarProps = {
  title: ?AppTitleType,
  setTitle: (?AppTitleType) => void
};

@connect(
  (globalState: GlobalState): $Shape<TitleBarProps> => ({
    title: globalState.app.title
  }),
  {
    setTitle: AppActions.setTitle
  }
)
export default class TitleBar extends React.Component<TitleBarProps> {
  static defaultProps: TitleBarProps = {
    title: null,
    setTitle: () => {}
  };

  @Bind()
  onNavSelect(eventKey: number): void {
    switch (eventKey) {
      case 1:
        {
          this.props.setTitle('Oh man, great job');
        }
        break;

      case 2:
        {
          this.props.setTitle('Really, amazing mouse clicking you got there');
        }
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Navbar fluid staticTop onSelect={this.onNavSelect}>
        <Navbar.Header>
          <Navbar.Brand>{this.props.title}</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}>Click Me!</NavItem>
            <NavItem eventKey={2}>No, Click Me!</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
