import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box component="img" src="https://bank.gov.ua/frontend/content/logo.png?v=4" sx={{ width: 272, height: 60, ...sx }} />
    </RouterLink>
  );
}
