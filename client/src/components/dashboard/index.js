import { Admin, Resource, ListGuesser } from 'react-admin';

import customDataProvider from './mar-portfolio-api';

const AdminDashboard = () => {
  
  return (
    <Admin dataProvider={customDataProvider}>
      <Resource name="projects" list={ListGuesser} />
    </Admin>
  )
};

export default AdminDashboard;

