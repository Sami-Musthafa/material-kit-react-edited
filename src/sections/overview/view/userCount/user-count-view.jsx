import { useEffect } from 'react';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';

import AppWidgetSummary from '../../app-widget-summary';
import overviewStore from '../../../stores/overviewStore/overview-store';

const UserCount = () => {
  const { totalUsersCount, setTotalUsersCount } = overviewStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users?_start=0&_limit=1'
        );
        const totalXCount = response.headers.get('x-total-count');
        console.log('x-total-count:', totalXCount);
        setTotalUsersCount(totalXCount);
        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [setTotalUsersCount]);

  return (
    <Grid xs={12} sm={6} md={3}>
      <Link href="user" sx={{ textDecoration: 'none' }}>
        <AppWidgetSummary
          title="Users"
          total={`${totalUsersCount}`}
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
        />
      </Link>
    </Grid>
  );
};

export default UserCount;
