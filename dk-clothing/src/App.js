import Home from './routes/home/home.component'
import { Routes,Route } from 'react-router-dom';
import Navigation  from './routes/navigation/navigation.components';
import SignIn from './routes/sign-in/sign-in.components';

const Shop = () => {
  return ( <h1> I am the shop Route</h1>)
}
const App = () => {
return(
 <Routes>
  <Route path='/' element={<Navigation />}>
    <Route index element={<Home />} />
    <Route path = 'shop' element={<Shop />} />
    <Route path='SignIn' element={<SignIn />}/>
  </Route>
 </Routes>
  );
}
export default App;
