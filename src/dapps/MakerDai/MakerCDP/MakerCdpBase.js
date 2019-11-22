import BigNumber from 'bignumber.js';
import {
  maxPethDraw,
  maxEthDraw,
  maxDai,
  getMakerCurrencies,
  displayFixedValue,
  calcLiquidationPrice
} from '../makerHelpers';

import * as daiMath from './daiMath';

const toBigNumber = num => {
  return new BigNumber(num);
};

// Basically just to hold the various getters and static methods to somewhat de-clutter the implementation
export default class MakerCdpBase {
  constructor(cdpId, web3, services, sysVars) {
    if (cdpId === null) {
      this.cdpId = cdpId;
    } else {
      this.cdpId = typeof cdpId !== 'number' ? cdpId.id : cdpId;
    }
    this.cdpIdFull = cdpId;
    this.cdp = {};
    this.web3 = web3 || {};
    this.ready = false;
    this.doUpdate = 0;
    this.cdps = [];
    this.noProxy = sysVars.noProxy || false;
    this.sysVars = sysVars; // todo make sure this doesn't bring in the issue with vue walking the tree and breaking things
    this.cdpType = this.cdpId
      ? sysVars.cdpsWithType[this.cdpId]
      : 'ETH';
    this.services = services || null;
    this.needsUpdate = false;
    this.closing = false;
    this.opening = false;
    this.migrated = false;
    this.migrateCdpActive = false;
    this.migrateCdpStage = 0;
    this.cdpTypeObject = this.services.mcdCurrencies[this.cdpCollateralType];

    this._liqPrice = toBigNumber(0);
    this.isSafe = false;
    // this.debtValue = toBigNumber(0);
    this._collatRatio = 0;
    this.ethCollateral = toBigNumber(0);
    this.pethCollateral = toBigNumber(0);
    this._usdCollateral = toBigNumber(0);
    this._governanceFee = toBigNumber(12345);

    this.override = {};
    this.afterInitialization = false;
      }

  // Getters
  get cdpCollateralType() {
    return this.cdpType.replace(/-[A-Z]/, '');
  }

  get currentAddress() {
    return this.services.address;
  }

  get currentPrice() {
    return this.mcdCurrencies[this.cdpCollateralType].price._amount.toString();
  }

  get collatRatio() {
    return this._collatRatio;
  }

  get collateralAmount() {
    if(this.override['collateralAmount']){
      return this.override['collateralAmount'].toBigNumber();
    }
    return this.cdp.collateralAmount.toBigNumber();
  }

  get collateralAvailable() {
    return this.cdp.collateralAvailable;
  }

  get collateralStatus() {
    if (this.collateralizationRatio.gte(this.liquidationRatio.plus(0.5))) {
      return 'green';
    } else if (
      this.collateralizationRatio.gte(this.liquidationRatio.plus(0.25)) &&
      this.collateralizationRatio.lte(this.liquidationRatio.plus(0.5))
    ) {
      return 'orange';
    }
    return 'red';
  }

  get collateralValue() {
    if(this.override['collateralValue']){
      return this.override['collateralValue'].toBigNumber();
    }
    return this.cdp.collateralValue.toBigNumber();
  }

  get collateralizationRatio() {
    if(this.override['collateralizationRatio']){
      return this.override['collateralizationRatio'].toBigNumber();
    }
    return this.cdp.collateralizationRatio.toBigNumber();
  }

  get cdpService() {
    return this.services._cdpService;
  }

  get daiToken() {
    return this.services._daiToken;
  }

  get daiBalance() {
    return this.services.daiBalance;
  }

  get debtValue() {
    if (this.cdp) {
      if(this.override['debtValue']){
        return this.override['debtValue'].toBigNumber();
      }
      return toBigNumber(toBigNumber(this.cdp.debtValue._amount).toFixed(18));
    }
    return toBigNumber(0);
  }

  get ethPrice() {
    return this.services.ethPrice;
  }

  get ethCollateralNum() {
    return this.ethCollateral.toNumber();
  }

  getCollateralIlk() {
    return this.cdpType;
  }

  get getTokens() {
    return this.sysVars.tokens;
  }

  get governanceFeeOwed() {
    return this._governanceFee;
  }

  get hasProxy() {
    return this.services.hasProxy;
  }

  get liquidationPenalty() {
    if (this.cdp) {
      return toBigNumber(this.cdp.type.liquidationPenalty);
    }
    return toBigNumber(0);
  }

  get liquidationRatio() {
    if (Object.keys(this.cdp).length > 0) {
      return toBigNumber(this.cdp.type.liquidationRatio._amount);
    }
    return toBigNumber(this.cdpTypeObject.liquidationRatio._amount);
  }


  get liquidationPrice() {
    return calcLiquidationPrice(
      this.collateralAmount,
      this.debtValue,
      this.currentPrice,
      this.liquidationRatio
    );
  }

  get mcdCurrencies() {
    return this.services.mcdCurrencies;
  }

  get mkrToken() {
    return this.services._mkrToken;
  }

  get mkrBalance() {
    return this.services.mkrBalance;
  }

  get mcdManager() {
    return this.services._mcdManager;
  }

  get minSafeCollateralAmount() {
    const rawType = this.mcdManager.get('mcd:cdpType').getCdpType(null, this.cdpType);
    console.log(this.debtValue); // todo remove dev item
    console.log(rawType.price); // todo remove dev item
    console.log(rawType.liquidationRatio); // todo remove dev item
    console.log(daiMath.minSafeCollateralAmount(this.debtValue, rawType.liquidationRatio, rawType.price)); // todo remove dev item
    // return daiMath.minSafeCollateralAmount(this.debtValue, rawType.liquidationRatio, rawType.price);
    return this.cdp.minSafeCollateralAmount.toBigNumber();
  }

  get minEth() {
    return this.services.minEth;
  }

  get needToFinishMigrating() {
    return this._proxyAddress && this.noProxy;
  }

  get proxyService() {
    return this.services._proxyService;
  }

  get proxyAddress() {
    return this.services._proxyAddress;
  }

  get proxyAllowanceDai() {
    return this.services.proxyAllowances['DAI'];
  }

  get proxyAllowanceMkr() {
    return this.services.proxyAllowances['MKR'];
  }

  get pethMin() {
    return this.services.pethMin;
  }

  get pethPrice() {
    return this.services._pethPrice;
  }

  get stabilityFee() {
    if (this.cdp) {
      return toBigNumber(this.cdp.type.annualStabilityFee);
    }
    return toBigNumber(0);
  }

  get dustValues(){
    return this.services.dustValues;
  }

  get wethToPethRatio() {
    return this.services.wethToPethRatio;
  }

  get usdCollateral() {
    return this.toUSD(this.ethCollateral);
  }

  get zeroDebt() {
    return toBigNumber(this.debtValue).eq(0);
  }

  // Calculations

  get maxDai() {
    if (
      this.currentPrice &&
      this.collateralAmount &&
      this.liquidationRatio &&
      this.debtValue
    ) {
      return maxDai(
        this.currentPrice,
        this.collateralAmount,
        this.liquidationRatio.plus(0.001),
        this.debtValue
      );
    }
    return toBigNumber(0);
  }

  get maxEthDraw() {
    return this.collateralAmount.minus(this.minSafeCollateralAmount);
  }

  get maxPethDraw() {
    if (this.pethPrice && this.pethCollateral && this.liquidationRatio) {
      if (this.zeroDebt) {
        return maxPethDraw(
          this.pethCollateral,
          this.liquidationRatio,
          this.debtValue,
          this.pethPrice,
          this.pethMin.times(0)
        );
      }
      return maxPethDraw(
        this.pethCollateral,
        this.liquidationRatio,
        this.debtValue,
        this.pethPrice
      );
    }
    return toBigNumber(0);
  }

  get maxDaiDraw() {
    const tl = toBigNumber(this.currentPrice).times(
      toBigNumber(this.collateralAmount)
    );
    const tr = toBigNumber(this.debtValue).times(
      toBigNumber(this.liquidationRatio)
    );
    return tl.minus(tr).div(toBigNumber(this.currentPrice));
  }

  get maxUsdDraw() {
    return this.toUSD(
      this.collateralAmount.minus(this.minSafeCollateralAmount)
    );
  }

  // Utility Helpers
  toUSD(amount) {
    const toUsd = toBigNumber(this.currentPrice).times(amount);

    if (toUsd.lt(0)) {
      return toBigNumber(0);
    }
    return toUsd.toFixed(2, BigNumber.ROUND_DOWN);
  }

  // Static Helpers

  static toNumber(val) {
    if (BigNumber.isBigNumber(val)) {
      return val.toNumber();
    }
    return toBigNumber(val).toNumber();
  }

  static displayPercentValue(raw) {
    if (!BigNumber.isBigNumber(raw)) raw = new BigNumber(raw);
    return raw.times(100).toString();
  }

  static displayFixedValue(raw, decimals = 3, round = true) {
    return displayFixedValue(raw, decimals, round);
  }
}
