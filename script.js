let currentInput;
let cliOutput;
let inputLine;
let commandHistory = [];
let historyIndex = -1;
let currentInputBuffer = '';

document.addEventListener('DOMContentLoaded', () => {
    cliOutput = document.getElementById('cli-output');
    displayBanner();
    displayWelcomeMessage();
    
    const { inputLine: newInputLine, input } = createInputLine();
    inputLine = newInputLine;
    if (!cliOutput.contains(inputLine)) {
        cliOutput.appendChild(inputLine);
    }
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = e.target.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                currentInputBuffer = '';
                executeCommand(command);
                e.target.value = '';
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex === commandHistory.length) {
                    currentInputBuffer = e.target.value;
                }
                if (historyIndex > 0) {
                    historyIndex--;
                    e.target.value = commandHistory[historyIndex];
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    e.target.value = commandHistory[historyIndex];
                } else if (historyIndex === commandHistory.length - 1) {
                    historyIndex = commandHistory.length;
                    e.target.value = currentInputBuffer;
                }
                break;
        }
        // Move cursor to end of input
        setTimeout(() => {
            e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
        }, 0);
    });
    
    document.addEventListener('click', () => {
        currentInput.focus();
    });
});

function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-input-line';
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'guest@jakoblangtry.com:~$ ';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'cli-input';
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'off');
    
    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    
    input.focus();
    currentInput = input;
    return { inputLine, input };
}

function displayBanner() {
    const banner = `
     ██╗ █████╗ ██╗  ██╗ ██████╗ ██████╗     ██╗      █████╗ ███╗   ██╗ ██████╗████████╗██████╗ ██╗   ██╗
     ██║██╔══██╗██║ ██╔╝██╔═══██╗██╔══██╗    ██║     ██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝
     ██║███████║█████╔╝ ██║   ██║██████╔╝    ██║     ███████║██╔██╗ ██║██║  ███╗  ██║   ██████╔╝ ╚████╔╝ 
██   ██║██╔══██║██╔═██╗ ██║   ██║██╔══██╗    ██║     ██╔══██║██║╚██╗██║██║   ██║  ██║   ██╔══██╗  ╚██╔╝  
╚█████╔╝██║  ██║██║  ██╗╚██████╔╝██████╔╝    ███████╗██║  ██║██║ ╚████║╚██████╔╝  ██║   ██║  ██║   ██║   
 ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   
                                                                                                    v1.0.0
`;
    appendOutput(banner, 'ascii-art');
}

function displayWelcomeMessage() {
    appendOutput('Welcome to Jakob Langtry\'s terminal interface.\nType \'help\' to see available commands.', 'info-text');
}

function appendOutput(text, className = '') {
    const output = document.createElement('div');
    output.className = className;
    output.textContent = text;
    if (inputLine && inputLine.parentNode === cliOutput) {
        cliOutput.insertBefore(output, inputLine);
    } else {
        cliOutput.appendChild(output);
    }
    cliOutput.scrollTop = cliOutput.scrollHeight;
}

function executeCommand(command) {
    const commandLine = document.createElement('div');
    commandLine.textContent = `guest@jakoblangtry.com:~$ ${command}`;
    cliOutput.insertBefore(commandLine, inputLine);
    
    const normalizedCommand = command.toLowerCase();
    switch (normalizedCommand) {
        case 'help':
            appendOutput('Available commands: help, whoami, date, echo, repo, clear, email, weather, exit, curl, banner, resume, projects', 'info-text');
            break;
        case 'clear':
            cliOutput.innerHTML = '';
            displayBanner();
            cliOutput.appendChild(inputLine);
            break;
        case 'whoami':
            appendOutput('guest');
            break;
        case 'date':
            appendOutput(new Date().toLocaleString());
            break;
        case 'banner':
            displayBanner();
            break;
        case 'email':
            appendOutput('Opening email client...');
            window.location.href = 'mailto:jjalangtry@gmail.com';
            break;
        case 'repo':
            appendOutput('Opening repository...');
            window.open('https://github.com/jjl4287', '_blank');
            break;
        case 'weather':
            appendOutput('Usage: weather [city or location]. Examples:\n  weather New York\n  weather Syracuse NY\n  weather London, UK\n  weather Paris France', 'info-text');
            break;
        case 'exit':
            appendOutput('Goodbye! Closing terminal...');
            setTimeout(() => window.close(), 1000);
            break;
        case 'resume':
            appendOutput('Opening resume...');
            window.open('JakobLangtryFeb25.pdf', '_blank');
            break;
        case 'projects':
            const projectsList = [
                { name: 'Converter', url: 'https://convert.jakoblangtry.com' }
            ];
            appendOutput('Available projects:\n' + projectsList.map((project, index) => 
                `${index + 1}. ${project.name} - ${project.url}`
            ).join('\n'), 'info-text');
            appendOutput('Click on a project URL or type its name to open it.', 'info-text');
            break;
        default:
            if (normalizedCommand === 'converter') {
                appendOutput('Opening Link Converter...');
                window.open('https://convert.jakoblangtry.com', '_blank');
                break;
            }
            else if (normalizedCommand.startsWith('weather ')) {
                const city = command.substring(8).trim(); // Get everything after "weather "
                
                // We're now handling the formatting in fetchWeather function
                fetchWeather(city);
            } else if (normalizedCommand.startsWith('echo ')) {
                appendOutput(command.substring(5));
            } else {
                appendOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error-text');
            }
    }
}

async function fetchWeather(city) {
    try {
        appendOutput(`Fetching weather data for ${city}...`);
        
        // Format city name for best API results
        let formattedCity = city;
        let isUsLocation = false;
        
        // Add logic to better handle queries with region names
        if (!city.includes(',')) {
            // Check for US state abbreviations first as they're most problematic
            const stateAbbrs = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 
                               'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 
                               'VA', 'WA', 'WV', 'WI', 'WY', 'DC'];
            
            // If the city has multiple words, check if the last word is a state abbreviation
            if (city.includes(' ')) {
                const parts = city.split(' ');
                const lastPart = parts[parts.length - 1].toUpperCase();
                if (stateAbbrs.includes(lastPart)) {
                    const cityPart = parts.slice(0, parts.length - 1).join(' ');
                    formattedCity = `${cityPart}, ${lastPart}`;
                    isUsLocation = true;
                }
            }
            
            // Check for common formats like "City State" where State is a full name
            const stateNames = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
                               'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
                               'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
                               'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
                               'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
                               'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
                               'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
                               'Wisconsin', 'Wyoming'];
            
            // Improved case-insensitive state name matching
            for (const state of stateNames) {
                const statePattern = new RegExp(`\\s${state}$`, 'i');
                if (statePattern.test(city)) {
                    const cityPart = city.substring(0, city.length - state.length - 1);
                    formattedCity = `${cityPart}, ${state}`;
                    isUsLocation = true;
                    break;
                }
            }
            
            // Check for common patterns of city followed by country name without comma
            if (!isUsLocation) {
                const commonCountries = ['USA', 'US', 'UK', 'France', 'Germany', 'Canada', 'Italy', 'Spain', 'Japan', 'China', 'Russia', 'Brazil', 'Australia'];
                
                for (const country of commonCountries) {
                    const countryPattern = new RegExp(`\\s${country}$`, 'i');
                    if (countryPattern.test(city)) {
                        const cityPart = city.substring(0, city.length - country.length - 1);
                        formattedCity = `${cityPart}, ${country}`;
                        break;
                    }
                }
            }
        }
        
        // For US locations, specifically help the API by adding USA if not present
        if (isUsLocation && !formattedCity.toLowerCase().includes('usa') && !formattedCity.toLowerCase().includes('us')) {
            formattedCity = `${formattedCity}, USA`;
        }
        
        console.log(`Formatted city: ${formattedCity}`); // Debug output
        
        // Try to fetch real weather data
        try {
            // Get API key from window.ENV (injected by server)
            const apiKey = window.ENV?.OPENWEATHERMAP_API_KEY || 'REPLACE_WITH_YOUR_API_KEY';
            
            // If we have a valid API key, use OpenWeatherMap API
            if (apiKey && apiKey !== 'REPLACE_WITH_YOUR_API_KEY' && apiKey !== '') {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(formattedCity)}&limit=1&appid=${apiKey}`;
                
                // First get coordinates for the city
                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();
                
                if (!geoData.length) {
                    // Try adding "USA" if it's likely a US city but we couldn't find it
                    if (!formattedCity.toLowerCase().includes('usa') && !formattedCity.toLowerCase().includes('us')) {
                        const usFormattedCity = `${formattedCity}, USA`;
                        const usGeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(usFormattedCity)}&limit=1&appid=${apiKey}`;
                        
                        const usGeoResponse = await fetch(usGeoUrl);
                        const usGeoData = await usGeoResponse.json();
                        
                        if (usGeoData.length) {
                            const { lat, lon, name, state, country } = usGeoData[0];
                            
                            // Now fetch the weather forecast with the coordinates
                            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                            const weatherResponse = await fetch(forecastUrl);
                            const weatherData = await weatherResponse.json();
                            
                            // Display the weather report
                            displayWeatherReport(weatherData, name, state, country, lat, lon);
                            return;
                        }
                    }
                    
                    appendOutput(`City "${city}" not found. Please try a different format like "City, State" or "City, Country".`, 'error-text');
                    return;
                }
                
                const { lat, lon, name, state, country } = geoData[0];
                
                // Now fetch the weather forecast with the coordinates
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const weatherResponse = await fetch(forecastUrl);
                const weatherData = await weatherResponse.json();
                
                // Display the weather report
                displayWeatherReport(weatherData, name, state, country, lat, lon);
                return;
            }
            
            // Alternatively, try using weatherapi.com (free tier, no API key required for demo)
            const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=0236abd99deb4da5ace70557231307&q=${encodeURIComponent(formattedCity)}&days=3&aqi=no&alerts=no`;
            const response = await fetch(weatherApiUrl);
            
            if (response.ok) {
                const data = await response.json();
                displayWeatherApiReport(data);
                return;
            } else {
                // If the first API call failed, try with "USA" added for potential US cities
                if (!formattedCity.toLowerCase().includes('usa') && !formattedCity.toLowerCase().includes('us')) {
                    const usFormattedCity = `${formattedCity}, USA`;
                    const usWeatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=0236abd99deb4da5ace70557231307&q=${encodeURIComponent(usFormattedCity)}&days=3&aqi=no&alerts=no`;
                    
                    const usResponse = await fetch(usWeatherApiUrl);
                    if (usResponse.ok) {
                        const usData = await usResponse.json();
                        displayWeatherApiReport(usData);
                        return;
                    }
                }
            }
        } catch (error) {
            console.error("API error:", error);
            // If API calls fail, fall back to simulated data
        }
        
        // Fallback to simulated data if no API key or API calls fail
        const simulatedData = generateSimulatedWeatherData(formattedCity);
        displaySimulatedWeatherReport(simulatedData, formattedCity);
        
    } catch (error) {
        appendOutput(`Error fetching weather data: ${error.message}`, 'error-text');
    }
}

// Specialized function for weather output to ensure proper formatting
function appendWeatherOutput(text) {
    const output = document.createElement('div');
    output.className = 'command-output';
    
    // Create a container to control width and prevent responsive issues
    const container = document.createElement('div');
    container.className = 'weather-container';
    
    // Use pre element to ensure exact formatting
    const pre = document.createElement('pre');
    pre.textContent = text;
    
    container.appendChild(pre);
    output.appendChild(container);
    
    if (inputLine && inputLine.parentNode === cliOutput) {
        cliOutput.insertBefore(output, inputLine);
    } else {
        cliOutput.appendChild(output);
    }
    cliOutput.scrollTop = cliOutput.scrollHeight;
}

// Function to display weather from weatherapi.com format
function displayWeatherApiReport(data) {
    const city = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const lat = data.location.lat;
    const lon = data.location.lon;
    
    // Build the report
    let report = `Weather report: ${city}\n\n`;
    
    // Current weather
    const currentWeather = {
        weather: [{
            main: data.current.condition.text,
            description: data.current.condition.text
        }],
        main: {
            temp: data.current.temp_c,
            feels_like: data.current.feelslike_c
        },
        wind: {
            speed: data.current.wind_kph / 3.6, // Convert km/h to m/s for consistent formatting
            deg: data.current.wind_degree
        },
        visibility: data.current.vis_km * 1000, // Convert km to m for consistent formatting
        rain: data.current.precip_mm > 0 ? { '3h': data.current.precip_mm } : null,
        snow: null // API doesn't distinguish rain from snow in current conditions
    };
    
    report += getWeatherAscii(currentWeather);
    
    // Process forecast days
    data.forecast.forecastday.forEach(day => {
        // Add horizontal separator
        report += '\n';
        for (let i = 0; i < 104; i++) report += '─';
        report += '\n';
        
        // Format date header
        const date = new Date(day.date);
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
        const dayOfMonth = date.getDate();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
        
        // Add date header centered
        const dateHeader = `${dayOfWeek} ${dayOfMonth} ${month}`;
        const padding = Math.floor((104 - dateHeader.length) / 2);
        report += ' '.repeat(padding) + dateHeader + '\n';
        
        // Table header row
        report += '|' + ' '.repeat(8) + 'Morning' + ' '.repeat(8) + '|';
        report += ' '.repeat(10) + 'Noon' + ' '.repeat(12) + '|';
        report += ' '.repeat(8) + 'Evening' + ' '.repeat(9) + '|';
        report += ' '.repeat(9) + 'Night' + ' '.repeat(11) + '|\n';
        
        // Extract time periods from the hourly data
        const hours = day.hour;
        const morning = hours.find(h => new Date(h.time).getHours() === 8) || hours[0];
        const noon = hours.find(h => new Date(h.time).getHours() === 12) || hours[4];
        const evening = hours.find(h => new Date(h.time).getHours() === 18) || hours[8];
        const night = hours.find(h => new Date(h.time).getHours() === 22) || hours[12];
        
        // Format each period into the weather API format for our helper functions
        const formatPeriod = (period) => ({
            weather: [{
                main: period.condition.text,
                description: period.condition.text
            }],
            main: {
                temp: period.temp_c,
                feels_like: period.feelslike_c
            },
            wind: {
                speed: period.wind_kph / 3.6, // Convert km/h to m/s
                deg: period.wind_degree
            },
            visibility: period.vis_km * 1000, // Convert km to m
            rain: period.precip_mm > 0 ? { '3h': period.precip_mm } : null,
            snow: null, // API doesn't distinguish rain from snow
            pop: period.chance_of_rain / 100 // Convert percentage to decimal
        });
        
        const periods = {
            morning: formatPeriod(morning),
            noon: formatPeriod(noon),
            evening: formatPeriod(evening),
            night: formatPeriod(night)
        };
        
        // Build the table rows using our compact format
        report += buildCompactRow(periods, 'condition');
        report += buildCompactRow(periods, 'temp');
        report += buildCompactRow(periods, 'wind');
        report += buildCompactRow(periods, 'visibility');
        report += buildCompactRow(periods, 'precip');
    });
    
    // Add location footer
    report += `\nLocation: ${city}, ${region || ''}, ${country} [${lat.toFixed(7)},${lon.toFixed(7)}]\n\n`;

    
    // Use the new specialized weather output function
    appendWeatherOutput(report);
}

// Function to generate simulated weather data for fallback
function generateSimulatedWeatherData(city) {
    // Get current date and simulate 3 days
    const now = new Date();
    const simulated = {
        city: city,
        country: 'Simulation',
        lat: 40.7128,
        lon: -74.0060,
        list: []
    };
    
    // Weather conditions to cycle through
    const conditions = [
        { main: 'Clear', description: 'clear sky' },
        { main: 'Clouds', description: 'few clouds' },
        { main: 'Clouds', description: 'scattered clouds' },
        { main: 'Clouds', description: 'overcast clouds' },
        { main: 'Rain', description: 'light rain' },
        { main: 'Rain', description: 'moderate rain' },
        { main: 'Snow', description: 'light snow' },
        { main: 'Snow', description: 'moderate snow' }
    ];
    
    // Generate data for 3 days, 4 time periods each day
    for (let day = 0; day < 3; day++) {
        const date = new Date(now);
        date.setDate(now.getDate() + day);
        
        // Generate for morning, noon, evening, night
        const hours = [8, 12, 18, 22];
        
        hours.forEach((hour, index) => {
            date.setHours(hour);
            
            // Base temperature with some random variation, colder at night
            let baseTemp = 15; // Base temp
            if (hour < 10) baseTemp -= 5; // Colder in morning
            if (hour > 20) baseTemp -= 8; // Colder at night
            
            // Random daily fluctuation
            baseTemp += day * 2; // Gets warmer each day
            
            // Add some randomness
            const temp = baseTemp + (Math.random() * 10 - 5);
            
            // Random weather condition
            const conditionIndex = Math.floor(Math.random() * conditions.length);
            const condition = conditions[conditionIndex];
            
            // Random wind
            const windSpeed = 2 + Math.random() * 8; // m/s
            const windDeg = Math.floor(Math.random() * 360);
            
            // Random visibility
            const visibility = 5000 + Math.floor(Math.random() * 15000);
            
            // Random precipitation
            const hasPrecip = condition.main === 'Rain' || condition.main === 'Snow';
            const precip = hasPrecip ? (Math.random() * 5).toFixed(1) : 0;
            
            // Create forecast entry
            const forecast = {
                dt: Math.floor(date.getTime() / 1000),
                main: {
                    temp: temp,
                    feels_like: temp - 2 - Math.random() * 3
                },
                weather: [condition],
                wind: {
                    speed: windSpeed,
                    deg: windDeg
                },
                visibility: visibility,
                pop: hasPrecip ? Math.random() : 0
            };
            
            // Add precipitation data if applicable
            if (condition.main === 'Rain') {
                forecast.rain = { '3h': parseFloat(precip) };
            } else if (condition.main === 'Snow') {
                forecast.snow = { '3h': parseFloat(precip) };
            }
            
            simulated.list.push(forecast);
        });
    }
    
    return simulated;
}

// Function to display simulated weather data
function displaySimulatedWeatherReport(data, city) {
    displayWeatherReport(data, city, null, 'Simulation', data.lat, data.lon);
}

function displayWeatherReport(data, city, state, country, lat, lon) {
    // Group forecast data by day
    const forecasts = data.list;
    const days = {};
    
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toDateString();
        const hour = date.getHours();
        
        if (!days[day]) {
            days[day] = {
                morning: null,
                noon: null,
                evening: null,
                night: null
            };
        }
        
        // Assign to time of day (rough approximation)
        if (hour >= 5 && hour < 12) {
            if (!days[day].morning) days[day].morning = forecast;
        } else if (hour >= 12 && hour < 17) {
            if (!days[day].noon) days[day].noon = forecast;
        } else if (hour >= 17 && hour < 22) {
            if (!days[day].evening) days[day].evening = forecast;
        } else {
            if (!days[day].night) days[day].night = forecast;
        }
    });
    
    // Get current weather (first item in the list)
    const currentWeather = forecasts[0];
    
    // Build the report
    let report = `Weather report: ${city.toLowerCase()}\n\n`;
    
    // Define standard table width and ensure it's an even number for perfect symmetry
    const tableWidth = 105; // Adjusted to ensure perfect division by 4
    const cellWidth = Math.floor(tableWidth / 4); // 4 columns exactly
    
    // Create a more prominent centered current weather display with a box that aligns with the main table
    const boxWidth = 46; // Fixed width for current weather box, must be even
    const currentWeatherBox = getWeatherAscii(currentWeather, true, boxWidth);
    
    // Center the current weather box
    const boxLines = currentWeatherBox.split('\n');
    const paddedBox = boxLines.map(line => {
        const padding = Math.floor((tableWidth - boxWidth) / 2);
        return ' '.repeat(padding) + line + ' '.repeat(tableWidth - padding - boxWidth);
    }).join('\n');
    
    report += paddedBox + '\n\n';
    
    // Build the 3-day forecast table
    const dayEntries = Object.entries(days).slice(0, 3);
    
    dayEntries.forEach(([dayString, periods], index) => {
        const date = new Date(dayString);
        
        // Format date with full day name and month, and ordinal suffix
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                           'August', 'September', 'October', 'November', 'December'];
        const dayOfWeek = dayNames[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = monthNames[date.getMonth()];
        
        // Add ordinal suffix (st, nd, rd, th)
        let ordinalSuffix = 'th';
        if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
            ordinalSuffix = 'st';
        } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
            ordinalSuffix = 'nd';
        } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
            ordinalSuffix = 'rd';
        }
        
        // Create full date string
        const dateHeader = `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}`;
        
        // Add separator between days
        if (index > 0) {
            report += '\n';
        }
        
        // Add horizontal separator for the top of the table - ensure exact width
        report += '\n';
        report += '╔';
        for (let i = 0; i < tableWidth - 2; i++) report += '═';
        report += '╗\n';
        
        // Calculate date box dimensions and position
        const dateBoxPadding = 2; // Space on each side of the text
        const innerBoxWidth = dateHeader.length + (dateBoxPadding * 2); // Width of the content inside the inner box
        
        // Calculate exact positions to ensure perfect centering
        // The inner box has 2 border characters (left and right)
        const leftBorderPos = Math.floor((tableWidth - innerBoxWidth - 2) / 2);
        const rightBorderPos = leftBorderPos + innerBoxWidth + 1; // +1 because the right border takes a position
        
        // First line of date box
        let line = '║';
        for (let i = 1; i < tableWidth - 1; i++) {
            if (i === leftBorderPos) line += '╔';
            else if (i > leftBorderPos && i < rightBorderPos) line += '═';
            else if (i === rightBorderPos) line += '╗';
            else line += ' ';
        }
        line += '║';
        report += line + '\n';
        
        // Date content line
        line = '║';
        for (let i = 1; i < tableWidth - 1; i++) {
            if (i === leftBorderPos) line += '║';
            else if (i === rightBorderPos) line += '║';
            else if (i > leftBorderPos && i < rightBorderPos) {
                // Center the text within the inner box
                const textStartPos = leftBorderPos + 1 + Math.floor((innerBoxWidth - dateHeader.length) / 2);
                const textEndPos = textStartPos + dateHeader.length - 1;
                if (i >= textStartPos && i <= textEndPos) {
                    line += dateHeader.charAt(i - textStartPos);
                } else {
                    line += ' ';
                }
            } else {
                line += ' ';
            }
        }
        line += '║';
        report += line + '\n';
        
        // Bottom line of date box
        line = '║';
        for (let i = 1; i < tableWidth - 1; i++) {
            if (i === leftBorderPos) line += '╚';
            else if (i > leftBorderPos && i < rightBorderPos) line += '═';
            else if (i === rightBorderPos) line += '╝';
            else line += ' ';
        }
        line += '║';
        report += line + '\n';
        
        // Add the header row with precisely calculated widths
        report += '╠';
        report += '═'.repeat(cellWidth - 1) + '╦';
        report += '═'.repeat(cellWidth - 1) + '╦';
        report += '═'.repeat(cellWidth - 1) + '╦';
        report += '═'.repeat(cellWidth - 1) + '╣\n';
        
        report += '║' + centerText('Morning', cellWidth - 1) + '║';
        report += centerText('Noon', cellWidth - 1) + '║';
        report += centerText('Evening', cellWidth - 1) + '║';
        report += centerText('Night', cellWidth - 1) + '║\n';
        
        // Add separator after headers - exact tableWidth
        report += '╠';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╣\n';
        
        // Weather condition row
        report += buildBoxCompactRow(periods, 'condition', cellWidth);
        
        // Create the ASCII art for each period and condition
        const asciiArts = [];
        ['morning', 'noon', 'evening', 'night'].forEach(timeOfDay => {
            if (periods[timeOfDay]) {
                const forecast = periods[timeOfDay];
                const weather = forecast.weather[0].main.toLowerCase();
                const description = forecast.weather[0].description.toLowerCase();
                
                let art = '';
                
                if (weather.includes('clear')) {
                    art = "    \\   /    \n" +
                         "      .-.    \n" +
                         "  ── (   ) ──\n" +
                         "      `-'    \n" +
                         "    /   \\    ";
                } else if (weather.includes('cloud')) {
                    if (description.includes('few') || description.includes('scattered') || description.includes('partly')) {
                        art = "    \\  /     \n" +
                             "  _ /\"\" .-.   \n" +
                             "    \\_`(   ). \n" +
                             "    /(___(__))\n" +
                             "              ";
                    } else if (description.includes('broken') || description.includes('overcast')) {
                        art = "     .--.    \n" +
                             "  .-(    ).  \n" +
                             " (___.__)__) \n" +
                             "              \n" +
                             "              ";
                    } else {
                        art = "     .--.    \n" +
                             "  .-(    ).  \n" +
                             " (___.__)__) \n" +
                             "              \n" +
                             "              ";
                    }
                } else if (weather.includes('rain')) {
                    if (description.includes('light') || description.includes('drizzle')) {
                        art = "     .-.     \n" +
                             "    (   ).   \n" +
                             "   (___(__)  \n" +
                             "    ' ' ' '  \n" +
                             "   ' ' ' '   ";
                    } else if (description.includes('heavy')) {
                        art = "     .-.     \n" +
                             "    (   ).   \n" +
                             "   (___(__)  \n" +
                             "  ‚'‚'‚'‚'   \n" +
                             "  ‚'‚'‚'‚'   ";
                    } else {
                        art = "     .-.     \n" +
                             "    (   ).   \n" +
                             "   (___(__)  \n" +
                             "    ' ' ' '  \n" +
                             "   ' ' ' '   ";
                    }
                } else if (weather.includes('snow')) {
                    if (description.includes('blowing') || description.includes('heavy')) {
                        art = "     .-.     \n" +
                             "    (   ).   \n" +
                             "   (___(__)  \n" +
                             "   * * * *   \n" +
                             "  * * * *    ";
                    } else {
                        art = "     .-.     \n" +
                             "    (   ).   \n" +
                             "   (___(__)  \n" +
                             "    *  *  *  \n" +
                             "   *  *  *   ";
                    }
                } else if (weather.includes('thunder') || weather.includes('storm')) {
                    art = "     .-.     \n" +
                         "    (   ).   \n" +
                         "   (___(__)  \n" +
                         "    ⚡⚡⚡    \n" +
                         "   ⚡⚡⚡     ";
                } else if (weather.includes('fog') || weather.includes('mist')) {
                    art = " _ _ _ _ _  \n" +
                         "  _ _ _ _ _  \n" +
                         " _ _ _ _ _   \n" +
                         "  _ _ _ _ _  \n" +
                         " _ _ _ _ _   ";
                } else if (weather.includes('haze') || description.includes('hazy')) {
                    art = "     \\   /   \n" +
                         "      .-.     \n" +
                         "   –– (   ) ––\n" +
                         "      `-'     \n" +
                         "     /   \\    ";
                } else if (weather.includes('sun') || description.includes('sunny')) {
                    art = "    \\   /    \n" +
                         "     .-.     \n" +
                         "  ── (   ) ──\n" +
                         "     `-'     \n" +
                         "    /   \\    ";
                } else if (description.includes('patchy')) {
                    art = "     .-.     \n" +
                         "  .-(    ).  \n" +
                         " (___.__)__) \n" +
                         "  * * * *    \n" +
                         " * * * *     ";
                } else {
                    // Default fallback
                    art = "    \\   /    \n" +
                         "       .-.   \n" +
                         "  ── (   ) ──\n" +
                         "       `-'   \n" +
                         "    /   \\    ";
                }
                
                asciiArts.push(art);
            } else {
                asciiArts.push("             \n             \n             \n             \n             ");
            }
        });
        
        // ASCII art rows
        const artLines = [];
        for (let i = 0; i < 5; i++) {
            let artLine = '║';
            for (let j = 0; j < 4; j++) {
                if (asciiArts[j]) {
                    const artParts = asciiArts[j].split('\n');
                    const content = artParts[i] || '';
                    artLine += formatBoxCompactCell(content, cellWidth - 1, true);
                } else {
                    artLine += formatBoxCompactCell('', cellWidth - 1, true);
                }
            }
            artLines.push(artLine);
        }
        
        report += artLines.join('\n') + '\n';
        
        // Add divider after ASCII art - exact table width
        report += '╠';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╬';
        report += '═'.repeat(cellWidth - 1) + '╣\n';
        
        // Temperature row
        report += buildBoxCompactRow(periods, 'temp', cellWidth);
        
        // Wind row
        report += buildBoxCompactRow(periods, 'wind', cellWidth);
        
        // Visibility row
        report += buildBoxCompactRow(periods, 'visibility', cellWidth);
        
        // Precipitation row
        report += buildBoxCompactRow(periods, 'precip', cellWidth);
        
        // Add bottom border - exact table width
        report += '╚';
        report += '═'.repeat(cellWidth - 1) + '╩';
        report += '═'.repeat(cellWidth - 1) + '╩';
        report += '═'.repeat(cellWidth - 1) + '╩';
        report += '═'.repeat(cellWidth - 1) + '╝\n';
    });
    
    // Add location footer with coordinates formatted like in the template
    report += `\nLocation: ${city}${state ? ', ' + state : ''}, ${country} [${lat.toFixed(7)},${lon.toFixed(7)}]\n\n`;
    
    // Use the specialized weather output function
    appendWeatherOutput(report);
}

// Helper function to center text in a cell
function centerText(text, width) {
    const padding = Math.floor((width - text.length) / 2);
    return ' '.repeat(padding) + text + ' '.repeat(width - text.length - padding);
}

// Helper function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 9/5 + 32);
}

// New function to build rows with box drawing characters
function buildBoxCompactRow(periods, rowType, cellWidth = 25) {
    let row = '║';
    
    // Helper function to get the appropriate content based on row type
    function getContent(period, type) {
        if (!period) return '   --      ';
        
        switch (type) {
            case 'condition':
                const condition = period.weather[0].main;
                // Add ASCII art below for conditions
                let conditionArt = '';
                const conditionLower = condition.toLowerCase();
                
                if (conditionLower.includes('clear')) {
                    conditionArt = ' Clear';
                } else if (conditionLower.includes('cloud')) {
                    if (period.weather[0].description.toLowerCase().includes('few') || 
                        period.weather[0].description.toLowerCase().includes('scattered') || 
                        period.weather[0].description.toLowerCase().includes('partly')) {
                        conditionArt = ' Partly Cloudy';
                    } else if (period.weather[0].description.toLowerCase().includes('broken')) {
                        conditionArt = ' Cloudy';
                    } else {
                        conditionArt = ' Clouds';
                    }
                } else if (conditionLower.includes('rain')) {
                    if (period.weather[0].description.toLowerCase().includes('light')) {
                        conditionArt = ' Light Rain';
                    } else if (period.weather[0].description.toLowerCase().includes('heavy')) {
                        conditionArt = ' Heavy Rain';
                    } else {
                        conditionArt = ' Rain';
                    }
                } else if (conditionLower.includes('snow')) {
                    if (period.weather[0].description.toLowerCase().includes('light')) {
                        conditionArt = ' Light Snow';
                    } else if (period.weather[0].description.toLowerCase().includes('heavy') || 
                              period.weather[0].description.toLowerCase().includes('blowing')) {
                        conditionArt = ' Blowing snow';
                    } else {
                        conditionArt = ' Snow';
                    }
                } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
                    conditionArt = ' Fog';
                } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
                    conditionArt = ' Thunderstorm';
                } else if (conditionLower.includes('overcast')) {
                    conditionArt = ' Overcast';
                } else if (conditionLower.includes('sunny') || conditionLower.includes('sun')) {
                    conditionArt = ' Sunny';
                } else {
                    conditionArt = ' ' + condition;
                }
                
                return conditionArt;
                
            case 'temp':
                const tempC = Math.round(period.main.temp);
                const feelsC = Math.round(period.main.feels_like);
                
                // Convert to Fahrenheit
                const tempF = celsiusToFahrenheit(tempC);
                const feelsF = celsiusToFahrenheit(feelsC);
                
                // Format like "34(30) °F" in the template
                return `${tempF}(${feelsF}) °F`;
                
            case 'wind':
                // Get direction arrow
                const deg = period.wind.deg;
                const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
                const index = Math.round(deg / 45) % 8;
                const arrow = directions[index];
                
                // Format wind speed range like "26-31 km/h"
                const kmh = Math.round(period.wind.speed * 3.6);
                const upperKmh = kmh + 5;
                return `${arrow} ${kmh}-${upperKmh} km/h`;
                
            case 'visibility':
                return `${Math.round(period.visibility / 1000)} km`;
                
            case 'precip':
                const rain = period.rain ? period.rain['3h'] || 0 : 0;
                const snow = period.snow ? period.snow['3h'] || 0 : 0;
                const total = parseFloat((rain + snow).toFixed(1));
                const pop = period.pop ? Math.round(period.pop * 100) : 0;
                return `${total} mm | ${pop}%`;
                
            default:
                return '   --      ';
        }
    }
    
    // Create compact cells for each time period
    row += formatBoxCompactCell(getContent(periods.morning, rowType), cellWidth - 1, true);
    row += formatBoxCompactCell(getContent(periods.noon, rowType), cellWidth - 1, true);
    row += formatBoxCompactCell(getContent(periods.evening, rowType), cellWidth - 1, true);
    row += formatBoxCompactCell(getContent(periods.night, rowType), cellWidth - 1, true);
    
    return row + '\n';
}

// Format cells to be more compact with box drawing characters
function formatBoxCompactCell(content, cellWidth = 25, useDoubleBox = false) {
    const paddedContent = ' ' + content; // Add a space for better readability
    
    // Ensure content doesn't exceed cell width by truncating if necessary
    const truncatedContent = paddedContent.length > cellWidth - 1 ? 
        paddedContent.substring(0, cellWidth - 1) : 
        paddedContent;
    
    // Calculate remaining space precisely
    const remainingSpace = cellWidth - truncatedContent.length;
    
    // Use double box character (║) for borders if specified
    const rightBorder = useDoubleBox ? '║' : '│';
    
    // Return the formatted cell with exact width
    return truncatedContent + ' '.repeat(Math.max(0, remainingSpace)) + rightBorder;
}

// Improve the getWeatherAscii function for better ASCII art and layout
function getWeatherAscii(forecast, isCurrent = false, boxWidth = 46) {
    const weather = forecast.weather[0].main.toLowerCase();
    const description = forecast.weather[0].description.toLowerCase();
    const tempC = Math.round(forecast.main.temp);
    const feelsLikeC = Math.round(forecast.main.feels_like);
    
    // Convert to Fahrenheit
    const tempF = celsiusToFahrenheit(tempC);
    const feelsLikeF = celsiusToFahrenheit(feelsLikeC);
    
    const windSpeed = Math.round(forecast.wind.speed * 3.6); // Convert m/s to km/h
    const visibility = Math.round(forecast.visibility / 1000); // Convert m to km
    
    // Enhanced ASCII art to match the template
    let ascii = '';
    
    if (weather.includes('clear')) {
        ascii = "    \\   /    \n" +
               "      .-.    \n" +
               "  ── (   ) ──\n" +
               "      `-'    \n" +
               "    /   \\    ";
    } else if (weather.includes('cloud')) {
        if (description.includes('few') || description.includes('scattered') || description.includes('partly')) {
            ascii = "    \\  /     \n" +
                   "  _ /\"\" .-.   \n" +
                   "    \\_`(   ). \n" +
                   "    /(___(__))\n" +
                   "              ";
        } else if (description.includes('broken') || description.includes('overcast')) {
            ascii = "     .--.    \n" +
                   "  .-(    ).  \n" +
                   " (___.__)__) \n" +
                   "              \n" +
                   "              ";
        } else {
            ascii = "     .--.    \n" +
                   "  .-(    ).  \n" +
                   " (___.__)__) \n" +
                   "              \n" +
                   "              ";
        }
    } else if (weather.includes('rain')) {
        if (description.includes('light') || description.includes('drizzle')) {
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    ' ' ' '  \n" +
                   "   ' ' ' '   ";
        } else if (description.includes('heavy')) {
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "  ‚'‚'‚'‚'   \n" +
                   "  ‚'‚'‚'‚'   ";
        } else {
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    ' ' ' '  \n" +
                   "   ' ' ' '   ";
        }
    } else if (weather.includes('snow')) {
        if (description.includes('blowing') || description.includes('heavy')) {
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "   * * * *   \n" +
                   "  * * * *    ";
        } else {
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    *  *  *  \n" +
                   "   *  *  *   ";
        }
    } else if (weather.includes('thunder') || weather.includes('storm')) {
        ascii = "     .-.     \n" +
               "    (   ).   \n" +
               "   (___(__)  \n" +
               "    ⚡⚡⚡    \n" +
               "   ⚡⚡⚡     ";
    } else if (weather.includes('fog') || weather.includes('mist')) {
        ascii = " _ _ _ _ _  \n" +
               "  _ _ _ _ _  \n" +
               " _ _ _ _ _   \n" +
               "  _ _ _ _ _  \n" +
               " _ _ _ _ _   ";
    } else if (weather.includes('haze') || description.includes('hazy')) {
        ascii = "     \\   /   \n" +
               "      .-.     \n" +
               "   –– (   ) ––\n" +
               "      `-'     \n" +
               "     /   \\    ";
    } else if (weather.includes('sun') || description.includes('sunny')) {
        ascii = "    \\   /    \n" +
               "     .-.     \n" +
               "  ── (   ) ──\n" +
               "     `-'     \n" +
               "    /   \\    ";
    } else if (description.includes('patchy')) {
        ascii = "     .-.     \n" +
               "  .-(    ).  \n" +
               " (___.__)__) \n" +
               "  * * * *    \n" +
               " * * * *     ";
    } else {
        // Default fallback
        ascii = "    \\   /    \n" +
               "      .-.    \n" +
               "  ── (   ) ──\n" +
               "      `-'    \n" +
               "    /   \\    ";
    }
    
    // Format temperature with range as in the image
    const tempRange = `${tempF}(${feelsLikeF}) °F`;
    
    // Precipitation field
    let precipitation = '0.0 mm';
    if (forecast.rain) {
        precipitation = `${(forecast.rain['3h'] || 0).toFixed(1)} mm`;
    } else if (forecast.snow) {
        precipitation = `${(forecast.snow['3h'] || 0).toFixed(1)} mm`;
    }
    
    // Get direction arrow for wind
    const deg = forecast.wind.deg;
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    const index = Math.round(deg / 45) % 8;
    const arrow = directions[index];
    
    // If this is the current weather, make it more prominent with a box that aligns with the main table
    if (isCurrent) {
        const weatherCondition = weather.charAt(0).toUpperCase() + weather.slice(1);
        
        // Create fixed-width box lines for perfect alignment
        const headerLine = `╔${'═'.repeat(boxWidth - 2)}╗`;
        const titleLine = `║${centerText('Current: ' + weatherCondition, boxWidth - 2)}║`;
        const dividerLine = `╠${'═'.repeat(boxWidth - 2)}╣`;
        const footerLine = `╚${'═'.repeat(boxWidth - 2)}╝`;
        
        // Format the ASCII art to fit the box width
        const asciiLines = ascii.split('\n');
        const paddedAsciiLines = asciiLines.map(line => {
            // Center the ASCII art exactly
            const artPadding = Math.floor((boxWidth - 2 - line.length) / 2);
            return `║${' '.repeat(artPadding)}${line}${' '.repeat(boxWidth - 2 - line.length - artPadding)}║`;
        });
        
        // Create data lines with consistent padding and width
        const tempLine = `║${centerText(tempRange, boxWidth - 2)}║`;
        const windLine = `║${' '.repeat(2)}${arrow} ${windSpeed} km/h${' '.repeat(boxWidth - 2 - 2 - arrow.length - String(windSpeed).length - 6)}║`;
        const visLine = `║${' '.repeat(2)}${visibility} km${' '.repeat(boxWidth - 2 - 2 - String(visibility).length - 3)}║`;
        const precipLine = `║${' '.repeat(2)}${precipitation}${' '.repeat(boxWidth - 2 - 2 - precipitation.length)}║`;
        
        const result = [
            headerLine,
            titleLine,
            dividerLine,
            ...paddedAsciiLines,
            dividerLine,
            tempLine,
            windLine,
            visLine,
            precipLine,
            footerLine
        ].join('\n');
        
        return result;
    }
    
    // Format with consistent indentation to match the template
    return `${ascii}\n` +
           ` ${tempRange}\n` +
           ` ${arrow} ${windSpeed} km/h\n` +
           ` ${visibility} km\n` +
           ` ${precipitation}`;
}

