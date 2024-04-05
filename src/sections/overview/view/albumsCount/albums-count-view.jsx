import { useEffect } from 'react';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';

import AppWidgetSummary from '../../app-widget-summary';
import overviewStore from '../../../stores/overviewStore/overview-store';

const AlbumsCount = () => {
  const { totalAlbumsCount, setTotalAlbumsCount } = overviewStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/albums?_start=0&_limit=1'
        );
        const totalXCount = response.headers.get('x-total-count');
        console.log('x-total-count:', totalXCount);
        setTotalAlbumsCount(totalXCount);
        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [setTotalAlbumsCount]);

  return (
    <Grid xs={12} sm={6} md={3}>
      <Link href="blog" sx={{ textDecoration: 'none' }}>
        <AppWidgetSummary
          title="Albums"
          total={`${totalAlbumsCount}`}
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
        />
      </Link>
    </Grid>
  );
};

export default AlbumsCount;
