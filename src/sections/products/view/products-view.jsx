import { sample } from 'lodash';
import { useEffect } from 'react';
import { faker } from '@faker-js/faker';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchPhotos } from 'src/_mock/products';

import otherStore from 'src/sections/stores/otherStates/other-states';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export default function ProductsView() {
  const { openFilter, setOpenFilter, photos, setPhotos, isLoading, setIsLoading } = otherStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPhotos();
        setPhotos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setPhotos, setIsLoading]);

  const products = photos.map((photo) => {
    const setIndex = photo.id;

    return {
      id: faker.string.uuid(),
      cover: `${photo.url}`,
      name: photo.title,
      price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
      priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: sample(['sale', 'new', '', '']),
    };
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilters
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />

              <ProductSort />
            </Stack>
          </Stack>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <ProductCartWidget />
        </>
      )}
    </Container>
  );
}
