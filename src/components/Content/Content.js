import React from 'react';
import { Typography } from '@material-ui/core';
import './Content.css';

const Content = () => {
  return (
    <div className="contentContainer">
      <Typography variant="h5" component="h5">
        What is a Liquidity Pool?
      </Typography>
      <Typography variant="body1" component="p">
        Liquidity is how easily you can turn your cryptocurrency token
        into another token or cash. Generally speaking, people prefer
        more liquidity so they can use their tokens in many ways, and
        realize their value.
      </Typography>
      <Typography variant="h6" component="h6">
        What is a pool of liquidity?
      </Typography>
      <Typography variant="body1" component="p">
        A pool of liquidity is a smart contract where you deposit your
        cryptocurrency token. People depoosit into these smart
        contracts because it helps the token be paired with other
        tokens, create more liquidity (which is generally favorable),
        and earns rewards for the depositors.
      </Typography>
      <Typography variant="h6" component="h6">
        What is a liquidity provider?
      </Typography>
      <Typography variant="body1" component="p">
        A liquidity provider (LP) is an individual who deposits their
        tokens into a liquidity pool.
      </Typography>
      <Typography variant="body1" component="p">
        .....
      </Typography>
    </div>
  );
};

export default Content;
