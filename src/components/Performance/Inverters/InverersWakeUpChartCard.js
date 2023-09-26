import { Card, Grid, Switch, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import React, { useState, useEffect } from 'react'
import InvertersWakeUpChart from './InvertersWakeUpChart';
import InvertersWakeUpChartSingle from './InvertersWakeUpChartSingle';

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

  export default function InverersWakeUpChartCard({barChartDataParent, siteName, isSingleDay}) {
    const classes = useStyles();

    // const applyColors = (data) => {
    //     let highestRankIndex = 0;
    //     let highestRank = null;
    //     data.forEach((element, index) => {
    //     if (index === 0) {
    //         highestRank = element.Rank;
    //     }
    //     if (element.Rank < highestRank) {
    //         highestRank = element.Rank
    //         highestRankIndex = index
    //     }
    //     })

    //     let lowestRankIndex = 0;
    //     let lowestRank = null;
    //     data.forEach((element, index) => {
    //     if (index === 0) {
    //         lowestRank = element.Rank;
    //     }
    //     if (element.Rank > lowestRank) {
    //         lowestRank = element.Rank
    //         lowestRankIndex = index
    //     }
    //     })

    //     let dataWithColors = data.map((element, index) => {
    //         if (index === highestRankIndex) {
    //           return { ...element, color: '#48C9B0'}
    //         } else if (index === lowestRankIndex) {
    //           return { ...element, color: '#E74C3C'}
    //         } else {
    //           return { ...element, color: '#5DADE2'}
    //         }
    //       })
      
    //       return dataWithColors;
    // }

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

    const [barChartData, setBarChartData] = useState();

    useEffect(() => {
        if (barChartDataParent) {
            setBarChartData(applyColors(barChartDataParent))
        }
    }, [barChartDataParent])

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
              prevState.sort((a, b) => parseFloat(b.rank) - parseFloat(a.rank)));
            break;
          case 'asc':
            setBarChartData(prevState => 
              prevState.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank)));
            break;
          default:
            setBarChartData(prevState => 
              prevState.sort((a, b) => parseFloat(b.rank) - parseFloat(a.rank)));
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
                <Typography color='textSecondary' variant='h6'>{siteName}</Typography>
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
        {barChartData && (isSingleDay ? <InvertersWakeUpChart
          chartData={barChartData}
          enableScroll={enableBarChartScroll}
          siteName={siteName}
        /> : <InvertersWakeUpChartSingle
        chartData={barChartData}
        enableScroll={enableBarChartScroll}
        siteName={siteName}
      />)}
        
      </Card>
    )
}