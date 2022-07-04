import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react';

import { BackButton, RequestHandler } from '../../components';
import { BorderCountries, CountryDetails } from './';
import { useFetch } from '../../hooks';

export const CountryPreview = () => {
  const countryCode = useParams().code;

  const { data, isLoading, isError, error } = useFetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  const country = data[0];

  return (
    <Container as="section" mt={['10', null, '20']} px="7" p="0 1.75rem">
      <BackButton to="/countries/" />

      <RequestHandler isLoading={isLoading} isError={isError} error={error}>
        {data.length ? (
          <Flex
            mt={['14', null, '20']}
            gap={['10', null, null, '24']}
            flexDir={['column', null, null, 'row']}
            justifyContent="space-between"
            alignItems="center"
          >
            <a href={country.maps.googleMaps} target="_blank" rel="noreferrer">
              <Image
                src={country.flags.svg}
                w={['full', null, null, '35rem']}
                h={['14.5rem', '25rem']}
                objectFit="cover"
                title="See on Google Maps"
              />
            </a>

            <Box py={['0', null, '10']} w={['full', null, null, '38.5rem']}>
              <Heading as="h2" fontSize={['22px', null, '32px']} mb={['6', null, '8']}>
                {country.name.common}
              </Heading>

              <CountryDetails country={country} />

              <BorderCountries country={country} />
            </Box>
          </Flex>
        ) : null}
      </RequestHandler>
    </Container>
  );
};
