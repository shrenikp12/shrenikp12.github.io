// Function to draw the bar chart
function drawBarChart(data) {
  const margin = { top: 150, right: 150, bottom: 80, left: 80 };
  const width = 1000 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Create an SVG element
  const svg = d3
    .select("#cause-chart") // Replace with the ID of the container element in your HTML
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)


    

  // Define color scale for different causes
  const colorScale = d3
    .scaleOrdinal()
    .domain(["Suicide", "Homicide", "Accidental", "Undetermined"])
    .range(["#ff7f0e", "#1f77b4", "#2ca02c", "#d62728"]);

  // Set x-scale for causes
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.cause))
    .range([0, width])
    .padding(0.2);

  // Set y-scale for number of deaths
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0]);

  // Draw x-axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Draw y-axis
  svg
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

   // Draw bars
// Draw bars
svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.cause))
  .attr("y", d => yScale(d.count))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(d.count))
  .attr("fill", d => colorScale(d.cause))
  .on("mouseover", (event, d) => {
    // Show annotation on mouseover
    const bar = d3.select(event.currentTarget);
    const barX = parseFloat(bar.attr("x")) + xScale.bandwidth() / 2;
    const barY = parseFloat(bar.attr("y"));
    const barHeight = parseFloat(bar.attr("height"));
    svg
      .append("text")
      .attr("class", "annotation")
      .attr("x", barX)
      .attr("y", barY - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px") 
      .attr("fill", colorScale(d.cause))
      .text(`Cause: ${d.cause} | Count: ${d.count}`);
  })
  .on("mouseout", () => {
    // Remove annotation on mouseout
    svg.select(".annotation").remove();
  });

const radius = Math.min(width, height) / 2;
  // Add annotations to the pie chart
const annotationRadius = radius + 20; // Adjust the radius for the annotations

// Create a group element for the annotations


// Append text elements for the annotations



  const pieSvg = d3
    .select("#pie-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Create a pie layout
  const pie = d3
    .pie()
    .value(d => d.count)
    .sort(null);

    

    const pieData = pie(data);

    
  // Generate the pie chart data


  // Define color scale for different causes
  const pieColorScale = d3
    .scaleOrdinal()
    .domain(data.map(d => d.cause))
    .range(["#ff7f0e", "#1f77b4", "#2ca02c", "#d62728"]);

  // Set inner and outer radius for the pie chart
  const innerRadius = 0;
  const outerRadius = radius - 20;

  // Create arc generator
  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  // Draw pie slices
  const slices = pieSvg
    .selectAll("path")
    
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => pieColorScale(d.data.cause))
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .on("mouseover", (event, d) => {
      // Show annotation on mouseover
      const total = d3.sum(pieData.map(d => d.data.count));
  const percentage = ((d.data.count / total) * 100).toFixed(2);
      const [x, y] = arc.centroid(d);
      pieSvg
        .append("text")
        .attr("class", "annotation")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(`Cause: ${d.data.cause} | Percentage: ${percentage}%`);
    })
    .on("mouseout", () => {
      // Remove annotation on mouseout
      pieSvg.select(".annotation").remove();
    });



const arrowPosition = { x: 100, y: 350 };
const arrowPosition2 = { x: 300, y: 350 }; // Adjust the coordinates as needed
const textPosition = { x: 203, y: 125 };

// Create the arrow using SVG <path> element
const arrowPath = `M${arrowPosition.x},${arrowPosition.y} L${textPosition.x},${textPosition.y}`;
const arrowPath2 = `M${arrowPosition2.x},${arrowPosition2.y} L${textPosition.x+30},${textPosition.y}`;
svg
  .append("path")
  .attr("class", "arrow")
  .attr("d", arrowPath);
  
  svg
  .append("path")
  .attr("class", "arrow")
  .attr("d", arrowPath2);

// Add the text annotation
svg
  .append("text")
  .attr("x", textPosition.x)
  .attr("y", textPosition.y)
  .text("Gun-related suicides outpaced gun-related homicides by 100,000+ over the past 15 years.");

  svg
  .append("text")
  .attr("x", 260)
  .attr("y", 145)
  .text("However, suicides are given much less attention than homicides in the media.");


  const arrowPiePosition = { x: -200, y: 50 };
  const arrowPiePosition2 = { x: 200, y: 10 }; // Adjust the coordinates as needed
  const textPiePosition = { x: -100, y: -270 };
  
  // Create the arrow using SVG <path> element
  const arrowPiePath = `M${arrowPiePosition.x},${arrowPiePosition.y} L${textPiePosition.x},${textPiePosition.y}`;
  const arrowPiePath2 = `M${arrowPiePosition2.x},${arrowPiePosition2.y} L${textPiePosition.x+30},${textPiePosition.y}`;
  pieSvg
    .append("path")
    .attr("class", "arrow")
    .attr("d", arrowPiePath);
    
    pieSvg
    .append("path")
    .attr("class", "arrow")
    .attr("d", arrowPiePath2);
  
  // Add the text annotation
  pieSvg
    .append("text")
    .attr("x", textPiePosition.x)
    .attr("y", textPiePosition.y)
    .text("Combined, suicides and homicides make up over 97% of gun related deaths from 2006 to 2020.");



}

// Function to retrieve and process the data for the bar chart
async function processData() {
  const combinedData = await getCombinedData();

  // Calculate the number of deaths for each cause
  const causesData = [
    { cause: "Suicide", count: 0 },
    { cause: "Homicide", count: 0 },
    { cause: "Accidental", count: 0 },
    { cause: "Undetermined", count: 0 },
  ];

  combinedData.forEach(d => {
    if (d.intent === "Suicide") {
      causesData.find(item => item.cause === "Suicide").count++;
    } else if (d.intent === "Homicide") {
      causesData.find(item => item.cause === "Homicide").count++;
    } else if (d.intent === "Accidental") {
      causesData.find(item => item.cause === "Accidental").count++;
    } else if (d.intent === "Undetermined") {
      causesData.find(item => item.cause === "Undetermined").count++;
    }
  });

  drawBarChart(causesData);
}

// Call the processData function
processData();