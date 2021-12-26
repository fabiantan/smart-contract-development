const { BN, time, expectRevert} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LoaToken = artifacts.require('LoaToken');
const LoaPresale = artifacts.require('LoaPresale');

const firstDay = 1639267200;

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
        address9
    ] = accounts;

    before(async function () {
        this.loaToken = await LoaToken.new(address1, address2, address3, address4, address5, address6, address7, address8, address9, owner);
        this.loaPresale = await LoaPresale.new(this.loaToken.address)
        await this.loaToken.setPreSaleContractNotYetSet(this.loaPresale.address);
    });

    it('Should get correct variables', async function () {
        {
            await time.increaseTo(firstDay + 0 + 50) // First day
            await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
            const address = await this.loaToken.balanceOf(address6)
            console.log(address.toString())
        }

        {
            await time.increaseTo(firstDay + (86400 * (11 - 1)) + 50) // 11th day
            await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
            const address = await this.loaToken.balanceOf(address6)
            console.log(address.toString())
        }

        {
            await time.increaseTo(firstDay + (86400 * (51 - 1)) + 50) // 51th day
            await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
            const address = await this.loaToken.balanceOf(address6)
            console.log(address.toString())
        }

        {
            await time.increaseTo(firstDay + (86400 * (1095 - 1)) + 50) // 1095th day
            await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
            const address = await this.loaToken.balanceOf(address6)
            console.log(address.toString())
        }

        {
            await time.increaseTo(firstDay + (86400 * (1096 - 1)) + 50) // 1096th day
            await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
            const address = await this.loaToken.balanceOf(address6)
            console.log(address.toString())
        }

        // {
        //     await time.increaseTo(firstDay + (86400 * (1096 - 1)) + 50) // 2000th day
        //     await this.loaToken.dailyTransfer({from: address6, value: '0', gas: '5000000'});
        //     const address = await this.loaToken.balanceOf(address6)
        //     console.log(address.toString())
        // }


        {
            const index = await this.loaToken._dailyCategoryIndex('Advisors1')
            console.log(index.toString())
        }

        {
            const index = await this.loaToken._dailyCategoryIndex('Advisors2')
            console.log(index.toString())
        }

        {
            const index = await this.loaToken._dailyCategoryIndex('Advisors3')
            console.log(index.toString())
        }

        {
            const index = await this.loaToken._dailyCategoryIndex('Advisors4')
            console.log(index.toString())
        }

        {   const index = await this.loaToken._dailyCategoryIndex('Team')
            console.log(index.toString())
        }

        {
            const index = await this.loaToken._dailyCategoryIndex('Marketing')
            console.log(index.toString())
        }
    });
});
