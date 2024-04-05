import { useEffect } from 'react';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import UserCount from './userCount/user-count-view';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import PostsCount from './postsCount/post-count-view';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import PhotosCount from './photosCount/photos-count-view';
import AlbumsCount from './albumsCount/albums-count-view';
import overviewStore from '../../stores/overviewStore/overview-store';

// ----------------------------------------------------------------------

export default function AppView() {
  //   const [totalUsersCount, setTotalUsersCount] = useState(0);
  // const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  // const [totalPostsCount, setTotalPostsCount] = useState(0);
  // const [totalTodosCount, setTotalTodosCount] = useState(0);
  // const [totalAlbumsCount, setTotalAlbumsCount] = useState(0);

  const {
    totalUsersCount,
    totalCommentsCount,
    setTotalCommentsCount,
    totalPostsCount,
    totalTodosCount,
    setTotalTodosCount,
    totalAlbumsCount,
    setTotalAlbumsCount,
  } = overviewStore();

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/comments?_start=0&_limit=1'
        );
        const totalXCount = response.headers.get('x-total-count');
        console.log('x-total-count:', totalXCount);
        setTotalCommentsCount(totalXCount);
        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCommentsData();
  }, [setTotalCommentsCount]);

  useEffect(() => {
    const fetchTodosData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=1'
        );
        const totalXCount = response.headers.get('x-total-count');
        console.log('x-total-count:', totalXCount);
        setTotalTodosCount(totalXCount);
        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTodosData();
  }, [setTotalTodosCount]);

  useEffect(() => {
    const fetchAlbumsData = async () => {
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

    fetchAlbumsData();
  }, [setTotalAlbumsCount]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <PhotosCount />
        <UserCount />
        <PostsCount />
        <AlbumsCount />

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: ['Users', 'Todos', 'Posts', 'Comments', 'Albums'],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [
                    totalUsersCount,
                    totalTodosCount,
                    totalPostsCount,
                    totalCommentsCount,
                    totalAlbumsCount,
                  ],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [440, 355, 241, 367, 490],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [300, 525, 436, 330, 420],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'Users', value: 10 },
                { label: 'Comments', value: 500 },
                { label: 'Posts', value: 100 },
                { label: 'Todos', value: 200 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Users', value: totalUsersCount },
                { label: 'Comments', value: totalCommentsCount },
                { label: 'Posts', value: totalPostsCount },
                { label: 'Todos', value: totalTodosCount },
                { label: 'Albums', value: totalAlbumsCount },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
