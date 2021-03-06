import { shallow } from 'enzyme';
import React from 'react';
import ErrorBoundry from './ErrorBoundry';

it('expect to render ErrorBoundry component', () => {
    expect(shallow(<ErrorBoundry />)).toMatchSnapshot();
})

it('displays error message on error generated by child', () => {
    const wrapper = shallow(<ErrorBoundry />);
    wrapper.setState({ hasError: false });
    expect(wrapper.state()).toEqual({ hasError: false});
});

it('didCatchg occurs update', () => {
    const wrapper = shallow(<ErrorBoundry />);
    wrapper.instance().componentDidCatch('error', 'info');
    expect(wrapper.state()).toEqual({hasError: true});
})