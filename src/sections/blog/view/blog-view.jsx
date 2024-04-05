import { useEffect } from 'react';
import { faker } from '@faker-js/faker';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchPosts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import otherStore from 'src/sections/stores/otherStates/other-states';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView() {
  const { postsData, setPostsData, isLoading, setIsLoading } = otherStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPosts();
        setPostsData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading, setPostsData]);

  console.log(postsData);

  const posts = postsData.map((post) => ({
    id: post.id,
    cover: `/assets/images/covers/cover_${post.id}.jpg`,
    title: post.title,
    body: post.body,
    createdAt: faker.date.past(),
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    share: faker.number.int(99999),
    favorite: faker.number.int(99999),
    author: {
      name: faker.person.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${post.id}.jpg`,
    },
  }));

  return (
    <Container>
      {isLoading ? (
        <Typography
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          variant="body1"
        >
          Loading...
        </Typography>
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Blog</Typography>

            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Post
            </Button>
          </Stack>

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <PostSearch posts={posts} />
            <PostSort
              options={[
                { value: 'latest', label: 'Latest' },
                { value: 'popular', label: 'Popular' },
                { value: 'oldest', label: 'Oldest' },
              ]}
            />
          </Stack>

          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <PostCard key={index} post={post} index={index} />
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
