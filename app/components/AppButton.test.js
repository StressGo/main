import renderer from 'react-test-renderer';
import AppButton from '../components/AppButton'

it('renders correctly', () => {
  const tree = renderer
    .create(<AppButton title = "yo" onPress = {() => {}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});