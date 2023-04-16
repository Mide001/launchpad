const Starpad = artifacts.require("Starpad");


module.exports = function (deployer) {
    deployer.then(async () => {
      await deployer.deploy(Starpad);
    });
  };
  