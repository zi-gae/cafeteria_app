import Home from "../screens/Home";
import Likes from "../screens/Likes";
import { BG_COLOR_WHITE } from "../constants/Color";

const sharedRoutes = {
  Likes: {
    screen: Likes
  }
};

const sharedOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: BG_COLOR_WHITE
    }
  }
};

export { sharedOptions };

export default sharedRoutes;
