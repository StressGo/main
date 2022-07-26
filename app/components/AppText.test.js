import renderer from 'react-test-renderer';
import AppText from '../components/AppText'

it('renders correctly', () => {
  const tree = renderer
    .create(<AppText children = "yo" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});