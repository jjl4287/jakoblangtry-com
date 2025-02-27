// Test script to display the enhanced ASCII weather art

// Function to generate enhanced ASCII art for different weather conditions
function getWeatherAscii(condition) {
    let ascii = '';
    
    switch (condition) {
        case 'clear':
        case 'sunny':
            ascii = "    \\   /    \n" +
                   "     .-.     \n" +
                   "  ── (   ) ──\n" +
                   "     `-'     \n" +
                   "    /   \\    ";
            break;
        case 'partly-cloudy':
            ascii = "   \\  /      \n" +
                   " _ /\"\".-.    \n" +
                   "   \\_`(   ). \n" +
                   "   /(___(__))\n" +
                   "              ";
            break;
        case 'cloudy':
        case 'overcast':
            ascii = "     .--.    \n" +
                   "  .-(    ).  \n" +
                   " (___.__)__) \n" +
                   "              \n" +
                   "              ";
            break;
        case 'light-rain':
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    ' ' ' '  \n" +
                   "   ' ' ' '   ";
            break;
        case 'heavy-rain':
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "  ‚'‚'‚'‚'   \n" +
                   "  ‚'‚'‚'‚'   ";
            break;
        case 'light-snow':
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    *  *  *  \n" +
                   "   *  *  *   ";
            break;
        case 'heavy-snow':
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "   * * * *   \n" +
                   "  * * * *    ";
            break;
        case 'thunder':
            ascii = "     .-.     \n" +
                   "    (   ).   \n" +
                   "   (___(__)  \n" +
                   "    ⚡⚡⚡    \n" +
                   "   ⚡⚡⚡     ";
            break;
        case 'fog':
        case 'mist':
            ascii = " _ _ _ _ _  \n" +
                   "  _ _ _ _ _  \n" +
                   " _ _ _ _ _   \n" +
                   "  _ _ _ _ _  \n" +
                   " _ _ _ _ _   ";
            break;
        case 'haze':
            ascii = "     \\   /   \n" +
                   "      .-.     \n" +
                   "   –– (   ) ––\n" +
                   "      `-'     \n" +
                   "     /   \\    ";
            break;
        default:
            ascii = "    \\   /    \n" +
                   "     .-.     \n" +
                   "  ── (   ) ──\n" +
                   "     `-'     \n" +
                   "    /   \\    ";
    }
    
    return ascii;
}

// Function to display a sample weather forecast
function displaySampleForecast() {
    console.log("Weather report: City of Rochester\n");
    
    // Current weather - improve spacing to match sample
    console.log(getWeatherAscii('partly-cloudy'));
    console.log(" 2(-1) °C");
    console.log(" ↘ 9 km/h");
    console.log(" 10 km");
    console.log(" 0.3 mm");
    
    // Separator line
    console.log("\n" + "─".repeat(104) + "\n");
    
    // Date header with box around it, aligned with borders
    const dateHeader = "Thu 27 Feb";
    drawBoxedDateHeader(dateHeader);
    
    // Table with properly aligned headers and content
    drawTableHeaders();
    
    // Weather conditions row
    console.log("|" + formatCell("Light Rain") + 
                "|" + formatCell("Light Rain") + 
                "|" + formatCell("Clouds") + 
                "|" + formatCell("Light Rain") + "|");
    
    // ASCII art for each period
    const morningArt = getWeatherAscii('light-rain').split('\n');
    const noonArt = getWeatherAscii('light-rain').split('\n');
    const eveningArt = getWeatherAscii('cloudy').split('\n');
    const nightArt = getWeatherAscii('light-rain').split('\n');
    
    for (let i = 0; i < 5; i++) {
        console.log("|" + formatCell(morningArt[i] || '') + 
                    "|" + formatCell(noonArt[i] || '') + 
                    "|" + formatCell(eveningArt[i] || '') + 
                    "|" + formatCell(nightArt[i] || '') + "|");
    }
    
    // Temperature row
    console.log("|" + formatCell("2(0) °C") + 
                "|" + formatCell("4(-1) °C") + 
                "|" + formatCell("2(-3) °C") + 
                "|" + formatCell("2(-1) °C") + "|");
    
    // Wind row
    console.log("|" + formatCell("↑ 7-12 km/h") + 
                "|" + formatCell("→ 26-31 km/h") + 
                "|" + formatCell("→ 21-26 km/h") + 
                "|" + formatCell("↘ 9-14 km/h") + "|");
    
    // Visibility row
    console.log("|" + formatCell("10 km") + 
                "|" + formatCell("4 km") + 
                "|" + formatCell("10 km") + 
                "|" + formatCell("10 km") + "|");
    
    // Precipitation row
    console.log("|" + formatCell("0.4 mm | 71%") + 
                "|" + formatCell("1 mm | 100%") + 
                "|" + formatCell("0 mm | 0%") + 
                "|" + formatCell("0.3 mm | 57%") + "|");
    
    // Add bottom border to complete the box
    drawBottomBorder();
    
    // Separator between days
    console.log("\n");
    
    // Second day date header with box
    const dateHeader2 = "Fri 28 Feb";
    drawBoxedDateHeader(dateHeader2);
    
    // Table headers aligned with content
    drawTableHeaders();
    
    // Weather conditions row
    console.log("|" + formatCell("Cloudy") + 
                "|" + formatCell("Clouds") + 
                "|" + formatCell("Snow") + 
                "|" + formatCell("Light Snow") + "|");
    
    // ASCII art for each period
    const morningArt2 = getWeatherAscii('cloudy').split('\n');
    const noonArt2 = getWeatherAscii('cloudy').split('\n');
    const eveningArt2 = getWeatherAscii('heavy-snow').split('\n');
    const nightArt2 = getWeatherAscii('light-snow').split('\n');
    
    for (let i = 0; i < 5; i++) {
        console.log("|" + formatCell(morningArt2[i] || '') + 
                    "|" + formatCell(noonArt2[i] || '') + 
                    "|" + formatCell(eveningArt2[i] || '') + 
                    "|" + formatCell(nightArt2[i] || '') + "|");
    }
    
    // Temperature row
    console.log("|" + formatCell("-5(-11) °C") + 
                "|" + formatCell("-1(-4) °C") + 
                "|" + formatCell("0(-4) °C") + 
                "|" + formatCell("0(-6) °C") + "|");
    
    // Wind row
    console.log("|" + formatCell("↗ 20-25 km/h") + 
                "|" + formatCell("↗ 7-12 km/h") + 
                "|" + formatCell("↗ 14-19 km/h") + 
                "|" + formatCell("↗ 28-33 km/h") + "|");
    
    // Visibility row
    console.log("|" + formatCell("10 km") + 
                "|" + formatCell("10 km") + 
                "|" + formatCell("3 km") + 
                "|" + formatCell("10 km") + "|");
    
    // Precipitation row
    console.log("|" + formatCell("0 mm | 0%") + 
                "|" + formatCell("0 mm | 0%") + 
                "|" + formatCell("1.9 mm | 100%") + 
                "|" + formatCell("0.1 mm | 20%") + "|");
    
    // Add bottom border to complete the box
    drawBottomBorder();
    
    // Separator between days
    console.log("\n");
    
    // Third day date header with box
    const dateHeader3 = "Sat 1 Mar";
    drawBoxedDateHeader(dateHeader3);
    
    // Table headers aligned with content
    drawTableHeaders();
    
    // Weather conditions row
    console.log("|" + formatCell("Cloudy") + 
                "|" + formatCell("Clouds") + 
                "|" + formatCell("Light Snow") + 
                "|" + formatCell("Light Rain") + "|");
    
    // Bottom border
    drawBottomBorder();
    
    // Location footer
    console.log("\nLocation: City of Rochester, New York, US [43.1572850,-77.6152140]\n");
}

// Helper function to format table cells with consistent width
function formatCell(content) {
    const cellWidth = 25;
    const paddedContent = ' ' + content; // Add a space for better readability
    const remainingSpace = cellWidth - paddedContent.length;
    return paddedContent + ' '.repeat(Math.max(0, remainingSpace));
}

// Helper function to draw table headers aligned with content
function drawTableHeaders() {
    // Top border of the table
    console.log("┌" + "─".repeat(24) + "┬" + "─".repeat(24) + "┬" + "─".repeat(24) + "┬" + "─".repeat(24) + "┐");
    
    // Header row with column titles
    console.log("|" + formatCell("Morning") + 
                "|" + formatCell("Noon") + 
                "|" + formatCell("Evening") + 
                "|" + formatCell("Night") + "|");
    
    // Border below headers
    console.log("├" + "─".repeat(24) + "┼" + "─".repeat(24) + "┼" + "─".repeat(24) + "┼" + "─".repeat(24) + "┤");
}

// Helper function to draw the boxed date header aligned with borders
function drawBoxedDateHeader(dateText) {
    // Calculate centering
    const totalWidth = 102; // 4 columns of 25 chars + 3 separator chars - 1 char adjustment
    const padding = Math.floor((totalWidth - dateText.length) / 2);
    
    // Draw top of the box
    console.log("┌" + "─".repeat(totalWidth) + "┐");
    
    // Draw the date with centering
    console.log("|" + " ".repeat(padding) + dateText + " ".repeat(totalWidth - padding - dateText.length) + "|");
    
    // Draw bottom of the box
    console.log("└" + "─".repeat(totalWidth) + "┘");
}

// Helper function to draw the bottom border of the table
function drawBottomBorder() {
    console.log("└" + "─".repeat(24) + "┴" + "─".repeat(24) + "┴" + "─".repeat(24) + "┴" + "─".repeat(24) + "┘");
}

// Run the sample forecast
displaySampleForecast(); 