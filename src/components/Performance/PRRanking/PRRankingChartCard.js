import { Card, Grid, Switch, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import React, { useState, useEffect } from 'react'
import PeakPowerChart from './PRRankingChart';
import PeakPowerChartSingle from './PRRankingChartSingle';
import PRRankingChart from './PRRankingChart';
import PRRankingChartSingle from './PRRankingChartSingle';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    textField: {
      width: 120,
    },
    menuPaper: {
      maxHeight: 400,
    },
    formControlStyle: {
      
    },
    listItemText: {
      fontSize: '.9rem'
    }
  }));

  export default function PRRankingChartCard({isSingleDay, chartData, siteName, groupName, multiDay}) {
    const classes = useStyles();

    const [barChartData, setBarChartData] = useState();

    const applyColors = (data) => {
      let highestRankIndex = [];
      let highestRank = null;
      data.forEach((element, index) => {
      if (index === 0) {
          highestRank = Number(element.rank);
      }
      if (Number(element.rank) <= highestRank) {
          highestRank = Number(element.rank)
          highestRankIndex[index] = index;
      }
      })

      // console.log(highestRankIndex);

      let lowestRankIndex = [];
      let lowestRank = null;
      data.forEach((element, index) => {
      if (index === 0) {
          lowestRank = Number(element.rank);
      }
      if (Number(element.rank) > lowestRank) {
          lowestRank = Number(element.rank)
      }
      })

      data.forEach((element, index) => {
          if (Number(element.rank) === lowestRank) {
              lowestRankIndex[index] = index
          }
      })


      // console.log(lowestRankIndex)


      let dataWithColors = data.map((element, index) => {
          if (index === highestRankIndex[index]) {
            return { ...element, color: '#48C9B0'}
          } else if (index === lowestRankIndex[index]) {
            return { ...element, color: '#E74C3C'}
          } else {
            return { ...element, color: '#5DADE2'}
          }
        })
    
        return dataWithColors;
  }

    useEffect(() => {
        if (chartData) {
            setBarChartData(applyColors(chartData.inverters))
            // setBarChartData(chartData);
        }
    }, [chartData])

    const [enableBarChartScroll, setEnableBarChartScroll] = useState(true);

    const [sort, setSort] = useState('asc');

    const handleSortChange = (event) => {
        let value = event.target.value;
        sortElements(value);
        setSort(value);
      }

      const sortElements = (value) => {
        switch (value) {
          case 'desc':
            setBarChartData(prevState => 
              prevState.sort((a, b) => parseFloat(b.Rank) - parseFloat(a.Rank)));
            break;
          case 'asc':
            setBarChartData(prevState => 
              prevState.sort((a, b) => parseFloat(a.Rank) - parseFloat(b.Rank)));
            break;
          default:
            setBarChartData(prevState => 
              prevState.sort((a, b) => parseFloat(b.Rank) - parseFloat(a.Rank)));
        }
      }

    return (
        <Card
        elevation={4}
        style={{
          width: '100%',
          height: '410px',
          marginTop: '1rem',
          paddingTop: '.5rem',
          paddingBottom: '3.5rem',
        }}
      >
        <Grid
          container
          justify='space-between'
          alignItems='center'
          style={{ paddingInline: '2rem', marginBottom: '.5rem' }}
        >
            <Grid item>
                <Typography color='textSecondary' variant='h6'>{siteName}&ensp;{groupName}</Typography>
            </Grid>
          
          <Grid item>
              <Grid container alignItems='center'  >
                  <Grid item style={{marginRight: '1rem'}}>
                  <span>Scroll:</span>
            <Switch
              checked={enableBarChartScroll}
              onChange={() =>
                setEnableBarChartScroll((prevState) => !prevState)
              }
              color='primary'
              name='scrollSwitch'
            
            />
                  </Grid>
              
          <Grid item>
              <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                  <span>Sort: </span>
                  </Grid>
                  <Grid item>
                  <FormControl className={classes.formControlStyle}>
                {/* <InputLabel id='sort-select-label'>Sort</InputLabel> */}
                
                <Select
                  labelId='sort-select-label'
                  id='sort-select'
                  value={sort}
                  onChange={handleSortChange}
                  style={{fontSize: '1rem'}}
                >
                  <MenuItem value={'desc'}>
                    <span>Desc&ensp;</span>
                  </MenuItem>
                  <MenuItem value={'asc'}>
                    <span>Asc&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
                  </Grid>
              </Grid>
          
          
          </Grid>
          </Grid>
          </Grid>
          
        </Grid>
        {barChartData && <PRRankingChartSingle
        chartData={barChartData}
        enableScroll={enableBarChartScroll}
        siteName={siteName}
        multiDay={multiDay}
      />}
        
      </Card>
    )
}