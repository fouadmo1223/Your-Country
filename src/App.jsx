import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert,
  Container,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import './App.css';
import CountryCard from './components/CountryCard';
import { fetchCountryData } from './utils/countryApi';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const searchCountry = async () => {
    if (!countryName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCountryData(countryName);
      setCountryData(data);
    } catch (err) {
      setError(err.message);
      setCountryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCountry();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          mb: 4,
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          label="Search for a country..."
          variant="outlined"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1px',
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.secondary,
              '&.Mui-focused': {
                color: theme.palette.primary.main,
              },
            }
          }}
          InputProps={{
            sx: {
              backgroundColor: theme.palette.background.paper,
              height: '56px',
              fontSize: '1rem',
              '& input::placeholder': {
                opacity: 0.6,
              }
            }
          }}
        />
        <Button
          variant="contained"
          onClick={searchCountry}
          disabled={loading || !countryName.trim()}
          sx={{
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            minWidth: { xs: '100%', sm: '140px' },
            height: '56px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </Box>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {countryData && <CountryCard countryData={countryData} />}
      </AnimatePresence>
    </Container>
  );
}

export default App;