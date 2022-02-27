import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}))

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState()

  useEffect(() => {
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark'
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: "center"}}>
        <Typography
        variant="h4"
        style={{margin: 18, fontfamily: "Montserrat"}}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField 
        variant='outlined'
        onChange={(event) => setSearch(event.target.value)}
        label="Search For a Crypto Currency" 
        style={{marginBottom: 20, width: "100%" }} />
        <TableContainer>
          { loading ? (
            <LinearProgress style={{backgroundColor: "gold"}} />
          ) : (
            <Table>
              <TableHead style={{backgroundColor: "#eebc1d"}}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell 
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat"
                      }}
                      key={head}
                      align={head === "Coin" ? " " : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                      >
                        <TableCell 
                        component="th" 
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                        >
                          <img 
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{marginBottom: 10}} 
                          />
                          <div style={{display: "flex", flexDirection: "column"}}
                          >
                            <span 
                            style={{
                              textTransform: "uppercase",
                              fontsize: 22
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{color: "darkgrey"}}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                            {symbol} {" "}
                            {numberWithCommas(row.current_price.toFixed())}
                        </TableCell>
                        <TableCell 
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                        >
                          {profit && "+"} {row.price_change_percentage_24h?.toFixed(2)}%
                        </TableCell>
                        <TableCell align='right'>
                        {symbol} {" "}
                            {numberWithCommas(row.market_cap.toString().slice(0, -6)
                            )}M
                        </TableCell>
                      </TableRow>  
                    )
                  })
                }
              </TableBody>
            </Table>
          )
          }
        </TableContainer>
        <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ul: classes.pagination}}
        count={Number(handleSearch()?.length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
        />
      </Container>
    </ThemeProvider>
  )
};

export default CoinsTable;
