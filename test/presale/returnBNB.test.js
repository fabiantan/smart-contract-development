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

        let totalDepositAmount = await this.loaPresale._totalAddressesDepositAmount();
        expect(totalDepositAmount).to.be.bignumber.equal(new BN('360000000000000000000'));

        const address1BalanceBefore = await web3.eth.getBalance(address1)
        const address2BalanceBefore = await web3.eth.getBalance(address2)
        const address3BalanceBefore = await web3.eth.getBalance(address3)
        const address4BalanceBefore = await web3.eth.getBalance(address4)
        const address5BalanceBefore = await web3.eth.getBalance(address5)
        const address6BalanceBefore = await web3.eth.getBalance(address6)
        const address7BalanceBefore = await web3.eth.getBalance(address7)
        const address8BalanceBefore = await web3.eth.getBalance(address8)

        console.log(address1BalanceBefore)
        console.log(address2BalanceBefore)
        console.log(address3BalanceBefore)
        console.log(address4BalanceBefore)
        console.log(address5BalanceBefore)
        console.log(address6BalanceBefore)
        console.log(address7BalanceBefore)
        console.log(address8BalanceBefore)

        await this.loaPresale.returnBNB(8, { from: owner, value: '0', gas: '5000000' });

        const address1BalanceAfter = await web3.eth.getBalance(address1)
        const address2BalanceAfter = await web3.eth.getBalance(address2)
        const address3BalanceAfter = await web3.eth.getBalance(address3)
        const address4BalanceAfter = await web3.eth.getBalance(address4)
        const address5BalanceAfter = await web3.eth.getBalance(address5)
        const address6BalanceAfter = await web3.eth.getBalance(address6)
        const address7BalanceAfter = await web3.eth.getBalance(address7)
        const address8BalanceAfter = await web3.eth.getBalance(address8)

        const address1BalanceFinal = address1BalanceAfter - address1BalanceBefore
        const address2BalanceFinal = address2BalanceAfter - address2BalanceBefore
        const address3BalanceFinal = address3BalanceAfter - address3BalanceBefore
        const address4BalanceFinal = address4BalanceAfter - address4BalanceBefore
        const address5BalanceFinal = address5BalanceAfter - address5BalanceBefore
        const address6BalanceFinal = address6BalanceAfter - address6BalanceBefore
        const address7BalanceFinal = address7BalanceAfter - address7BalanceBefore
        const address8BalanceFinal = address8BalanceAfter - address8BalanceBefore

        console.log(address1BalanceFinal)
        console.log(address2BalanceFinal)
        console.log(address3BalanceFinal)
        console.log(address4BalanceFinal)
        console.log(address5BalanceFinal)
        console.log(address6BalanceFinal)
        console.log(address7BalanceFinal)
        console.log(address8BalanceFinal)

        const contractBalance = await web3.eth.getBalance(this.loaPresale.address)
        console.log(contractBalance)
    });
});
