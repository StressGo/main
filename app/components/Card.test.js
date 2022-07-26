import renderer from 'react-test-renderer';
import Card from '../components/Card'

it('renders correctly', () => {
  const tree = renderer
    .create(<Card title = "yo" subtitle ="haha" image = "https://placeimg.com/140/140/any" onPress = {() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});