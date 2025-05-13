
export const fetchCountryData = async (countryName) => {
    
    if (!countryName.trim()) return null;
    if(countryName.trim().toLowerCase() == 'israel' ) {
        countryName = 'Palestine';
    }
    try {
        
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Country not found. Please enter a correct country name.');
        }
        throw new Error('Something went wrong');
      }
      
      const data = await response.json();
      return data[0];
    } catch (err) {
      throw err;
    }
  };