import React from 'react';
import './Footer.css';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import { Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <footer className="footer">
      <Stack alignItems="center" justifyContent="center" direction="row" gap={1}>
        <CopyrightOutlinedIcon />
        <Typography variant="body1"> {new Date().getFullYear()} MyRecipeBook</Typography>
      </Stack>
    </footer>
  );
};
