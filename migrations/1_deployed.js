const IdoFactory = artifacts.require("IDOFactory");
const TokenLockerFactory = artifacts.require("TokenLockerFactory");

module.exports = function (deployer) {
  deployer.then(async () => {
    let feeToken = "0x809fCF7C5490D470828968879B18c47B23D2008B";
    let wethAddress = "0x8c1E574bA64C99F9bE917a04cfC1905Ce89f7d3D";
    await deployer.deploy(IdoFactory, feeToken, "100000", "0", wethAddress);
    await deployer.deploy(TokenLockerFactory);
  });
};
