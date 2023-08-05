import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  IconButton,
  CardMedia,
  Avatar,
  Select,
  MenuItem,
  Modal
} from '@mui/material';

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { styled } from '@mui/material/styles';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { StateType, UserType } from 'src/reducer/dataType';
import { useState, useRef, lazy, Suspense } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const TableForm = Loader(
  lazy(() => import('src/content/applications/Users/settings/TableForm'))
);

const Input = styled('input')({
  display: 'none'
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

function MapClickHandler() {
  const map = useMapEvents({
    click: (e) => {
      // Handle the mouse click event here
      console.log('Mouse clicked at:', e.latlng);
    },
  });

  return null;
}

function FarmAreaTab() {
  const navigate: any = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 9
  const mapRef = useRef()

  const onSaveClick = e => {
    e.preventDefault();
  }

  const onCancelClick = e => {
    e.preventDefault();
    navigate('/profile/details')
  }

  const user = {
    coverImg: '/static/images/background/map.png',
    avatar: '/static/images/avatars/main.jpg',
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Active Area Information
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated active area information
              </Typography>
            </Box>
            {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button> */}
          </Box>
          <Divider />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                OpenStreetMap
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You can select your active area. And then you can click Add button.
              </Typography>
              <MapContainer center={center} style={{ height: '600px', width: '100%' }} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {/* <Marker position={[51.505, -0.09]} /> */}
              </MapContainer>
            </Box>
          </Modal>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={9}>
                <CardCover>
                  <CardMedia image={user.coverImg} />
                  <CardCoverAction>
                    {/* <Input id="change-cover" name='pictures' onChange={onChange} type="file" /> */}
                    <label htmlFor="change-cover">
                      <Button
                        startIcon={<UploadTwoToneIcon />}
                        variant="contained"
                        component="span"
                        onClick={handleOpen}
                      >
                        OpenStreetMap
                      </Button>
                    </label>
                  </CardCoverAction>
                </CardCover>  
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TableForm />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Confirm and Save
              </Typography>
              <Typography variant="subtitle2">
                Would you like to save your information?
              </Typography>
            </Box>
            <div>
              <Button variant="text" onClick={onSaveClick} startIcon={<DownloadDoneOutlinedIcon />}>
                Save
              </Button>
              <Button variant="text" onClick={onCancelClick} startIcon={<HighlightOffOutlinedIcon />}>
                Cancel
              </Button>
            </div>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FarmAreaTab;
