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

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { StateType, UserType } from 'src/reducer/dataType';
import { useState, useRef, useMemo, useCallback } from 'react';
import {editProfile} from 'src/actions/authAction'


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

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

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

function EditProfileTab() {
  const navigate: any = useNavigate();
  const dispatch: any = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const eventHandlers = useMemo(
    () => ({
      click() {
        alert("sdfsdf")
      },
    }),
    [],
  )

  const profile: UserType = useSelector((state: StateType) => state.auth.user);
  const token: string = useSelector((state: StateType) => state.auth.token)

  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 9
  const mapRef = useRef()
  // const [map, setMap] = useState(null)

  const [updatePossible, setUpdatePossible] = useState({
    personal: true,
    contact: true,
    brokerage: true,
    pictures: true,
  })

  const onSaveClick = e => {
    e.preventDefault();
    dispatch(editProfile(profile._id, token, updateProfile));

    setUpdatePossible({
      ...updatePossible,
      personal: true
    })
  }

  const onCancelClick = e => {
    e.preventDefault();
    navigate('/profile/details')
  }

  const [updateProfile, setUpdateProfile] = useState({
    type: profile.type,
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    cell: profile.cell,
    email: profile.email,
    tradeName: profile.tradeName,
    brokerageName: profile.brokerageName,
    brokerageCity: profile.brokerageCity,
    brokeragePostalCode: profile.brokeragePostalCode,
    brokerageAddress: profile.brokerageAddress,
    brokeragePhone: profile.brokeragePhone,
  })

  const onChange = e => {
    setUpdateProfile({
      ...updateProfile, 
      [e.target.name]: e.target.value
    })
  }

  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/background/map.png',
    avatar: '/static/images/avatars/main.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  const onEditClick = (e) => {
    e.preventDefault()
    
    setUpdatePossible({
      ...updatePossible,
      personal: !updatePossible.personal
    })
  }

  const onPhoneVerifyClick = e => {
    e.preventDefault();
  }

  const onEmailVerifyClick = e => {
    e.preventDefault();
  }

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
                Personal Informations
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            <div>
              <Button variant="text" onClick={onEditClick} disabled={updatePossible.personal == true ? false : true} startIcon={<EditTwoToneIcon />}>
                Edit
              </Button>
              <Button variant="text" onClick={onEditClick} disabled={updatePossible.personal == true ? true : false} startIcon={<DoNotDisturbOutlinedIcon />}>
                Cancel
              </Button>
            </div>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    *Type:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updateProfile.type}
                    name='type'
                    label="*Type"
                    disabled={true}
                    onChange={onChange}
                  >
                    <MenuItem value={'agent'}>Agent</MenuItem>
                    <MenuItem value={'buyer'}>Buyer</MenuItem>
                    <MenuItem value={'seller'}>Seller</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    *FirstName:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="firstName" disabled={updatePossible.personal} value={updateProfile.firstName} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    MiddleName:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="middleName" disabled={updatePossible.personal} value={updateProfile.middleName} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    *LastName:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="lastName" disabled={updatePossible.personal} value={updateProfile.lastName} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    TradeName:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="tradeName" disabled={updatePossible.personal} value={updateProfile.tradeName} onChange={onChange} variant="outlined" />
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
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
                Contact Information
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your contact information
              </Typography>
            </Box>
            {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button> */}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    *Cell Phone:
                  </Box><br />
                  <Button variant="text" onClick={onEmailVerifyClick} startIcon={<DownloadDoneOutlinedIcon />}>
                    Verify
                  </Button><br />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField type='number' name="cell" disabled={updatePossible.personal} value={updateProfile.cell} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    *Email:
                  </Box><br />
                  <Button variant="text" onClick={onPhoneVerifyClick} startIcon={<DownloadDoneOutlinedIcon />}>
                    Verify
                  </Button><br />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField type='email' name="email" disabled={updatePossible.personal} value={updateProfile.email} onChange={onChange} variant="outlined" />
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {profile.type == 'agent' ? (
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
                Brokerage Information
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated brokerage information
              </Typography>
            </Box>
            {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button> */}
          </Box>
          <Divider />
            <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="brokerageName" disabled={updatePossible.personal} value={updateProfile.brokerageName} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="brokerageAddress" disabled={updatePossible.personal} value={updateProfile.brokerageAddress} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    City:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="brokerageCity" disabled={updatePossible.personal} value={updateProfile.brokerageCity} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    Postal Code:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField name="brokeragePostalCode" disabled={updatePossible.personal} value={updateProfile.brokeragePostalCode} onChange={onChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pt={1.5}>
                    Phone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField type='number' name="brokeragePhone" disabled={updatePossible.personal} value={updateProfile.brokeragePhone} onChange={onChange} variant="outlined" />
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      ) : ''}
      
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

export default EditProfileTab;
