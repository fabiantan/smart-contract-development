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

    before(async function () {
        this.loaToken = await LoaToken.new(otherAddress, otherAddress, otherAddress, otherAddress, otherAddress, otherAddress, otherAddress, otherAddress, otherAddress, otherAddress);
        this.loaPresale = await LoaPresale.new(this.loaToken.address)
        await this.loaToken.setPreSaleContractNotYetSet(this.loaPresale.address);
    });

    it('Should get correct variables', async function () {
        const _DEC_12_2021 = 1639267200;
        const _DEC_11_2024 = 1733875200;
        const _DEC_12_2026 = 1797033600;
        {
            const coinDistribution1 = await this.loaToken._categoriesAmountCap('Advisors1')
            const coinDistribution2 = await this.loaToken._categoriesAmountCap('Advisors2')
            const coinDistribution3 = await this.loaToken._categoriesAmountCap('Advisors3')
            const coinDistribution4 = await this.loaToken._categoriesAmountCap('Advisors4')
            const coinDistribution5 = await this.loaToken._categoriesAmountCap('Team')
            const coinDistribution6 = await this.loaToken._categoriesAmountCap('Marketing')
            const coinDistribution7 = await this.loaToken._categoriesAmountCap('EcosystemFund')
            const coinDistribution8 = await this.loaToken._categoriesAmountCap('NFTStaking')
            const coinDistribution9 = await this.loaToken._categoriesAmountCap('Staking')
            const coinDistribution10 = await this.loaToken._categoriesAmountCap('PlayToEarn')

            console.log(coinDistribution1.toString())
            console.log(coinDistribution2.toString())
            console.log(coinDistribution3.toString())
            console.log(coinDistribution4.toString())
            console.log(coinDistribution5.toString())
            console.log(coinDistribution6.toString())
            console.log(coinDistribution7.toString())
            console.log(coinDistribution8.toString())
            console.log(coinDistribution9.toString())
            console.log(coinDistribution10.toString())
        }
    });
});
