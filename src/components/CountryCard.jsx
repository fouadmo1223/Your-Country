import { Card, Typography, Grid, Box, Chip, Divider, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const GlassCard = styled(Card)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)'
  }
}));

const FlagContainer = styled(Box)({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  '&:before': {
    content: '""',
    display: 'block',
    paddingTop: '60%'
  }
});

const FlagImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const DataBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  minWidth: '80px'
}));

const CountryCard = ({ countryData }) => {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassCard>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5
                  }}>
                    {countryData.name.common}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ opacity: 0.8 }}>
                    {countryData.name.official}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip 
                    label={countryData.region} 
                    size="small" 
                    sx={{ 
                      fontWeight: 600,
                      backgroundColor: 'rgba(63, 81, 181, 0.1)',
                      color: '#3f51b5'
                    }} 
                  />
                  {countryData.subregion && (
                    <Chip 
                      label={countryData.subregion} 
                      size="small"
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        color: '#2196f3'
                      }} 
                    />
                  )}
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <DataBadge>
                    <Typography variant="caption" color="text.secondary">Population</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {countryData.population.toLocaleString()}
                    </Typography>
                  </DataBadge>
                  <DataBadge>
                    <Typography variant="caption" color="text.secondary">Capital</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {countryData.capital?.[0] || 'N/A'}
                    </Typography>
                  </DataBadge>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />

                <Grid container spacing={1.5} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Languages</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {countryData.languages ? Object.values(countryData.languages).slice(0, 3).join(', ') : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Currency</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {countryData.currencies ? Object.values(countryData.currencies).map(c => c.name).join(', ') : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">Timezones</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {countryData.timezones.slice(0, 3).join(', ')}
                      {countryData.timezones.length > 3 && '...'}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <FlagContainer>
                <FlagImage
                  src={countryData.flags.png}
                  alt={`Flag of ${countryData.name.common}`}
                />
              </FlagContainer>
              {countryData.coatOfArms?.png && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="overline" color="text.secondary">Coat of Arms</Typography>
                  <Box sx={{ 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: '100px',
                    height: '100px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    mt: 1
                  }}>
                    <img
                      src={countryData.coatOfArms.png}
                      alt={`Coat of arms of ${countryData.name.common}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </GlassCard>
    </Box>
  );
};

export default CountryCard;