import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { BASE_URL, fetchUsers } from 'src/_mock/user';

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userFetchedData = await fetchUsers(`${BASE_URL}/users/${params.userId}`);
        setUserData(userFetchedData);
        console.log(userFetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserProfile();
  }, [params.userId]);

  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(userData.name);

  const navigate = useNavigate();

  return (
    <Box bgcolor="white" mx="3rem" pb={3} borderRadius={3}>
      <Typography textAlign="center" variant="h3" pt={3}>
        User Details
      </Typography>
      {Object.keys(userData).length > 0 ? (
        <Box
          display="flex"
          gap={3}
          justifyContent="space-evenly"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          py="2rem"
          px="3rem"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <Box display="flex" flex={1} flexDirection="column" gap={2}>
            <TextField id="outlined-required" label="Name" defaultValue={`${userData.name}`} />
            <TextField id="outlined-required" label="id" defaultValue={userData.id} />
            <TextField id="outlined-required" label="User Name" defaultValue={userData.username} />
            <TextField id="outlined-required" label="Phone" defaultValue={userData.phone} />
            <TextField id="outlined-required" label="Email" defaultValue={userData.email} />
          </Box>
          <Box display="flex" flex={1} flexDirection="column" gap={2}>
            <TextField id="outlined-required" label="Website" defaultValue={userData.website} />
            <TextField id="outlined-required" label="City" defaultValue={userData.address?.city} />
            <TextField
              id="outlined-required"
              label="Street"
              defaultValue={userData.address?.street}
            />
            <TextField
              id="outlined-required"
              label="Suite"
              defaultValue={userData.address?.suite}
            />
            <TextField
              id="outlined-required"
              label="Zipcode"
              defaultValue={userData.address?.zipcode}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" textAlign="center">
          Loading...
        </Typography>
      )}
      <Box px="3rem" display="flex" justifyContent="flex-end">
        <LoadingButton
          size="medium"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={() => navigate(`/user`)}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UserProfile;
