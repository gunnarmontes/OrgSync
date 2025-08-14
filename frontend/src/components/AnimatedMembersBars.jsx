// Animated horizontal bars that grow to represent "new members" counts.
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function AnimatedMembersBars({ data, width = 640, height = 240, margin = { top: 10, right: 20, bottom: 30, left: 80 } }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerH])
      .padding(0.2);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([0, innerW]);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(5))
      .call(g => g.selectAll("text").attr("font-size", 10));

    g.append("g")
      .call(d3.axisLeft(y))
      .call(g => g.selectAll("text").attr("font-size", 10));

    // Bars (start at width 0, then grow)
    const bars = g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0)
      .attr("fill", "#60a5fa"); // Tailwind blue-400

    bars.transition()
      .duration(3000)
      .ease(d3.easeCubicOut)
      .attr("width", d => x(d.value));

    // Value labels (animate with bars)
    const labels = g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", 0)
      .attr("y", d => (y(d.name) !== undefined ? y(d.name) + y.bandwidth() / 2 : 0))
      .attr("dy", "0.35em")
      .attr("fill", "#e5e7eb") 
      .attr("font-size", 11);

    labels.transition()
      .duration(3000)
      .ease(d3.easeCubicOut)
      .attr("x", d => x(d.value) + 6)
      .text(d => d.value);

  }, [data, width, height, margin]);

  return <svg ref={svgRef} className="w-full h-auto" />;
}
