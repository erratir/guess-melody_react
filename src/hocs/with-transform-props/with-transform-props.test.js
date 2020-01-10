import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withTransformProps from './with-transform-props';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const transformFunc = (oldProps) => {
  return {
    fooz: oldProps.foo,
    baz: oldProps.bar,
  };
};
const MockComponentWrapped = withTransformProps(transformFunc)(MockComponent);

it(`Should change old props to the new`, () => {
  const wrapper = shallow(<MockComponentWrapped
    foo={`foo`}
    bar={`bar`}
  />);

  expect(wrapper.props().foo).toEqual(undefined);
  expect(wrapper.props().bar).toEqual(undefined);

  expect(wrapper.props().fooz).toEqual(`foo`);
  expect(wrapper.props().baz).toEqual(`bar`);
});
