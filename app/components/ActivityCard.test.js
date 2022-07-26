import renderer from 'react-test-renderer';
import ActivityCard from '../components/ActivityCard'

it('renders correctly', () => {
  const tree = renderer
    .create(<ActivityCard image = "https://placeimg.com/140/140/any" kilometer = "2.4" avgPace = "10" time = "600" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});