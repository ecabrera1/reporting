import * as d3 from 'd3';

//Use local file
// import sampleData from './data.json';
// const data = sampleData;

//use URL call
const url = 'http://localhost:3000/data.json';
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element) {
    const rep = this;
    rep.svg = d3.select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    rep.svg.append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('The world\'s tallest ment')

    rep.svg.append('text')
      .attr('x', - (HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Height in cm')
      .attr('transform', 'rotate(-90)')

    rep.xAxisGroup = rep.svg.append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);

    rep.yAxisGroup = rep.svg.append('g');

    d3.json(url).then(something => {
      //use Local storage
      rep.data = JSON.parse(window.localStorage.getItem('dataSample'));
      rep.update();
    })
  }
  update() {
    const rep = this;
    const y = d3.scaleLinear()
      .domain([
        d3.min(rep.data, d => d.height) * 0.95,
        d3.max(rep.data, d => d.height)
      ])
      .range([HEIGHT, 0])

    const x = d3.scaleBand()
      .domain(rep.data.map(n => n.name))
      .range([0, WIDTH])
      .padding(0.4)

    const xAxisCall = d3.axisBottom(x)
    rep.xAxisGroup.call(xAxisCall)

    const yAxisCall = d3.axisLeft(y)
    rep.yAxisGroup.call(yAxisCall);


      const rects = rep.svg.selectAll("rect")
      .data(rep.data)

    rects.enter().append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.height))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.height))
      .attr('fill', 'grey')
  }
}

export default D3Chart;