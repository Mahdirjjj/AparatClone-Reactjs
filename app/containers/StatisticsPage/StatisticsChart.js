import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, FormControl, Select, MenuItem } from '@material-ui/core';
import { Line as LineChart } from 'react-chartjs-2';

const StatisticsChartWrapper = styled(Grid)`
  margin-top: 2em !important;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;

  .rangeSelectBox {
    width: 100px;
  }

  canvas {
    max-width: 100%;
  }
`;

function StatisticsChart({ statistics, range, disabled, handleRangeChange }) {
  const data = {
    labels: Object.keys(statistics).map(
      d => new Date(d).toLocaleString('fa-IR').split('،')[0],
    ),
    datasets: [
      {
        data: Object.values(statistics),
        label: 'بازدید های انجام شده از این ودیو',
        fill: false,
        borderColor: '#05a3e8',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 1,
            max: Math.max(...Object.values(statistics)) + 1,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return (
    <StatisticsChartWrapper container spacing={2} wrap="wrap">
      <Grid item xs={12}>
        <FormControl>
          <Select
            className="rangeSelectBox"
            value={range}
            disabled={disabled}
            onChange={e => handleRangeChange(e.target.value)}
          >
            <MenuItem value={7}>هفته اخیر</MenuItem>
            <MenuItem value={30}>ماه اخیر</MenuItem>
            <MenuItem value={90}>سه ماه اخیر</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <LineChart data={data} options={options} />
      </Grid>
    </StatisticsChartWrapper>
  );
}

StatisticsChart.propTypes = {
  statistics: PropTypes.object.isRequired,
  range: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  handleRangeChange: PropTypes.func.isRequired,
};

StatisticsChart.defaultProps = {
  disabled: false,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withStore = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(StatisticsChart);
