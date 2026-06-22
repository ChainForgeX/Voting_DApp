const {ethers} = require("hardhat");

async function main(){
    const Voting = await ethers.getContractFactory("Voting");

    const token = await Voting.deploy();

    await token.waitForDeployment();

    console.log("Voting deployed at:", await token.getAddress());
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
});