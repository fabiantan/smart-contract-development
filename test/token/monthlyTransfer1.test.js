const { BN, time, expectRevert} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LoaToken = artifacts.require('LoaToken');
const LoaPresale = artifacts.require('LoaPresale');

contract('payable', function (accounts) {
    const [
        owner,
        address,
        ecosystemFundAddress,
        playToEarnAddress,
        stakingAddress,
        nftStakingAddress
    ] = accounts;

    before(async function () {
        this.loaToken = await LoaToken.new(address, address, address, address, address, address, ecosystemFundAddress, playToEarnAddress, stakingAddress, nftStakingAddress);
        this.loaPresale = await LoaPresale.new(this.loaToken.address)
        await this.loaToken.setPreSaleContractNotYetSet(this.loaPresale.address);
    });

    it('Should get correct variables', async function () {
        const _Apr_12_2022 = 1649721600
        const _May_12_2022 = 1652313600
        const _Jul_12_2022 = 1657584000
        const _Nov_12_2022 = 1668211200;

        const _Dec_12_2026 = 1797033600

        {
            // NTFStaking
            {
                await time.increaseTo(_Apr_12_2022)
                await this.loaToken.monthlyTransfer({from: nftStakingAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(nftStakingAddress)
                console.log(balance.toString())
            }

            // Staking
            {
                await time.increaseTo(_May_12_2022)
                await this.loaToken.monthlyTransfer({from: stakingAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(stakingAddress)
                console.log(balance.toString())
            }

            // Ecosystem
            {
                await time.increaseTo(_Jul_12_2022)
                await this.loaToken.monthlyTransfer({from: ecosystemFundAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(ecosystemFundAddress)
                console.log(balance.toString())
            }

            // PlayToEarn
            {
                await time.increaseTo(_Nov_12_2022)
                await this.loaToken.monthlyTransfer({from: playToEarnAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(playToEarnAddress)
                console.log(balance.toString())
            }
        }

        await time.increaseTo(_Dec_12_2026)
        {
            // NTFStaking
            {
                await this.loaToken.monthlyTransfer({from: nftStakingAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(nftStakingAddress)
                console.log(balance.toString())
            }

            // Staking
            {
                await this.loaToken.monthlyTransfer({from: stakingAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(stakingAddress)
                console.log(balance.toString())
            }

            // Ecosystem
            {
                await this.loaToken.monthlyTransfer({from: ecosystemFundAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(ecosystemFundAddress)
                console.log(balance.toString())
            }

            // PlayToEarn
            {
                await this.loaToken.monthlyTransfer({from: playToEarnAddress, value: '0', gas: '5000000'});
                const balance = await this.loaToken.balanceOf(playToEarnAddress)
                console.log(balance.toString())
            }
        }
    });
});
