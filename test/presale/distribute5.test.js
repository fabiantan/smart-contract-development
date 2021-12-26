const { BN, time, expectRevert} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LoaToken = artifacts.require('LoaToken');
const LoaPresale = artifacts.require('LoaPresale');

const preSaleStartTime = 1637424000
const preSaleEndTime = 1637510400
const distributeStartTime = 1_639_267_200

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

  before(async function () {
    this.loaToken = await LoaToken.new();
    this.loaPresale = await LoaPresale.new(this.loaToken.address)
    await this.loaToken.setPreSaleContractNotYetSet(this.loaPresale.address);

    await this.loaPresale.addDepositAddress(
        [address1, address2, address3, address4, address5, address6, address7, address8],
        { from: owner, value: '0', gas: '5000000' });

    // Time increase to 700 second after Presale start
    await time.increaseTo(preSaleStartTime + 700)

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
    await time.increaseTo(preSaleEndTime + 50) // Set to 50 second just after presale finish
    await this.loaPresale.returnBNB(8, { from: owner, value: '0', gas: '5000000' });

    await time.increaseTo(distributeStartTime + 100 + 86400 * (1 - 1)) // Set to 1 day and 100 second just after distribute allowed
    await this.loaPresale.distribute({ from: address1, value: '0', gas: '5000000' });
    await this.loaPresale.distribute({ from: address2, value: '0', gas: '5000000' });
    await this.loaPresale.distribute({ from: address3, value: '0', gas: '5000000' });
    await this.loaPresale.distribute({ from: address4, value: '0', gas: '5000000' });

    await time.increaseTo(distributeStartTime + 100 + 86400 * (200 - 1)) // Set to last day and 100 second just after distribute allowed
    await this.loaPresale.distribute({ from: address5, value: '0', gas: '5000000' });
    await this.loaPresale.distribute({ from: address6, value: '0', gas: '5000000' });

    await time.increaseTo(distributeStartTime + 100 + 86400 * (202 - 1)) // Set to last + 2 days and 100 second just after distribute allowed
    await this.loaPresale.distribute({ from: address7, value: '0', gas: '5000000' });
    await this.loaPresale.distribute({ from: address8, value: '0', gas: '5000000' });

    const address1ERC20Balance = await this.loaToken.balanceOf(address1)
    const address2ERC20Balance = await this.loaToken.balanceOf(address2)
    const address3ERC20Balance = await this.loaToken.balanceOf(address3)
    const address4ERC20Balance = await this.loaToken.balanceOf(address4)
    const address5ERC20Balance = await this.loaToken.balanceOf(address5)
    const address6ERC20Balance = await this.loaToken.balanceOf(address6)
    const address7ERC20Balance = await this.loaToken.balanceOf(address7)
    const address8ERC20Balance = await this.loaToken.balanceOf(address8)

    console.log(address1ERC20Balance.toString())
    console.log(address2ERC20Balance.toString())
    console.log(address3ERC20Balance.toString())
    console.log(address4ERC20Balance.toString())
    console.log(address5ERC20Balance.toString())
    console.log(address6ERC20Balance.toString())
    console.log(address7ERC20Balance.toString())
    console.log(address8ERC20Balance.toString())
  });
});
