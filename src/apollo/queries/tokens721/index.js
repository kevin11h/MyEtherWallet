import {
  getOwnersERC721Balances,
  getOwnersERC721Tokens
} from './tokens.graphql';
import ethImg from '@/assets/images/networks/eth.svg';
import { Toast, ERROR } from '@/components/toast';
import store from '@/store';
import BigNumber from 'bignumber.js';

const ETH_ID = 'ethereum';
export default class Tokenslist {
  constructor(apollo) {
    this.apollo = apollo;
  }
  getOwnersERC721TokensBalances(hash) {
    // if (!this.tokensData || this.tokensData.length === 0) {
    //   this.getLatestPrices();
    // }
    return this.apollo
      .query({
        query: getOwnersERC721Balances,
        variables: {
          hash: hash
        }
      })
      .then(response => {
        if (response && response.data) {
          // return response.data;
          return this.formatOwnersERC721TokenCount(response.data, hash);
        }
      })
      .catch(error => {
        return Toast(error.message, {}, ERROR);
      });
  }
  formatOwnersERC721TokenCount(tokens, address) {
    const holder = {};
    // console.log(tokens); // todo remove dev item
    holder.tokenContracts = tokens.getOwnersERC721Balances;
    holder.address = address;
    holder.tokenContracts.map(item => {
      return {
        contractAddresses: [item.tokenInfo.contract],
        contractIdAddress: item.tokenInfo.contract,
        contracts: [item.tokenInfo.contract],
        name: item.tokenInfo.name,
        owned_asset_count: BigNumber(item.balance).toFixed(0),
        retrievedTo: 0,
        tokens: []
      };
    });
    return holder;
  }
  getOwnersERC721Tokens(owner, contract, details) {
    // if (!this.tokensData || this.tokensData.length === 0) {
    //   this.getLatestPrices();
    // }
    return this.apollo
      .query({
        query: getOwnersERC721Tokens,
        variables: {
          owner: owner,
          contract: contract
        }
      })
      .then(response => {
        if (response && response.data) {
          // return response.data;
          return this.formatOwnersERC721Tokens(
            response.data,
            contract,
            details
          );
        }
      })
      .catch(error => {
        return Toast(error.message, {}, ERROR);
      });
  }
  formatOwnersERC721Tokens(tokens, contract) {
    // console.log(tokens); // todo remove dev item
    // const isZeroPadded = id => {
    //   // console.log(id); // todo remove dev item
    //   const val = id.slice(2);
    //   let count = 1;
    //   let newString = '';
    //   for (let i = 0; i < val.length; i++) {
    //     if (val[i] !== '0') {
    //       newString = newString + val[i];
    //     } else {
    //       count++;
    //     }
    //   }
    //   if (Math.round(newString.length / count) < 1) {
    //     console.log(newString, count, Math.round(newString.length / count)); // todo remove dev item
    //     return BigNumber(id).toFixed(0)
    //   }
    //   return id;
    // };
    try {
      return {
        contractIdAddress: contract,
        tokens: tokens.getOwnersERC721Tokens.tokens.map(item => {
          isZeroPadded(item.token)
          return {
            description: item.tokenInfo.name,
            token_id: BigNumber(item.token).toFixed(0),
            name: item.tokenInfo.name,
            contract: item.tokenInfo.contract
          };
        })
      };
    } catch (e) {
      console.log(e); // todo remove dev item
      return {
        contractIdAddress: contract,
        tokens: []
      };
    }
  }
}
