import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { StateType } from 'src/reducer/dataType';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const currentUser: any = useSelector((state: StateType) => state.auth.user);

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        {currentUser.firstName + " " + currentUser.lastName}'s Profile
      </Typography>
      <Typography variant="subtitle2">
        {currentUser.firstName + " " + currentUser.lastName}, this could be your profile settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;
