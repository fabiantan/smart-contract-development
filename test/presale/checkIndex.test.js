const { BN, time, expectRevert} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LoaToken = artifacts.require('LoaToken');
const LoaPresale = artifacts.require('LoaPresale');

contract('payable', function (accounts) {
  const [
    owner,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
    otherAddress
  ] = accounts;

  const preSaleStartTime = 1637424000
  const preSaleEndTime = 1637510400
  const distributeStartTime = 1_639_267_200

  before(async function () {
    this.loaToken = await LoaToken.new();
    this.loaPresale = await LoaPresale.new(this.loaToken.address)
    await this.loaToken.setPreSaleContractNotYetSet(this.loaPresale.address);

    await this.loaPresale.addDepositAddress(
        [address1, address2, address3, address4, address5, address6, address7, address8],
        { from: owner, value: '0', gas: '5000000' });

    // Time increase to a second after Presale start
    await time.increaseTo(preSaleStartTime + 1)

    await this.loaPresale.sendTransaction({
      from: address1,
      to : this.loaPresale.address,
      value: web3.utils.toWei('10', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address2,
      to : this.loaPresale.address,
      value: web3.utils.toWei('20', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address3,
      to : this.loaPresale.address,
      value: web3.utils.toWei('30', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address4,
      to : this.loaPresale.address,
      value: web3.utils.toWei('40', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address5,
      to : this.loaPresale.address,
      value: web3.utils.toWei('50', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address6,
      to : this.loaPresale.address,
      value: web3.utils.toWei('60', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address7,
      to : this.loaPresale.address,
      value: web3.utils.toWei('70', 'ether')
    })

    await this.loaPresale.sendTransaction({
      from: address8,
      to : this.loaPresale.address,
      value: web3.utils.toWei('80', 'ether')
    })
  });

  it('Should return BNB', async function () {
    {
      const index = await this.loaPresale._depositAddressesAwardedErc20CoinIndex(address1);
      console.log(index.toString()) // 0
    }

    await time.increaseTo(preSaleEndTime + 1)
    await this.loaPresale.returnBNB(8, { from: owner, value: '0', gas: '5000000' });

    await time.increaseTo(distributeStartTime + 1)
    await this.loaPresale.distribute({ from: address1, value: '0', gas: '5000000' });

    {
      const index = await this.loaPresale._depositAddressesAwardedErc20CoinIndex(address1);
      console.log(index.toString()) // 1
    }
  });
});
