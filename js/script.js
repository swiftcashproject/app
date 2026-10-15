var CURRENT_COIN = 'SWIFT';
var METAMASK_MODE = false;
var WATCHONLY_MODE = false;
var WATCHONLY_FLAG = false;

var PARAMS = {
   'SWIFT': {
      isERC20: true,
      blockchain: 'BNB',
      coingecko: 'swiftcash',
      coinjs: cc.bitcoin,
      network: cc.bitcoin.networks.swiftcash,
      precision: 2,
      qrColor: '3875CE',
      contract: '0x491cca8f90fa0c955e7760f4e918396cc0f219d1',
      migration: '0xCf0142b397e82BE0D0E6336e275bA69EF6827156',
      wswift: '0x617BCDd0F7188b910A8c4cBf0745470940C3ddE0',
      gasStation: '0x8ce883A4dD93AE05C2D57877131b8e841F77bECE',
      gasStationEmail: 'info@swiftcash.cc',
      gasTopUp: 0.00025,
      gasTopUpFee: 1000,
      permitVersion: 1,
      permitName: 'TestCash',
      rpc: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      chainId: 97,
      decimals: 18,
      explorer: 'https://testnet.bscscan.com/',
      symbol: 'SWIFT',
      name: 'SwiftCash',
      image: 'https://swiftcash.cc/brand/logo-64.png'
   },

   'BTC': {
      blockchain: 'Bitcoin',
      coingecko: 'bitcoin',
      coinjs: cc.bitcoin,
      qrColor: 'FC8F43',
      minFee: 0.00001,
      maxFee: 0.01,
      txFee: 0.0001,
      precision: 4,
      explorer: 'https://live.blockcypher.com/btc/',
      unspentApi: 'https://api.blockcypher.com/v1/btc/main/addrs/',
      sendApi: 'https://api.blockchair.com/bitcoin/push/transaction',
      sendTxHex: 'data',
      sendTxid1: 'data',
      sendTxid2: 'transaction_hash',
      unspentArray1: 'txrefs',
      unspentTxid: 'tx_hash',
      unspentOutput: 'tx_output_n',
      unspentValue: 'value',
      unspentDivision: 100000000
   },

   'LTC': {
      blockchain: 'Litecoin',
      coingecko: 'litecoin',
      coinjs: cc.bitcoin,
      network: cc.bitcoin.networks.litecoin,
      qrColor: '5C5C5C',
      minFee: 0.0001,
      maxFee: 0.1,
      txFee: 0.001,
      precision: 3,
      explorer: 'https://live.blockcypher.com/ltc/',
      unspentApi: 'https://api.blockcypher.com/v1/ltc/main/addrs/',
      sendApi: 'https://api.blockchair.com/litecoin/push/transaction',
      sendTxHex: 'data',
      sendTxid1: 'data',
      sendTxid2: 'transaction_hash',
      unspentArray1: 'txrefs',
      unspentTxid: 'tx_hash',
      unspentOutput: 'tx_output_n',
      unspentValue: 'value',
      unspentDivision: 100000000
   },

   'DOGE': {
      blockchain: 'Dogecoin',
      coingecko: 'dogecoin',
      coinjs: cc.bitcoin,
      network: cc.bitcoin.networks.dogecoin,
      qrColor: 'C19347',
      minFee: 0.01,
      maxFee: 100,
      txFee: 1,
      precision: 0,
      explorer: 'https://live.blockcypher.com/doge/',
      unspentApi: 'https://api.blockcypher.com/v1/doge/main/addrs/',
      sendApi: 'https://api.blockchair.com/dogecoin/push/transaction',
      sendTxHex: 'data',
      sendTxid1: 'data',
      sendTxid2: 'transaction_hash',
      unspentArray1: 'txrefs',
      unspentTxid: 'tx_hash',
      unspentOutput: 'tx_output_n',
      unspentValue: 'value',
      unspentDivision: 100000000
   },

   'DASH': {
      blockchain: 'Digital Cash',
      coingecko: 'dash',
      coinjs: cc.bitcoin,
      network: cc.bitcoin.networks.dash,
      qrColor: '292929',
      minFee: 0.0001,
      maxFee: 0.1,
      txFee: 0.001,
      precision: 3,
      explorer: 'https://live.blockcypher.com/dash/',
      unspentApi: 'https://api.blockcypher.com/v1/dash/main/addrs/',
      sendApi: 'https://api.blockchair.com/dash/push/transaction',
      sendTxHex: 'data',
      sendTxid1: 'data',
      sendTxid2: 'transaction_hash',
      unspentArray1: 'txrefs',
      unspentTxid: 'tx_hash',
      unspentOutput: 'tx_output_n',
      unspentValue: 'value',
      unspentDivision: 100000000
   }
};

const SWIFT_ABI = [
    "function currentAnnualInterestRate() view returns (uint256)",
    "function accruedInterestOf(address) view returns (uint256)",
    "function stakedBalanceOf(address) view returns (uint256)",
    "function accruedInterest(address) view returns (uint256)",
    "function adjustmentPowerOf(address) view returns (uint256)",
    "function canAdjustInterestRate(address) view returns (bool)",
    "function deposit(uint256 amount)",
    "function withdraw(uint256)",
    "function withdrawAll()",
    "function mintInterest()",
    "function hikeInterest()",
    "function cutInterest()"
];

const MIGRATION_ABI = [
    "function claimWrapped(uint256)",
    "function claimNative(uint256,uint256,bytes,uint256,bytes32[])",
    "function hasClaimed(uint256) view returns (bool)"
];

const ERRORS_ABI = [

   // SwiftCash errors
   "error AmountMustBeGreaterThanZero()",
   "error InvalidStakingPool()",
   "error AmountTooSmall()",
   "error NoStakingPosition()",
   "error InsufficientStakingBalance()",
   "error InsufficientStakedBalance()",
   "error NoStakingShares()",
   "error NotEligibleToAdjustInterestRate()",
   "error MaximumRateReached()",
   "error MinimumRateReached()",
   "error UseDepositToStake()",

   // Migration errors
   "error InsufficientSwiftReserves()",
   "error SwiftTransferFailed()",
   "error InvalidPublicKeyLength()",
   "error AlreadyClaimed()",
   "error ClaimNotYetRedeemable()",
   "error InvalidMerkleProof()",
   "error InvalidPublicKey()",
   "error InvalidCompressedKeyPrefix()",
   "error InvalidXCoordinate()",
   "error InvalidPublicKeyPoint()"
];

const WSWIFT_ABI = [
   "function balanceOf(address) view returns (uint256)",
   "function approve(address,uint256) returns (bool)"
];

function getCustomErrorMessage(error) {

   try {

      var iface =
         new ethers.Interface(ERRORS_ABI);

      var parsedError =
         iface.parseError(error.data);

      if (parsedError) {

         switch (parsedError.name) {

            case "AmountMustBeGreaterThanZero":
               return "Amount must be greater than zero.";

            case "InvalidStakingPool":
               return "Invalid staking pool.";

            case "AmountTooSmall":
               return "Amount is too small.";

            case "NoStakingPosition":
               return "You don't have a staking position.";

            case "InsufficientStakingBalance":
               return "Insufficient staking balance.";

            case "InsufficientStakedBalance":
               return "Insufficient staked balance.";

            case "NoStakingShares":
               return "You don't have any staking shares.";

            case "NotEligibleToAdjustInterestRate":
               return "You are not eligible to adjust the interest rate.";

            case "MaximumRateReached":
               return "The maximum interest rate has been reached.";

            case "MinimumRateReached":
               return "The minimum interest rate has been reached.";

            case "UseDepositToStake":
               return "Use deposit() to stake SWIFT.";

            case "InsufficientSwiftReserves":
               return "Insufficient SWIFT reserves.";

            case "SwiftTransferFailed":
               return "SWIFT transfer failed.";

            case "InvalidPublicKeyLength":
               return "Invalid public key length.";

            case "AlreadyClaimed":
               return "This claim has already been claimed.";

            case "ClaimNotYetRedeemable":
               return "This claim is not yet redeemable.";

            case "InvalidMerkleProof":
               return "Invalid Merkle proof.";

            case "InvalidPublicKey":
               return "Invalid public key.";

            case "InvalidCompressedKeyPrefix":
               return "Invalid compressed key prefix.";

            case "InvalidXCoordinate":
               return "Invalid X coordinate.";

            case "InvalidPublicKeyPoint":
               return "Invalid public key point.";
         }
      }

   } catch (e) {
      // Unable to decode custom error
   }

   return error.reason || error.message;
}

function getSwiftContract(signer) {
   const provider = new ethers.JsonRpcProvider(
      PARAMS.SWIFT.rpc,
      PARAMS.SWIFT.chainId
   );

   if (signer && !METAMASK_MODE) {
      signer = signer.connect(provider);
   }

   return new ethers.Contract(
      PARAMS.SWIFT.contract,
      SWIFT_ABI,
      signer || provider
   );
}

function getMigrationContract(signer) {
   const provider = new ethers.JsonRpcProvider(
      PARAMS.SWIFT.rpc,
      PARAMS.SWIFT.chainId
   );

   if (signer && !METAMASK_MODE) {
      signer = signer.connect(provider);
   }

   return new ethers.Contract(
      PARAMS.SWIFT.migration,
      MIGRATION_ABI,
      signer || provider
   );
}

function getWSwiftContract(signer) {
   const provider = new ethers.JsonRpcProvider(
      PARAMS.SWIFT.rpc,
      PARAMS.SWIFT.chainId
   );

   if (signer && !METAMASK_MODE) {
      signer = signer.connect(provider);
   }

   return new ethers.Contract(
      PARAMS.SWIFT.wswift,
      WSWIFT_ABI,
      signer || provider
   );
}

function claimWrapped() {

   if (wswiftBalance <= 0n) {
      alertError(
         "You don't have any wSWIFT to convert!"
      );
      return;
   }

   var wswiftContract = getWSwiftContract(wallet);
   var migrationContract = getMigrationContract(wallet);

   $('#submit').prop("disabled", true);
   $('#claim-wrapped').prop("disabled", true);
   $('#ajax-loader').show();

   wswiftContract
      .approve(
         PARAMS.SWIFT.migration,
         wswiftBalance
      )
      .then(function(tx) {

         return tx.wait();

      })
      .then(function() {

         return migrationContract.claimWrapped(
            wswiftBalance
         );

      })
      .then(function(tx) {

         return tx.wait().then(function() {

            USD = false;
            usdBalance = false;

            alertSuccess(
               "Claimed!",
               "Your wSWIFT balance was successfully converted to SWIFT.",
               tx.hash
            );

            refresh();

            $('#submit').prop("disabled", false);
            $('#claim-wrapped').prop("disabled", false);
            $('#ajax-loader').hide();
         });
      })
      .catch(function(error) {

         console.log(error);

         $('#submit').prop("disabled", false);
         $('#claim-wrapped').prop("disabled", false);
         $('#ajax-loader').hide();

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Claim failed!",
               getCustomErrorMessage(error)
            );
         }
      });
}

var claims = [];
var currentClaimIndex = 0;

function loadClaims() {

   if (METAMASK_MODE || WATCHONLY_MODE) {
      return;
   }

   var pubkeyHash = "0x" + cc.bitcoin.crypto.hash160(
      keyPair.getPublicKeyBuffer()
   ).toString("hex");

   fetch("js/claims.json")
      .then(function(response) {
         if (!response.ok) {
            throw new Error("Could not load claims.json");
         }

         return response.json();
      })
      .then(function(data) {
         var migrationContract = getMigrationContract();
         var checks = [];

         claims = [];
         currentClaimIndex = 0;

         $.each(data, function(index, claim) {
            if (claim.pubkeyHash === pubkeyHash) {

               checks.push(
                  migrationContract.hasClaimed(index)
                  .then(function(claimed) {

                     if (!claimed) {
                        claims.push({
                           index: index,
                           pubkeyHash: claim.pubkeyHash,
                           amount: claim.amount,
                           unlockTimestamp: claim.unlockTimestamp
                        });
                     }
                  })
               );
            }
         });

         return Promise.all(checks);
      })
      .then(function() {
         refreshLegacyClaims();
      })
      .catch(function(error) {
         console.log(error);
         claims = [];
         $("#divLegacySwiftBalance").hide();
      });
}

function refreshLegacyClaims() {

   if (claims.length === 0) {
      $("#divLegacySwiftBalance").hide();
      return;
   }

   var claim = claims[currentClaimIndex];

   $("#addr-legacyswiftbalance").html(
      "Legacy Balance: " +
      toCustomFixed(BigInt(claim.amount)) +
      " LSWIFT"
   );

   $("#divLegacySwiftBalance").data("index", claim.index);

   if (claims.length > 1) {
      $("#legacy-next").show();
   } else {
      $("#legacy-next").hide();
   }

   $("#divLegacySwiftBalance").show();
}

function nextLegacy() {
   if (claims.length <= 1) {
      return;
   }

   currentClaimIndex++;

   if (currentClaimIndex >= claims.length) {
      currentClaimIndex = 0;
   }

   refreshLegacyClaims();
}

async function getMerkleProof(index) {
   const response = await fetch("js/claims.json");

   if (!response.ok) {
      throw new Error("Failed to load claims.json");
   }

   const claims = await response.json();

   const entries = Object.entries(claims).map(([index, claim]) => [
      index,
      claim.pubkeyHash,
      claim.amount,
      claim.unlockTimestamp
   ]);

   const tree = OpenZeppelinMerkle.StandardMerkleTree.of(
      entries,
      ["uint256", "bytes20", "uint256", "uint256"]
   );

   for (const [i, value] of tree.entries()) {
      if (value[0] === String(index)) {
         return tree.getProof(i);
      }
   }

   throw new Error(`Merkle index ${index} not found`);
}

async function claimNative() {

   if (claims.length === 0) {
      return;
   }

   var claim = claims[currentClaimIndex];

   var now = Math.floor(Date.now() / 1000);

   if (now < Number(claim.unlockTimestamp)) {

      var redeemableDate = new Date(
         Number(claim.unlockTimestamp) * 1000
      ).toISOString().slice(0, 10);

      alertError(
         "Claim failed!",
         "This is a legacy HODL deposit and will only be redeemable after " +
         redeemableDate + "."
      );

      return;
   }

   var compressedPublicKey = "0x" +
      keyPair.getPublicKeyBuffer().toString("hex");

   var migrationContract = getMigrationContract(wallet);

   $('#submit').prop("disabled", true);
   $('#claim-native').prop("disabled", true);
   $('#ajax-loader').show();

   claim.proof = await getMerkleProof(claim.index);

   migrationContract.claimNative(
         claim.index,
         claim.amount,
         compressedPublicKey,
         claim.unlockTimestamp,
         claim.proof
      )
      .then(function(tx) {

         return tx.wait().then(function() {
            return tx;
         });

      })
      .then(function(tx) {

         // Remove the claimed allocation.
         claims.splice(currentClaimIndex, 1);

         if (currentClaimIndex >= claims.length) {
            currentClaimIndex = 0;
         }

         refresh();

         alertSuccess(
            "Claimed!",
            "Your legacy SWIFT balance was successfully converted to SWIFT.",
            tx.hash
         );

         $('#submit').prop("disabled", false);
         $('#claim-native').prop("disabled", false);
         $('#ajax-loader').hide();

      })
      .catch(function(error) {

         console.log(error);

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Claim failed!",
               getCustomErrorMessage(error)
            );
         }

         $('#submit').prop("disabled", false);
         $('#claim-native').prop("disabled", false);
         $('#ajax-loader').hide();
      });
}

function sendBNB() {

   var provider = new ethers.JsonRpcProvider(
      PARAMS.SWIFT.rpc,
      PARAMS.SWIFT.chainId
   );

   var signer = wallet;

   if (!METAMASK_MODE) {
      signer = signer.connect(provider);
   }

   Swal.fire({
      background: "#ffffff",
      title: "Send BNB",
      iconHtml: '<img src="images/bnb.png" style="width:45px; height:45px;" alt="BNB">',
      html: '<input id="bnb-recipient" class="swal2-input" ' +
         'placeholder="BNB Address" style="width:calc(100% - 6px); margin: 10 3 3;">' +

         '<div style="display:flex; align-items:center; gap:5px;">' +

         '<input id="bnb-amount" class="swal2-input" ' +
         'placeholder="Amount of BNB" type="text" ' +
         'step="any" style="width:100%; margin: 10 3 3;">' +

         '<button class="btn" style="margin: 10 3 3; background: #fff" type="button" id="bnb-max">' +
         '<i class="fa fa-broom-ball" ' +
         'style="height:29px; width:29px; font-size:30px;"></i>' +
         '</button>' +

         '</div>' +

         '<div id="bnb-loader" style="display:none; margin-top:15px;">' +
         '<div class="loading-bar" style="background: #fff">' +
         '<div class="loading-progress"></div>' +
         '<span class="loading-text">SENDING BNB...</span>' +
         '</div>' +
         '</div>',

      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",

      didOpen: function() {

         $("#bnb-max").on("click", async function() {

            try {

               var balance = await provider.getBalance(
                  wallet.address
               );

               var feeData = await provider.getFeeData();

               if (!feeData.gasPrice) {
                  throw new Error("Could not determine gas price.");
               }

               var gasLimit = 21000n;

               var gasCost =
                  gasLimit * feeData.gasPrice;

               if (balance <= gasCost) {
                  $("#bnb-amount").val("0");
                  return;
               }

               var maxAmount = balance - gasCost;

               $("#bnb-amount").val(
                  ethers.formatEther(maxAmount)
               );

            } catch (error) {

               console.log(error);

               alertError(
                  "Unable to calculate maximum!",
                  "The BNB balance or gas cost could not be determined."
               );
            }
         });
      },

      preConfirm: async function() {

         var recipient =
            $("#bnb-recipient").val().trim();

         var amount =
            $("#bnb-amount").val().trim();

         if (!ethers.isAddress(recipient)) {

            Swal.showValidationMessage(
               "Please enter a valid BNB address."
            );

            return false;
         }

         if (!amount || Number(amount) <= 0) {

            Swal.showValidationMessage(
               "Please enter a valid BNB amount."
            );

            return false;
         }

         try {

            // Disable buttons while sending.
            Swal.getConfirmButton().disabled = true;
            Swal.getCancelButton().disabled = true;

            // Show loader.
            $("#bnb-loader").show();

            var value = ethers.parseEther(amount);

            var balance = await provider.getBalance(
               wallet.address
            );

            var gasLimit = await provider.estimateGas({
               from: wallet.address,
               to: recipient,
               value: value
            });

            var feeData = await provider.getFeeData();

            if (!feeData.gasPrice) {
               throw new Error("Could not determine gas price.");
            }

            var gasCost =
               gasLimit * feeData.gasPrice;

            if (value + gasCost > balance) {

               $("#bnb-loader").hide();

               Swal.getConfirmButton().disabled = false;
               Swal.getCancelButton().disabled = false;

               Swal.showValidationMessage(
                  "Insufficient BNB for the amount and gas fee."
               );

               return false;
            }

            var tx = await signer.sendTransaction({
               to: recipient,
               value: value,
               gasLimit: gasLimit,
               gasPrice: feeData.gasPrice
            });

            return await tx.wait();

         } catch (error) {

            console.log(error);

            $("#bnb-loader").hide();

            Swal.getConfirmButton().disabled = false;
            Swal.getCancelButton().disabled = false;

            Swal.showValidationMessage(
               "Transaction failed: " +
               (error.shortMessage || error.message)
            );

            return false;
         }
      }
   }).then(function(result) {

      if (!result.isConfirmed || !result.value) {
         return;
      }

      var tx = result.value;

      alertSuccess(
               "BNB sent!",
               "Transaction was broadcasted successfully.",
               tx.hash
            );

      refresh();

   });
}

async function gasTopup() {

   var params = PARAMS[CURRENT_COIN];

   if (!params.gasStation) {

      alertError(
         "Gas top-up failed!",
         CURRENT_COIN +
         " does not support gas top-up requests."
      );

      return;
   }

   // Check BNB balance first

   var gasTopUpAmount = ethers.parseUnits(
      params.gasTopUp.toString(),
      18
   );

   if (bnbBalance >= (gasTopUpAmount / 10n)) {

      Swal.fire({
         icon: "info",
         title: "Gas Top-Up Request!",
         text: "You can only request a top-up if your BNB balance is less than " + (params.gasTopUp / 10).toString() + "."
      });

      return;
   }

   // Check token balance + claimable claims

   var requiredTokenAmount = ethers.parseUnits(
      params.gasTopUpFee.toString(),
      params.decimals
   );

   var availableTokenAmount = balance;

   if (claims) {

      for (var i = 0; i < claims.length; i++) {

         availableTokenAmount += BigInt(
            claims[i].amount
         );
      }
   }

   if (availableTokenAmount < requiredTokenAmount) {

      alertError(
         "Gas top-up failed!",
         "You do not have enough " +
         CURRENT_COIN +
         " to cover the gas top-up fee."
      );

      return;
   }

   var confirmed = await Swal.fire({

      icon: "info",

      title: "Gas Top-Up Request",

      html: "You are requesting <b>" +
         params.gasTopUp +
         " BNB</b> to cover transaction fees. " +

         "In return, you will authorize the gas station to spend up to <b>" +
         params.gasTopUpFee +
         " " +
         CURRENT_COIN +
         "</b> from your wallet. " +
         "This request can take up to 72 hours to complete. Do you want to continue? <br>",

      showCancelButton: true,

      confirmButtonText: "Yes",

      cancelButtonText: "Cancel"

   });

   if (!confirmed.isConfirmed) {
      return;
   }

   try {

      var provider = new ethers.JsonRpcProvider(
         params.rpc,
         params.chainId
      );

      var contract = new ethers.Contract(
         params.contract,
         [
            "function nonces(address) view returns (uint256)"
         ],
         provider
      );

      var nonce = await contract.nonces(address);

      var deadline =
         Math.floor(Date.now() / 1000) + (7 * 86400); // 7 days

      var domain = {
         name: params.permitName.toString(),
         version: params.permitVersion.toString(),
         chainId: params.chainId,
         verifyingContract: params.contract
      };

      var types = {
         Permit: [{
               name: "owner",
               type: "address"
            },
            {
               name: "spender",
               type: "address"
            },
            {
               name: "value",
               type: "uint256"
            },
            {
               name: "nonce",
               type: "uint256"
            },
            {
               name: "deadline",
               type: "uint256"
            }
         ]
      };

      var value = {
         owner: address,
         spender: params.gasStation,
         value: requiredTokenAmount,
         nonce: nonce,
         deadline: deadline
      };

      var signature = await wallet.signTypedData(
         domain,
         types,
         value
      );

      var sig = ethers.Signature.from(signature);

      var permit = {
         owner: address,
         spender: params.gasStation,
         value: value.value,
         nonce: nonce,
         deadline: deadline,
         v: sig.v,
         r: sig.r,
         s: sig.s
      };

      sendPermitByEmail(permit);

   } catch (error) {

      console.log(error);

      alertError(
         "Gas top-up failed!",
         error.reason ||
         error.shortMessage ||
         error.message
      );
   }
}

async function sendPermitByEmail(permit) {

   var params = PARAMS[CURRENT_COIN];

   var subject =
      CURRENT_COIN +
      " Gas Top-Up Request";

   var body =
      "Hello,\n\n" +

      "I would like to request a gas top-up.\n\n" +

      "Gas top-up: " +
      params.gasTopUp +
      " BNB\n" +

      "Gas top-up fee: " +
      params.gasTopUpFee +
      " " +
      CURRENT_COIN +
      "\n\n" +

      "Permit information:\n" +
      "Owner: " +
      permit.owner +
      "\n" +
      "Spender: " +
      permit.spender +
      "\n" +
      "Value: " +
      permit.value.toString() +
      "\n" +
      "Nonce: " +
      permit.nonce.toString() +
      "\n" +
      "Deadline: " +
      permit.deadline.toString() +
      "\n" +
      "v: " +
      permit.v +
      "\n" +
      "r: " +
      permit.r +
      "\n" +
      "s: " +
      permit.s +
      "\n\n" +

      "Thank you.";

   var result = await Swal.fire({

      icon: "info",

      title: "Gas Top-Up Request",

      html: '<div>Select your email client and click "Continue" to send your request and signed permit to the gas station.</div><br/>' +

         '<div class="btn-group-vertical" data-toggle="buttons" style="width:50%;">' +

         '<label class="btn btn-primary active" style="margin-bottom:10px;">' +
         '<input type="radio" name="email-method" value="gmail" checked> ' +
         '<i class="fas fa-envelope"></i>&nbsp; Gmail' +
         '</label>' +

         '<label class="btn btn-primary">' +
         '<input type="radio" name="email-method" value="mailto"> ' +
         '<i class="fas fa-envelope-open"></i>&nbsp; Email' +
         '</label>' +

         '</div>',

      showConfirmButton: true,

      confirmButtonText: "Continue",

      showCancelButton: true,

      cancelButtonText: "Cancel",

      preConfirm: function() {

         return document.querySelector(
            'input[name="email-method"]:checked'
         ).value;

      }

   });

   if (!result.isConfirmed) {
      return;
   }

   if (result.value === "gmail") {

      var gmailUrl =
         "https://mail.google.com/mail/?view=cm" +
         "&to=" +
         encodeURIComponent(params.gasStationEmail) +
         "&su=" +
         encodeURIComponent(subject) +
         "&body=" +
         encodeURIComponent(body);

      window.open(gmailUrl, "_blank");

   } else {

      var mailto =
         "mailto:" +
         encodeURIComponent(params.gasStationEmail) +
         "?subject=" +
         encodeURIComponent(subject) +
         "&body=" +
         encodeURIComponent(body);

      window.location.href = mailto;
   }
}

function sendPermitByEmailq(permit) {

   var params = PARAMS[CURRENT_COIN];

   var subject =
      CURRENT_COIN +
      " Gas Top-Up Request";

   var body =
      "Hello,\n\n" +

      "I would like to request a gas top-up.\n\n" +

      "Gas top-up: " +
      params.gasTopUp +
      " BNB\n" +

      "Gas top-up fee: " +
      params.gasTopUpFee +
      " " +
      CURRENT_COIN +
      "\n\n" +

      "Permit information:\n" +
      "Owner: " +
      permit.owner +
      "\n" +
      "Spender: " +
      permit.spender +
      "\n" +
      "Value: " +
      permit.value.toString() +
      "\n" +
      "Nonce: " +
      permit.nonce.toString() +
      "\n" +
      "Deadline: " +
      permit.deadline.toString() +
      "\n" +
      "v: " +
      permit.v +
      "\n" +
      "r: " +
      permit.r +
      "\n" +
      "s: " +
      permit.s +
      "\n\n" +

      "Thank you.";

   var gmailUrl =
      "https://mail.google.com/mail/?view=cm" +
      "&to=" + encodeURIComponent(params.gasStationEmail) +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

   window.open(gmailUrl, "_blank");
}

function addToMetamask() {
   if (!window.ethereum) {
      alertError("Couldn't find Metamask!", "You need to install Metamask in order to be able to add " + CURRENT_COIN + " to your watchlist!");
      return;
   }

   if (PARAMS[CURRENT_COIN].isERC20) {
      window.ethereum.request({
         method: 'wallet_watchAsset',
         params: {
            type: 'ERC20',
            options: {
               address: PARAMS[CURRENT_COIN].contract,
               symbol: PARAMS[CURRENT_COIN].symbol,
               decimals: PARAMS[CURRENT_COIN].decimals,
               image: PARAMS[CURRENT_COIN].image,
            },
         }
      });
   } else {
      alertError(CURRENT_COIN + "isn't an ERC20 token!");
   }
}

function alertError(t, m) {
   swal.fire({
      icon: "error",
      title: t,
      text: m
   });
}

function handleInsufficientFundsError() {
   alertError(
      "Not enough " +
      PARAMS.SWIFT.blockchain +
      "!",
      "Please add more " +
      PARAMS.SWIFT.blockchain +
      " to your wallet to pay the network fees."
   );
}

function alertSuccess(t, m, txHash = "") {
   swal.fire({
      icon: "success",
      title: t,
      ...(txHash
         ? {
              html: m + '<br><br><a href="' + PARAMS[CURRENT_COIN].explorer + '/tx/' + txHash + '" target="_blank" rel="noopener noreferrer">View on Explorer</a>'
           }
         : { text: m })
   });
}

function refreshAPR() {
   const contract = getSwiftContract();

   contract.currentAnnualInterestRate()
      .then(function(result) {
         const apr = Number(result) / 1e25;
         $('#APR').html(apr.toFixed(2) + '%');
      })
      .catch(function(error) {
         console.log(error);
      });

};
refreshAPR();
setInterval(refreshAPR, 10 * 60 * 1000);

function byteArrayToInt(byteArray) {
   var value = 0;
   for (var i = byteArray.length - 1; i >= 0; i--) {
      value = (value * 256) + byteArray[i];
   }

   return value;
};

function intToByteArray(int) {
   var byteArray = [0];
   if (int > 8388607) byteArray = [0, 0, 0, 0];
   else if (int > 32767) byteArray = [0, 0, 0];
   else if (int > 127) byteArray = [0, 0];

   for (var index = 0; index < byteArray.length; index++) {
      var byte = int & 0xff;
      byteArray[index] = byte;
      int = (int - byte) / 256;
   }

   return byteArray;
}

function toCustomFixed(number) {
   if (PARAMS[CURRENT_COIN].isERC20) {
      number = Number(ethers.formatUnits(
         number,
         PARAMS[CURRENT_COIN].decimals
      ));
   }

   return number.toLocaleString(undefined, {
      minimumFractionDigits: PARAMS[CURRENT_COIN].precision,
      maximumFractionDigits: PARAMS[CURRENT_COIN].precision
   });
}

window.Clipboard = (function(window, document, navigator) {
   var textArea,
      copy;

   function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
   }

   function createTextArea(text) {
      textArea = document.createElement('textArea');
      textArea.value = text;
      document.body.appendChild(textArea);
   }

   function selectText() {
      var range,
         selection;

      if (isOS()) {
         range = document.createRange();
         range.selectNodeContents(textArea);
         selection = window.getSelection();
         selection.removeAllRanges();
         selection.addRange(range);
         textArea.setSelectionRange(0, 999999);
      } else {
         textArea.select();
      }
   }

   function copyToClipboard() {
      document.execCommand('copy');
      document.body.removeChild(textArea);
   }

   copy = function(text) {
      createTextArea(text);
      selectText();
      copyToClipboard();
   };

   return {
      copy: copy
   };
})(window, document, navigator);

var scanner;
var qrIdToFill;

function openQrModal(param) {
   qrIdToFill = param;
   scanner = new Instascan.Scanner({
      mirror: false,
      video: document.getElementById('qrScannerPreview')
   });

   scanner.addListener('scan', function(content) {
      scanner.stop();
      $('#' + qrIdToFill).val(content);
      $('#' + qrIdToFill).change();
      $('#modalQrCode').modal('toggle');
   });

   Instascan.Camera.getCameras().then(function(cameras) {
      if (cameras.length > 1) {
         scanner.start(cameras[1]);
      } else if (cameras.length > 0) {
         scanner.start(cameras[0]);
      } else {
         $('#modalQrCode').modal('toggle');
         alertError('No cameras found.');
      }
   }).catch(function(e) {
      console.error(e);
   });

   $('#modalQrCode').modal('toggle');
}

function closeQrModal() {
   scanner.stop();
}

function eyeFunction(id) {
   var x = document.getElementById(id);
   if (x.type === "password") {
      x.type = "text";
   } else {
      x.type = "password";
   }
}

var passphrase = "";
var hashedPass = "";
var loginPrivkey = "";
var keyPair = "";
var address = "";
var wallet = "";

function hashit(hash, callback) {
   for (i = 0; i < 100 * 1440; i++) {
      hash = cc.bitcoin.crypto.keccak256(hash + passphrase);
      hash = hash.toString("hex");
   }

   hashedPass = hash;
   callback(hash);
}

function switchCoin(whichCoin) {
   if (METAMASK_MODE && !PARAMS[whichCoin].isERC20) {
      alertError(
         "Metamask Mode!",
         "This coin isn't supported when you connect with Metamask! Log in with an email and password or with a private key."
      );
      return;
   }
   
   if (WATCHONLY_MODE && !WATCHONLY_FLAG) {
       WATCHONLY_FLAG = true;
   } else if (WATCHONLY_MODE && WATCHONLY_FLAG) {
      alertError(
         "Watch Mode!",
         "This action is not supported in watch mode."
      );
      return;
   }

   $("#addr-qr").attr("src", "./images/qrloader.gif");
   setTimeout(switchCoinNow, 100, whichCoin);
}

function switchCoinNow(whichCoin) {
   CURRENT_COIN = whichCoin;

   var cLogos = document.getElementsByClassName("currency-logo");
   for (i = 0; i < cLogos.length; i++) {
      var title = cLogos[i].title;

      if (title != whichCoin) {
         cLogos[i].style.filter = "none";
      } else {
         cLogos[i].style.filter = "drop-shadow(5px 5px 5px #4b4b4c)";
      }
   }

   if (!METAMASK_MODE && !WATCHONLY_MODE) {
      if (whichCoin != loginPrivkey) {
         var d = new cc.bigi.fromBuffer(hashedPass);
         keyPair = new PARAMS[CURRENT_COIN].coinjs.ECPair(d, null, {
            network: PARAMS[CURRENT_COIN].network
         });
      } else {
         try {
            keyPair = PARAMS[CURRENT_COIN].coinjs.ECPair.fromWIF(
               hashedPass,
               PARAMS[CURRENT_COIN].network
            );
         } catch (e) {
            var d = cc.bigi.fromHex(hashedPass.replace(/^0x/, ""));
            keyPair = new PARAMS[CURRENT_COIN].coinjs.ECPair(d, null, {
               network: PARAMS[CURRENT_COIN].network
            });
         }
      }
   }

   $("#address").attr("placeholder", whichCoin + " address");

   if (whichCoin == "SWIFT") {
       
      if(!WATCHONLY_MODE) { 
        $('#mainD, #mainW, #mainH, #mainC').removeAttr('disabled');
      }

      $("#buy-gas").show();
      $("#metamask").show();
      $("#custom-fee").hide();
      $("#changeaddress-modify").hide();

      $("#divBNBBalance").css("display", "block");

   } else {
      $('#mainD, #mainW, #mainH, #mainC').attr('disabled', 'disabled');

      $("#buy-gas").hide();
      $("#metamask").hide();
      
      if(!WATCHONLY_MODE) {
         $("#custom-fee").show();
         $("#changeaddress-modify").show();
      }
      
      $("#divStakedBalance").css("display", "none");
      $("#divLegacySwiftBalance").css("display", "none");
      $("#divWSwiftBalance").css("display", "none");
      $("#divBNBBalance").css("display", "none");
   }

   $("#amount").attr("placeholder", "Amount of " + whichCoin);
   $("#address").attr("placeholder", PARAMS[whichCoin].blockchain + ": " + whichCoin + " Address");

   $("#address").val("");
   $("#amount").val("");
   $("#mainR").click();

   loadAddress();

   if (CURRENT_COIN == 'SWIFT') {
      loadClaims();
   }
}

async function connectMetaMask() {

   if (typeof window.ethereum === "undefined") {
      alertError(
         "MetaMask not found!",
         "Please install MetaMask to continue."
      );
      return;
   }

   try {

      var provider = new ethers.BrowserProvider(window.ethereum);

      var accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
         return;
      }

      var network = await provider.getNetwork();

      if (network.chainId !== BigInt(PARAMS.SWIFT.chainId)) {

         await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
               chainId: ethers.toQuantity(
                  PARAMS.SWIFT.chainId
               )
            }]
         });

         provider = new ethers.BrowserProvider(window.ethereum);
      }

      address = accounts[0];

      wallet = await provider.getSigner();
      METAMASK_MODE = true;

      $("#addr-id").html(address);

      await refresh();
      switchCoin(CURRENT_COIN);

   } catch (error) {

      console.log(error);

      alertError(
         "MetaMask connection failed!",
         error.shortMessage || error.message
      );
   }
}


async function watchAnAddress() {

   var watchAddress = $("#password").val().trim();
   var success = false;

   // Try an EVM address first
   if (ethers.isAddress(watchAddress)) {
      address = ethers.getAddress(watchAddress);
      CURRENT_COIN = "SWIFT";
      success = true;
   }

   // Try BitcoinJS addresses if it wasn't an EVM address
   var legacyAddress = false;
   if (!success) {
      $.each(PARAMS, function(key, value) {
         if (!success) try {
            PARAMS[key].coinjs.address.toOutputScript(
               watchAddress,
               PARAMS[key].network
            );
            
             if (key == 'SWIFT') {
                legacyAddress = true;
                return false;
             }

            address = watchAddress;
            CURRENT_COIN = key;
            success = true;
         } catch (e) {}
      });
   }   
   
    if(legacyAddress) {
        alertError
            ("Watch Only Mode!",
             "Legacy SWIFT addresses are not supported in watch only mode. " +
             "To claim your legacy balance, login with your email+passowrd or with your legacy private key."
            ); console.log(1);
        return;
    }

   if (!success) {
      alertError("Invalid address!", "Please enter a valid address.");
      return;
   }
   
   WATCHONLY_MODE = true;

   $("#addr-id").html(address);
   
   $('#privatekey-copy, #changeaddress-modify, #custom-fee, #mint-interest, #unlock-stake, #claim-wrapped, #send-bnb, #gas-topup').hide();
   $('#mainS, #mainD, #mainW, #mainH, #mainC').attr('disabled', 'disabled');

   await refresh();
   switchCoin(CURRENT_COIN);
}

if (window.ethereum)
   window.ethereum.on("accountsChanged", async function(accounts) {

      if (!METAMASK_MODE) {
         return;
      }

      if (!accounts || accounts.length === 0) {
         return;
      }

      address = accounts[0];

      var provider = new ethers.BrowserProvider(window.ethereum);
      wallet = await provider.getSigner();

      $("#addr-id").html(address);

      await refresh();
   });

if (window.ethereum)
   window.ethereum.on("chainChanged", function() {

      if (!METAMASK_MODE) {
         return;
      }

      window.location.reload();
   });

function login() { 
   // Watch an address
   if ($('#watchonlytoggle').attr('aria-pressed') == "true") {
      watchAnAddress();
      return;
   }
   
   // Connect with Metamask
   if ($('#metamasktoggle').attr('aria-pressed') == "true") {
      connectMetaMask();
      return;
   }

   // Make sure the password is strong enough
   if ($('ul.error-list').html() != "" || $('span.password-verdict').html() != "Very Strong") {
      alertError(
         "You need a stronger password!",
         "Try choosing a longer password. At least 14 characters recommended, " +
         "with both uppercase and lowercase characters as well as numbers and special characters."
      );
      return;
   }

   // Login with private key
   if ($('#privlogintoggle').attr('aria-pressed') == "true") {
      var privateKey = $('#password').val();
      var success = false;

      // Try as an EVM private key first
      try {
         wallet = new ethers.Wallet(privateKey);

         hashedPass = privateKey;
         loginPrivkey = "SWIFT";
         CURRENT_COIN = "SWIFT";

         success = true;
      } catch (e) {}

      // Try BitcoinJS WIF if it wasn't an EVM private key
      if (!success) {
         $.each(PARAMS, function(key, value) {
            if (!success) try {
               hashedPass = privateKey;
               loginPrivkey = key;
               CURRENT_COIN = key;

               keyPair = PARAMS[CURRENT_COIN].coinjs.ECPair.fromWIF(
                  privateKey,
                  PARAMS[CURRENT_COIN].network
               );

               success = true;
            } catch (e) {}
         });
      }

      if (!success) {
         alertError("Invalid private key!");
         return;
      } else {
         switchCoin(CURRENT_COIN);
         return;
      }
   }

   // Login with email + password
   passphrase = $("#email").val() + ";" + $("#password").val();
   var hash = cc.bitcoin.crypto.keccak256(passphrase);
   $('#email').prop("disabled", true);
   $('#password').prop("disabled", true);
   $('#signin').prop("disabled", true);
   $('#privlogintoggle').prop("disabled", true);
   $('#metamasktoggle').prop("disabled", true);
   $('#watchonlytoggle').prop("disabled", true);
   $("#login-loader").show();
   $("form[role='login']").click();
   setTimeout(hashit, 1000, hash.toString("hex"), function(hashed) {
      var d = new cc.bigi.fromBuffer(hashed);
      keyPair = new PARAMS[CURRENT_COIN].coinjs.ECPair(d, null, {
         network: PARAMS[CURRENT_COIN].network
      });
      loadAddress();
      switchCoin(CURRENT_COIN);
   });
}

function loadAddress() {
   if (!METAMASK_MODE && !WATCHONLY_MODE) {
      if (PARAMS[CURRENT_COIN].isERC20) {
         const rawPrivateKey = keyPair.d.toBuffer(32).toString('hex');
         wallet = new ethers.Wallet("0x" + rawPrivateKey);
         address = wallet.address;
      } else {
         address = keyPair.getAddress();
      }
   }

   var ZERO = 0;
   $("#addr-balance-refresh").prop("disabled", true);
   $('#addr-balance').html('Balance: ' + toCustomFixed(ZERO) + ' ' + CURRENT_COIN);
   $("#addr-balance").css("color", "#74bed8");
   $("#pwd-container").hide();
   $("#addr-container").show();
   $("#addr-qr").attr("src", getAddressQR());
   $("#addr-qr").attr("alt", address);
   $("#addr-id-clipboard").attr("data-clipboard-text", address);
   $("#addr-id-clipboard").attr("title", "Copy address");
   $("#addr-id").attr("href", PARAMS[CURRENT_COIN].explorer + "address/" + address);
   $("#addr-id").html(address);
   changeAddress = address;
   refresh();
}

function getAddressQR() {    
    const qrUrl = new URL("https://qrcodeengine.app/api/v1/qr.svg");

    qrUrl.searchParams.set("data", address);
    qrUrl.searchParams.set("body", "rounded");
    qrUrl.searchParams.set("eyeFrame", "rounded");
    qrUrl.searchParams.set("eyeBall", "circle");
    qrUrl.searchParams.set("fg", PARAMS[CURRENT_COIN].qrColor.replace("#", ""));
    qrUrl.searchParams.set("bg", "#ffffff");
    qrUrl.searchParams.set("ec", "H");

    return qrUrl.toString();
}

var USD = false;
var usdBalance = false;
var balance = 0;
var stakedBalance = 0n;
var accruedInterest = 0n;
var bnbBalance = 0n;
var wswiftBalance = 0n;
var changeAddress = "";
var utxos = [];

function refresh() {

   if (PARAMS[CURRENT_COIN].isERC20) {

      const provider = new ethers.JsonRpcProvider(
         PARAMS[CURRENT_COIN].rpc,
         PARAMS[CURRENT_COIN].chainId
      );

      const token = new ethers.Contract(
         PARAMS[CURRENT_COIN].contract,
         ["function balanceOf(address) view returns (uint256)"],
         provider
      );

      token.balanceOf(address)
         .then(function(result) {

            balance = result;

            USD = false;
            usdBalance = false;

            $('#addr-balance').html(
               'Balance: ' + toCustomFixed(balance) + ' ' + CURRENT_COIN
            );

            $("#addr-balance-refresh").prop("disabled", false);
            $("#addr-balance").css("color", "");
         })
         .catch(function(error) {
            console.log(error);

            alertError(
               "Something went wrong!",
               error.reason || error.message
            );

            $("#addr-balance-refresh").prop("disabled", false);
         });

      provider.getBalance(address)
         .then(function(result) {

            bnbBalance = result;

            var displayBNB = Number(
               ethers.formatUnits(bnbBalance, 18)
            );

            $("#addr-bnbBalance").html(
               "Gas: " + displayBNB.toLocaleString(undefined, {
                  minimumFractionDigits: 10,
                  maximumFractionDigits: 10
               }) + " BNB"
            );
         })
         .catch(function(error) {
            console.log(error);
         });

   } else {

      $.ajax({
         url: PARAMS[CURRENT_COIN].unspentApi + address + '?unspentOnly=true',
         type: "GET",
         dataType: "json",
         data: {},
         success: function(result) {
            loadAddressTxes(result);
            $("#addr-balance-refresh").prop("disabled", false);
            $("#addr-balance").css("color", "");
         },
         error: function(error) {
            console.log(error);
            alertError(
               "Something went wrong!",
               error.reason || error.message
            );
            $("#addr-balance-refresh").prop("disabled", false);
         }
      });

   }

   if (CURRENT_COIN == "SWIFT") {
      refreshStakedBalance();
      refreshWSwiftBalance();
      
      if(!WATCHONLY_MODE) {    
          refreshLegacyClaims();
      }
   }
}

function refreshStakedBalance() {
   var contract = getSwiftContract();

   Promise.all([
         contract.stakedBalanceOf(address),
         contract.accruedInterestOf(address)
      ])
      .then(function(results) {

         stakedBalance = results[0];
         accruedInterest = results[1];

         if (stakedBalance > 0) {
            $("#divStakedBalance").css("display", "block");
         } else {
            $("#divStakedBalance").css("display", "none");
         }

         var stakeText =
            "Staked: " + toCustomFixed(stakedBalance);

         var precisionUnit = 10n ** BigInt(
            PARAMS.SWIFT.decimals - PARAMS.SWIFT.precision
         );

         if (accruedInterest >= precisionUnit) {
            stakeText +=
               " + " + toCustomFixed(accruedInterest);
         }

         stakeText += " SWIFT";

         $("#addr-stakedbalance").html(stakeText);
      })
      .catch(function(error) {
         console.log(error);
      });
}

function refreshWSwiftBalance() {
   var contract = getWSwiftContract();

   contract.balanceOf(address)
      .then(function(result) {

         wswiftBalance = result;

         if (result > 0n) {
            $("#divWSwiftBalance").css("display", "block");
         } else {
            $("#divWSwiftBalance").css("display", "none");
         }

         var wswiftText =
            "Wrapped Balance: " +
            toCustomFixed(result);

         wswiftText += " wSWIFT";

         $("#addr-wswiftbalance").html(wswiftText);
      })
      .catch(function(error) {
         console.log(error);
      });
}

function loadAddressTxes(result) {
   var sum = 0;
   var F1 = PARAMS[CURRENT_COIN].unspentArray1;
   var F2 = PARAMS[CURRENT_COIN].unspentArray2;

   if (F1 && F2) {
      utxos = result[F1][F2];
   } else if (F1) {
      utxos = result[F1];
   } else {
      utxos = result;
   }

   for (i in utxos) {
      sum += Number(utxos[i][PARAMS[CURRENT_COIN].unspentValue] / PARAMS[CURRENT_COIN].unspentDivision);
   }
   balance = sum;

   USD = false;
   usdBalance = false;
   $('#addr-balance').html('Balance: ' + toCustomFixed(balance) + ' ' + CURRENT_COIN);
}

function _setTooltip(message, classId) {
   $(classId)
      .attr('data-original-title', message)
      .tooltip('show');
}

function _hideTooltip(classId) {
   setTimeout(function() {
      $(classId).attr('data-original-title', '').tooltip('hide');
   }, 1000);
}

function modifyTheChangeAddress() {
   Swal.fire({
      inputValue: changeAddress,
      title: "Custom Change Address",
      input: "text",
      showCancelButton: true,
   }).then((result) => {
      if (result.isConfirmed)
         try {
            PARAMS[CURRENT_COIN].coinjs.address.toOutputScript(result.value, PARAMS[CURRENT_COIN].network);
            changeAddress = result.value;
            alertSuccess("New change address:\n", result.value);
         } catch (e) {
            alertError("Please enter a valid address!");
            return;
         }
   });
}

function changeTheFee() {
   var minFee = PARAMS[CURRENT_COIN].minFee;
   var maxFee = PARAMS[CURRENT_COIN].maxFee
   var txFee = PARAMS[CURRENT_COIN].txFee;
   Swal.fire({
      inputValue: txFee,
      title: "Custom Fee",
      input: "text",
      showCancelButton: true,
   }).then((result) => {
      if (result.isConfirmed) {
         var cFee = Number(result.value);
         if (!isNaN(cFee)) {
            if (cFee < minFee) alertError("Minimum fee is " + minFee + " " + CURRENT_COIN + "!");
            else if (cFee > maxFee) alertError("Maximum fee is " + maxFee + " " + CURRENT_COIN + "!");
            else {
               PARAMS[CURRENT_COIN].txFee = Number(cFee);
               alertSuccess("Transaction fee will be:\n" + cFee + " " + CURRENT_COIN);
            }
         } else {
            alertError("Please enter a valid fee!");
         }
      }
   });
}

function togglePrice() {
   if (balance > 0 && !USD && !usdBalance) {
      $.ajax({
         url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + PARAMS[CURRENT_COIN].coingecko + '&vs_currencies=usd',
         type: "GET",
         dataType: "json",
         data: {},
         success: function(result) {
            USD = true;
            var usdPrice = Number(result[PARAMS[CURRENT_COIN].coingecko].usd);

            var displayBalance = PARAMS[CURRENT_COIN].isERC20 ?
               Number(ethers.formatUnits(balance, PARAMS[CURRENT_COIN].decimals)) :
               balance;

            usdBalance = displayBalance * usdPrice;

            $("#addr-balance").html("Balance: $" + usdBalance.toLocaleString(undefined, {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2
            }) + " USD");
         },
         error: function() {
            console.log("error");
            $("#addr-balance-refresh").prop("disabled", false);
         }
      });
   } else if (!USD && usdBalance) {
      USD = true;
      $("#addr-balance").html("Balance: $" + usdBalance.toLocaleString(undefined, {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      }) + " USD");
   } else if (!USD && !usdBalance) {
      USD = true;
      $("#addr-balance").html("Balance: $0.00 USD");
   } else if (USD) {
      USD = false;
      $("#addr-balance").html("Balance: " + toCustomFixed(balance) + " " + CURRENT_COIN);
   }
}

function copyPrivateKey() {
   Swal.fire({
      icon: "info",
      inputValue: "No",
      title: "Copy Private Key?",
      text: "This operation will copy your private key to the clipboard. " +
         "Your private key is very important and anyone who has it will be able to spend from your account. " +
         "You should never share your private key with anyone. " +
         "Type 'Yes' with capital 'Y' to copy your private key to the clipboard.",
      input: "text",
      confirmButtonText: "Copy",
      showCancelButton: true,
   }).then((result) => {
      if (result.isConfirmed) {
         if (result.value == 'Yes') {
            try {
               if (PARAMS[CURRENT_COIN].isERC20) {
                  Clipboard.copy(keyPair.d.toBuffer(32).toString('hex'));
               } else {
                  Clipboard.copy(keyPair.toWIF());
               }

               alertSuccess(
                  "Copied!",
                  "Your private key was successfully copied to the clipboard."
               );

               setTimeout(_setTooltip, 200, "Copied!", ".privkey");
               setTimeout(_hideTooltip, 200, ".privkey");
            } catch (e) {
               setTimeout(_setTooltip, 200, "Failed!", ".privkey");
               setTimeout(_hideTooltip, 200, ".privkey");
            }
         } else {
            alertError(
               "Copy failed!",
               "Something went wrong."
            );
         }
      }
   });
}

var isDepositing = false;
var isWithdrawing = false;
var isHiking = false;
var isCutting = false;

function rsvs(rval) {
   isDepositing = false;
   isWithdrawing = false;
   isHiking = false;
   isCutting = false;

   switch (rval) {
      case 'R':
         $("#addr-spend").hide();
         $("#addr-receive").show();
         break;
      case 'S':
         $("#submit").html("SEND");
         $("#addr-spend").show();
         $("#addr-receive").hide();
         $("#address").val("");
         $("#address").removeAttr("disabled");
         $("#camera").removeAttr("disabled");

         $("#amount").val("");
         $("#amount").removeAttr("disabled");
         $("#sweep").removeAttr("disabled");
         break;
      case 'D':
         isDepositing = true;
         $("#submit").html("DEPOSIT");
         $("#addr-spend").show();
         $("#addr-receive").hide();
         $("#address").val('NON-CUSTODIAL SWIFTCASH BANK 🏦');
         $("#address").attr("disabled", "disabled");
         $("#camera").attr("disabled", "disabled");

         $("#amount").val("");
         $("#amount").removeAttr("disabled");
         $("#sweep").removeAttr("disabled");
         break;
      case 'W':
         isWithdrawing = true;
         $("#submit").html("WITHDRAW");
         $("#addr-spend").show();
         $("#addr-receive").hide();
         $("#address").val('NON-CUSTODIAL SWIFTCASH BANK 🏦');
         $("#address").attr("disabled", "disabled");
         $("#camera").attr("disabled", "disabled");

         $("#amount").val("");
         $("#amount").removeAttr("disabled");
         $("#sweep").removeAttr("disabled");
         break;
      case 'H':
         isHiking = true;
         $("#submit").html("RATE HIKE");
         $("#addr-spend").show();
         $("#addr-receive").hide();
         $("#address").val('Your Power: 0.00%');
         updateAdjustmentPower();

         $("#address").attr("disabled", "disabled");
         $("#camera").attr("disabled", "disabled");

         $("#amount").val("0.00");
         $("#amount").attr("disabled", "disabled");
         $("#sweep").attr("disabled", "disabled");
         break;
      case 'C':
         isCutting = true;
         $("#submit").html("RATE CUT");
         $("#addr-spend").show();
         $("#addr-receive").hide();
         $("#address").val('Your Power: 0.00%');
         updateAdjustmentPower();

         $("#address").attr("disabled", "disabled");
         $("#camera").attr("disabled", "disabled");

         $("#amount").val("0.00");
         $("#amount").attr("disabled", "disabled");
         $("#sweep").attr("disabled", "disabled");
         break;
   }
}

var tx;

function spendUTXO() {
   var amount = Number($("#amount").val());
   var FEE = PARAMS[CURRENT_COIN].txFee;

   if (balance < FEE || SWIFT(amount + FEE) > balance) {
      alertError("Insufficient funds!", "Minimum network fee is " + SWIFT(FEE) + " " + CURRENT_COIN + ".");
      return;
   }

   var address = $("#address").val();

   try {
      PARAMS[CURRENT_COIN].coinjs.address.toOutputScript(address, PARAMS[CURRENT_COIN].network);
   } catch (e) {
      alertError("Invalid address!", "Please enter a valid " + CURRENT_COIN + " address.");
      return;
   }

   $('#address').prop("disabled", true);
   $('#amount').prop("disabled", true);
   $('#submit').prop("disabled", true);
   $('#ajax-loader').show();

   tx = new PARAMS[CURRENT_COIN].coinjs.TransactionBuilder(PARAMS[CURRENT_COIN].network);

   for (i in utxos) {
      tx.addInput(
         utxos[i][PARAMS[CURRENT_COIN].unspentTxid],
         utxos[i][PARAMS[CURRENT_COIN].unspentOutput]
      );
   }

   tx.addOutput(address, Math.ceil(amount * 100000000));

   var change = SWIFT(balance - amount - FEE);

   if (change > 0) {
      tx.addOutput(changeAddress, Math.ceil(change * 100000000));
   }

   for (i = 0; i < utxos.length; i++) {
      tx.sign(i, keyPair);
   }

   $.ajax({
      url: PARAMS[CURRENT_COIN].sendApi,
      type: "POST",
      dataType: "json",
      data: PARAMS[CURRENT_COIN].sendTxHex + "=" + tx.build().toHex(),

      success: function(result) {
         var T1 = PARAMS[CURRENT_COIN].sendTxid1;
         var T2 = PARAMS[CURRENT_COIN].sendTxid2;
         var txid = '';

         if (T1 && T2 && result && result[T1])
            txid = result[T1][T2];
         else if (T1 && result)
            txid = result[T1];

         if (txid && (typeof txid === 'string' || txid instanceof String)) {
            USD = false;
            usdBalance = false;

            if (change > 0 && changeAddress == address) {
               var p1 = PARAMS[CURRENT_COIN].unspentTxid;
               var p2 = PARAMS[CURRENT_COIN].unspentOutput;
               var p3 = PARAMS[CURRENT_COIN].unspentValue;

               utxos = [{
                  [p1]: txid,
                  [p2]: 1,
                  [p3]: change * PARAMS[CURRENT_COIN].unspentDivision
               }];

               balance = change;
            } else {
               utxos = [];
               balance = 0;
            }

            $('#addr-balance').html("Balance: " + toCustomFixed(balance) + " " + CURRENT_COIN);

            alertSuccess(
               CURRENT_COIN + " sent!",
               "Transaction was broadcasted successfully.",
               txid
            );
         } else {
            console.log(result);
            alertError("Broadcast failed!", "Check the console for more details!");
         }

         $('#address').prop("disabled", false).val("");
         $('#amount').prop("disabled", false).val("");
         $('#submit').prop("disabled", false);
         $('#ajax-loader').hide();
      },

      error: function(error) {
         $('#address').prop("disabled", false).val("");
         $('#amount').prop("disabled", false).val("");
         $('#submit').prop("disabled", false);
         $('#ajax-loader').hide();

         console.log(error);
         alertError(
            "Something went wrong!",
            error.reason || error.message
         );
      }
   });
}

function spendERC20() {
   var amount = $("#amount").val();
   var address = $("#address").val();

   // Validate the address
   if (!ethers.isAddress(address)) {
      alertError("Invalid address!", "Please enter a valid " + CURRENT_COIN + " address.");
      return;
   }

   var tokenAmount;

   try {
      tokenAmount = ethers.parseUnits(
         amount,
         PARAMS[CURRENT_COIN].decimals
      );
   } catch (e) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   if (tokenAmount <= 0n) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   if (tokenAmount > balance) {
      alertError(
         "Insufficient " + CURRENT_COIN + " balance!",
         "You do not have enough " + CURRENT_COIN + " to complete this transaction."
      );
      return;
   }

   // Disable the elements in the form
   $('#address').prop("disabled", true);
   $('#amount').prop("disabled", true);
   $('#submit').prop("disabled", true);
   $('#ajax-loader').show();

   var provider = new ethers.JsonRpcProvider(
      PARAMS[CURRENT_COIN].rpc,
      PARAMS[CURRENT_COIN].chainId
   );

   var signer = wallet;

   if (!METAMASK_MODE) {
      signer = signer.connect(provider);
   }

   var contract = new ethers.Contract(
      PARAMS[CURRENT_COIN].contract,
      ["function transfer(address, uint256) returns (bool)"],
      signer
   );

   contract.transfer(address, tokenAmount)
      .then(function(tx) {

         return tx.wait().then(function() {

            USD = false;
            usdBalance = false;

            balance = balance - tokenAmount;

            refresh();

            alertSuccess(
               CURRENT_COIN + " sent!",
               "Transaction was broadcasted successfully.",
               tx.hash
            );

            $('#address').prop("disabled", false).val("");
            $('#amount').prop("disabled", false).val("");
            $('#submit').prop("disabled", false);
            $('#ajax-loader').hide();
         });

      })
      .catch(function(error) {
         console.log(error);

         $('#address').prop("disabled", false);
         $('#amount').prop("disabled", false);
         $('#submit').prop("disabled", false);
         $('#ajax-loader').hide();

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Something went wrong!",
               getCustomErrorMessage(error)
            );
         }
      });
}

function deposit() {
   var amount = $("#amount").val();

   var tokenAmount;

   try {
      tokenAmount = ethers.parseUnits(
         amount,
         PARAMS.SWIFT.decimals
      );
   } catch (e) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   if (tokenAmount <= 0n) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   if (tokenAmount > balance) {
      alertError(
         "Insufficient SWIFT balance!",
         "You do not have enough SWIFT to make this deposit."
      );
      return;
   }

   $('#amount').prop("disabled", true);
   $('#submit').prop("disabled", true);
   $('#ajax-loader').show();

   var contract = getSwiftContract(wallet);

   contract.deposit(tokenAmount)
      .then(function(tx) {

         return tx.wait().then(function() {

            USD = false;
            usdBalance = false;

            // Update wallet balance
            balance = balance - tokenAmount;
            
            refresh();

            alertSuccess(
               "SWIFT sent!",
               "Transaction was broadcasted successfully.",
               tx.hash
            );

            $('#amount')
               .prop("disabled", false)
               .val("");

            $('#submit').prop("disabled", false);
            $('#ajax-loader').hide();
         });
      })
      .catch(function(error) {
         console.log(error);

         $('#amount').prop("disabled", false);
         $('#submit').prop("disabled", false);
         $('#ajax-loader').hide();

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Deposit failed!",
               getCustomErrorMessage(error)
            );
         }
      });
}

function withdraw() {
   var amount = $("#amount").val();

   var tokenAmount;

   try {
      tokenAmount = ethers.parseUnits(
         amount,
         PARAMS.SWIFT.decimals
      );
   } catch (e) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   if (tokenAmount <= 0n) {
      alertError("Invalid amount!", "Please enter a valid " + CURRENT_COIN + " amount.");
      return;
   }

   var totalBalance = stakedBalance + accruedInterest;

   if (tokenAmount > totalBalance) {
      alertError(
         "Insufficient staked balance!",
         "You do not have enough SWIFT staked to make this withdrawal."
      );
      return;
   }

   $('#amount').prop("disabled", true);
   $('#submit').prop("disabled", true);
   $('#ajax-loader').show();

   var contract = getSwiftContract(wallet);

   var withdrawal;

   if (tokenAmount === totalBalance) {
      withdrawal = contract.withdrawAll();
   } else {
      withdrawal = contract.withdraw(tokenAmount);
   }

   withdrawal
      .then(function(tx) {

         return tx.wait().then(function() {

            USD = false;
            usdBalance = false;

            refresh();

            alertSuccess(
               "SWIFT sent!",
               "Transaction was broadcasted successfully.",
               tx.hash
            );

            $('#amount')
               .prop("disabled", false)
               .val("");

            $('#submit').prop("disabled", false);
            $('#ajax-loader').hide();
         });
      })
      .catch(function(error) {
         console.log(error);

         $('#amount').prop("disabled", false);
         $('#submit').prop("disabled", false);
         $('#ajax-loader').hide();

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Withdrawal failed!",
               getCustomErrorMessage(error)
            );
         }
      });
}

async function mintInterest() {

   const result = await Swal.fire({
      icon: "info",
      title: "Mint Interest!",
      text: "Accrued interest is automatically minted with every deposit and withdrawal. " +
         "Are you sure you want to continue?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
   });

   if (!result.isConfirmed) {
      return;
   }

   $('#submit').prop("disabled", true);
   $('#mint-interest').prop("disabled", true);
   $('#ajax-loader').show();

   var contract = getSwiftContract(wallet);

   contract.mintInterest()
      .then(function(tx) {

         return tx.wait().then(function() {

            USD = false;
            usdBalance = false;

            // Add accrued interest to Treasury balance
            stakedBalance = stakedBalance + accruedInterest;

            // Interest has now been minted
            accruedInterest = 0n;

            var stakeText =
               "Staked: " +
               toCustomFixed(stakedBalance) +
               " SWIFT";

            $("#addr-stakedbalance").html(stakeText);

            alertSuccess(
               "Minted!",
               "New interest was successfully minted.", 
               tx.hash
            );

            $('#submit').prop("disabled", false);
            $('#mint-interest').prop("disabled", false);
            $('#ajax-loader').hide();
         });
      })
      .catch(function(error) {
         console.log(error);

         $('#submit').prop("disabled", false);
         $('#mint-interest').prop("disabled", false);
         $('#ajax-loader').hide();

         if (error.code === "INSUFFICIENT_FUNDS") {
            handleInsufficientFundsError();
         } else {
            alertError(
               "Minting interest failed!",
               getCustomErrorMessage(error)
            );
         }
      });
}

function updateAdjustmentPower() {

   var contract = getSwiftContract();

   contract.adjustmentPowerOf(address)
      .then(function(power) {

         var powerPercent = ethers.formatUnits(power, 25);

         if (powerPercent > 0) $("#address").val(
            "Your Power: " +
            powerPercent +
            "%"
         );
      })
      .catch(function(error) {
         console.log(error);
      });
}

function adjustInterest(action) {

   var contract = getSwiftContract(wallet);

   if (stakedBalance == 0) {
      var title =
         action === "hike" ?
         "Rate hike failed!" :
         "Rate cut failed!";

      alertError(
         title,
         "To be able to " + action + " the interest rate, you need to make a deposit first."
      );
      return;
   }

   contract.canAdjustInterestRate(address)
      .then(function(eligible) {

         var title =
            action === "hike" ?
            "Rate hike failed!" :
            "Rate cut failed!";

         if (!eligible) {
            alertError(
               title,
               "Interest rate can only be adjusted once per calendar month, " +
               "and you cannot adjust it after making a deposit or withdrawal during the current month."
            );
            return;
         }

         $('#submit').prop("disabled", true);
         $('#ajax-loader').show();

         var txPromise;

         if (action === "hike") {
            txPromise = contract.hikeInterest();
         } else if (action === "cut") {
            txPromise = contract.cutInterest();
         } else {
            $('#submit').prop("disabled", false);
            $('#ajax-loader').hide();

            alertError(
               "Invalid interest adjustment!"
            );
            return;
         }

         txPromise
            .then(function(tx) {

               return tx.wait().then(function() {

                  USD = false;
                  usdBalance = false;

                  var title =
                     action === "hike" ?
                     "Hiked!" :
                     "Cut!";

                  var title =
                     action === "hike" ?
                     "Hiked!" :
                     "Cut!";

                  var message =
                     action === "hike" ?
                     "Rate hike completed successfully." :
                     "Rate cut completed successfully.";

                  alertSuccess(title, message, tx.hash);
                  refreshAPR();

                  $('#submit').prop("disabled", false);
                  $('#ajax-loader').hide();
               });
            })
            .catch(function(error) {

               console.log(error);

               $('#submit').prop("disabled", false);
               $('#ajax-loader').hide();

               if (error.code === "INSUFFICIENT_FUNDS") {
                  handleInsufficientFundsError();
               } else {
                  var title =
                     action === "hike" ?
                     "Rate hike failed!" :
                     "Rate cut failed!";
                  alertError(
                     title,
                     getCustomErrorMessage(error)
                  );
               }
            });
      })
      .catch(function(error) {

         console.log(error);

         alertError(
            "Something went wrong!",
            error.reason || error.message
         );
      });
}

function submitAction() {
   if (isDepositing) {
      deposit();
   } else if (isWithdrawing) {
      withdraw();
   } else if (isHiking) {
      adjustInterest("hike");
   } else if (isCutting) {
      adjustInterest("cut");
   } else if (PARAMS[CURRENT_COIN].isERC20) {
      spendERC20();
   } else {
      spendUTXO();
   }
}

function enableSendForm() {
   $('#address').prop("disabled", false).val("");
   $('#amount').prop("disabled", false).val("");
   $('#submit').prop("disabled", false).html("SEND");
}

function SWIFT(a) {
   return Number(a.toFixed(8));
}

function copyWholeBalance() {
   if (CURRENT_COIN === 'SWIFT' && isWithdrawing) {
      const total = BigInt(stakedBalance) + BigInt(accruedInterest);

      if (total < 0n) return;

      $('#amount').val(
         ethers.formatUnits(
            total,
            PARAMS[CURRENT_COIN].decimals
         )
      );
      return;
   }

   if (PARAMS[CURRENT_COIN].isERC20) {
      $('#amount').val(
         ethers.formatUnits(
            balance,
            PARAMS[CURRENT_COIN].decimals
         )
      );
      return;
   }

   var FEE = PARAMS[CURRENT_COIN].txFee;

   if (balance - FEE > 0) {
      $('#amount').val(SWIFT(balance - FEE));
   }
}

jQuery(document).ready(function() {
   // Warning - Terms of Use
   if (Cookies.get('termsAccepted') == null) {
      swal.fire({
         icon: "info",
         title: "Non-Custodial Wallet",
         customClass: {title: "tou-swal-title"},
         html:
               "- Private keys never leave the browser <br/>" +
               "- Your email can be fictitious <br/>" +
               "- First login acts as registration <br/>" +
               "- Back up your email and password <br/>" +
               "- Back up your private keys <br/><br/>" +
               "If you lose your email plus your password, without a backup of your private keys, your account cannot be recovered!" +
            "<br/><br/><span style='font-weight:bold; letter-spacing:2px;'>BE YOUR OWN BANK</span>",
         confirmButtonText: "Agree",
         showCancelButton: true
      }).then((result) => {
         if (result.isConfirmed) {
            Cookies.set('termsAccepted', '1', { expires: 30 });
         } else {
            window.location = "about:blank";
         }
      });
   }

    // Private key login
    $('#privlogintoggle').click(function() {
       if ($('#metamasktoggle').hasClass('active')) $('#metamasktoggle').click();
       if ($('#watchonlytoggle').hasClass('active')) $('#watchonlytoggle').click();

       var state = $('#privlogintoggle').attr('aria-pressed');
       if (state == "false") {
          $('#email').val("");
          $('#password').val("");
          $('#email').prop("disabled", true);
          $('#email').prop("placeholder", "");
          $('#password').prop("disabled", false);
          $('#password').prop("placeholder", "Private Key");
          $('#btnPasswordQR').show();
          $('#btnPasswordEye').hide();
          $('#signin').text("LOGIN🔐");
          $('.pwstrength_viewport_errors').hide();
          $('.pwstrength_viewport_progress').hide();
       } else {
          $('#email').prop("disabled", false);
          $('#email').prop("placeholder", "Email");
          $('#password').prop("disabled", false);
          $('#password').prop("placeholder", "Password");
          $('#btnPasswordQR').hide();
          $('#btnPasswordEye').show();
          $('#btnPasswordEye').prop("disabled", false);
          $('#signin').text("LOGIN🔏");
          $('.pwstrength_viewport_errors').show();
          $('.pwstrength_viewport_progress').show();
       }
    });

    // Metamask connect
    $('#metamasktoggle').click(function() {
       if ($('#privlogintoggle').hasClass('active')) $('#privlogintoggle').click();
       if ($('#watchonlytoggle').hasClass('active')) $('#watchonlytoggle').click();

       var state = $('#metamasktoggle').attr('aria-pressed');
       if (state == "false") {
          $('#email').val("");
          $('#password').val("");
          $('#email').prop("disabled", true);
          $('#email').prop("placeholder", "");
          $('#password').prop("disabled", true);
          $('#password').prop("placeholder", "");
          $('#btnPasswordQR').hide();
          $('#btnPasswordEye').show();
          $('#btnPasswordEye').prop("disabled", true);
          $('#signin').text("CONNECT🦊");
          $('.pwstrength_viewport_errors').hide();
          $('.pwstrength_viewport_progress').hide();
       } else {
          $('#email').prop("disabled", false);
          $('#email').prop("placeholder", "Email");
          $('#password').prop("disabled", false);
          $('#password').prop("placeholder", "Password");
          $('#btnPasswordQR').hide();
          $('#btnPasswordEye').show();
          $('#btnPasswordEye').prop("disabled", false);
          $('#signin').text("LOGIN🔏");
          $('.pwstrength_viewport_errors').show();
          $('.pwstrength_viewport_progress').show();
       }
    });

    // Watch-only login
    $('#watchonlytoggle').click(function() {
       if ($('#privlogintoggle').hasClass('active')) $('#privlogintoggle').click();
       if ($('#metamasktoggle').hasClass('active')) $('#metamasktoggle').click();

       var state = $('#watchonlytoggle').attr('aria-pressed');
       if (state == "false") {
          $('#email').val("");
          $('#email').prop("disabled", true);
          $('#password').val("");
          $('#password').prop("placeholder", "Address");
          $('#password').prop('type', 'text');
          $('#email').prop("placeholder", "");
          $('#password').prop("disabled", false);
          $('#btnPasswordQR').prop('disabled', false);
          $('#btnPasswordQR').show();
          $('#btnPasswordEye').hide();
          $('#signin').text("WATCH🕵️");
          $('.pwstrength_viewport_errors').hide();
          $('.pwstrength_viewport_progress').hide();
       } else {
          $('#email').prop("disabled", false);
          $('#email').prop("placeholder", "Email");
          $('#email').prop('type', 'email');
          $('#password').prop("placeholder", "Password");
          $('#password').prop("disabled", false);
          $('#password').prop('type', 'password');
          $('#btnPasswordQR').hide();
          $('#btnPasswordEye').show();
          $('#signin').text("LOGIN🔏");
          $('.pwstrength_viewport_errors').show();
          $('.pwstrength_viewport_progress').show();
       }
    });

   // Copying to clipboard - Tooltip
   $('.clipboard').tooltip({
      trigger: 'click',
      placement: 'bottom'
   });

   function setTooltip(message) {
      $('.clipboard')
         .attr('data-original-title', message)
         .tooltip('show');
   }

   function hideTooltip() {
      setTimeout(function() {
         $('.clipboard').tooltip('hide');
      }, 1000);
   }

   // Clipboard
   var clipboard = new ClipboardJS('.clipboard');

   clipboard.on('success', function(e) {
      setTooltip('Copied!');
      hideTooltip();
   });

   clipboard.on('error', function(e) {
      setTooltip('Failed!');
      hideTooltip();
   });

   "use strict";
   var options = {};
   options.ui = {
      container: "#pwd-container",
      showVerdictsInsideProgressBar: true,
      viewports: {
         progress: ".pwstrength_viewport_progress",
         errors: ".pwstrength_viewport_errors"
      }
   };
   options.common = {
      debug: false,
      onLoad: function() {
         $('#messages').text('Start typing password');
      }
   };
   $(':password').pwstrength(options);
});

(function(jQuery) {
   // Source: src/rules.js
   var rulesEngine = {};

   try {
      if (!jQuery && module && module.exports) {
         var jQuery = require("jquery"),
            jsdom = require("jsdom").jsdom;
         jQuery = jQuery(jsdom().parentWindow);
      }
   } catch (ignore) {}

   (function($, rulesEngine) {
      "use strict";
      var validation = {};

      rulesEngine.forbiddenSequences = [
         "0123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl",
         "zxcvbnm", "!@#$%^&*()_+"
      ];

      validation.wordNotEmail = function(options, word, score) {
         if (word.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)) {
            return score;
         }
         return 0;
      };

      validation.wordLength = function(options, word, score) {
         var wordlen = word.length,
            lenScore = Math.pow(wordlen, options.rules.raisePower);
         if (wordlen < options.common.minChar) {
            lenScore = (lenScore + score);
         }
         return lenScore;
      };

      validation.wordSimilarToUsername = function(options, word, score) {
         var username = $(options.common.usernameField).val();
         if (username && word.toLowerCase().match(username.toLowerCase())) {
            return score;
         }
         return 0;
      };

      validation.wordTwoCharacterClasses = function(options, word, score) {
         if (word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
            (word.match(/([a-zA-Z])/) && word.match(/([0-9])/)) ||
            (word.match(/(.[!,@,#,$,%,\^,&,*,?,_,~])/) && word.match(/[a-zA-Z0-9_]/))) {
            return score;
         }
         return 0;
      };

      validation.wordRepetitions = function(options, word, score) {
         if (word.match(/(.)\1\1/)) {
            return score;
         }
         return 0;
      };

      validation.wordSequences = function(options, word, score) {
         var found = false,
            j;
         if (word.length > 2) {
            $.each(rulesEngine.forbiddenSequences, function(idx, seq) {
               var sequences = [seq, seq.split('').reverse().join('')];
               $.each(sequences, function(idx, sequence) {
                  for (j = 0; j < (word.length - 2); j += 1) { // iterate the word trough a sliding window of size 3:
                     if (sequence.indexOf(word.toLowerCase().substring(j, j + 3)) > -1) {
                        found = true;
                     }
                  }
               });
            });
            if (found) {
               return score;
            }
         }
         return 0;
      };

      validation.wordLowercase = function(options, word, score) {
         return word.match(/[a-z]/) && score;
      };

      validation.wordUppercase = function(options, word, score) {
         return word.match(/[A-Z]/) && score;
      };

      validation.wordOneNumber = function(options, word, score) {
         return word.match(/\d+/) && score;
      };

      validation.wordThreeNumbers = function(options, word, score) {
         return word.match(/(.*[0-9].*[0-9].*[0-9])/) && score;
      };

      validation.wordOneSpecialChar = function(options, word, score) {
         return word.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/) && score;
      };

      validation.wordTwoSpecialChar = function(options, word, score) {
         return word.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && score;
      };

      validation.wordUpperLowerCombo = function(options, word, score) {
         return word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && score;
      };

      validation.wordLetterNumberCombo = function(options, word, score) {
         return word.match(/([a-zA-Z])/) && word.match(/([0-9])/) && score;
      };

      validation.wordLetterNumberCharCombo = function(options, word, score) {
         return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
      };

      rulesEngine.validation = validation;

      rulesEngine.executeRules = function(options, word) {
         var totalScore = 0;

         $.each(options.rules.activated, function(rule, active) {
            if (active) {
               var score = options.rules.scores[rule],
                  funct = rulesEngine.validation[rule],
                  result,
                  errorMessage;

               if (!$.isFunction(funct)) {
                  funct = options.rules.extra[rule];
               }

               if ($.isFunction(funct)) {
                  result = funct(options, word, score);
                  if (result) {
                     totalScore += result;
                  }
                  if (result < 0 || (!$.isNumeric(result) && !result)) {
                     errorMessage = options.ui.spanError(options, rule);
                     if (errorMessage.length > 0) {
                        options.instances.errors.push(errorMessage);
                     }
                  }
               }
            }
         });

         return totalScore;
      };
   }(jQuery, rulesEngine));

   try {
      if (module && module.exports) {
         module.exports = rulesEngine;
      }
   } catch (ignore) {}

   // Source: src/options.js
   var defaultOptions = {};

   defaultOptions.common = {};
   defaultOptions.common.minChar = 6;
   defaultOptions.common.usernameField = "#username";
   defaultOptions.common.userInputs = [
      // Selectors for input fields with user input
   ];
   defaultOptions.common.onLoad = undefined;
   defaultOptions.common.onKeyUp = undefined;
   defaultOptions.common.zxcvbn = false;
   defaultOptions.common.debug = false;

   defaultOptions.rules = {};
   defaultOptions.rules.extra = {};
   defaultOptions.rules.scores = {
      wordNotEmail: -100,
      wordLength: -50,
      wordSimilarToUsername: -100,
      wordSequences: -50,
      wordTwoCharacterClasses: 2,
      wordRepetitions: -25,
      wordLowercase: 1,
      wordUppercase: 3,
      wordOneNumber: 3,
      wordThreeNumbers: 5,
      wordOneSpecialChar: 3,
      wordTwoSpecialChar: 5,
      wordUpperLowerCombo: 2,
      wordLetterNumberCombo: 2,
      wordLetterNumberCharCombo: 2
   };
   defaultOptions.rules.activated = {
      wordNotEmail: true,
      wordLength: true,
      wordSimilarToUsername: true,
      wordSequences: false,
      wordTwoCharacterClasses: false,
      wordRepetitions: false,
      wordLowercase: true,
      wordUppercase: true,
      wordOneNumber: true,
      wordThreeNumbers: true,
      wordOneSpecialChar: true,
      wordTwoSpecialChar: true,
      wordUpperLowerCombo: true,
      wordLetterNumberCombo: true,
      wordLetterNumberCharCombo: true
   };
   defaultOptions.rules.raisePower = 1.4;

   defaultOptions.ui = {};
   defaultOptions.ui.bootstrap2 = false;
   defaultOptions.ui.showProgressBar = true;
   defaultOptions.ui.showPopover = false;
   defaultOptions.ui.showStatus = false;
   defaultOptions.ui.spanError = function(options, key) {
      "use strict";
      var text = options.ui.errorMessages[key];
      if (!text) {
         return '';
      }
      return '<span style="color: #c14c4c">' + text + '</span>';
   };
   defaultOptions.ui.popoverError = function(errors) {
      "use strict";
      var message = "<div>Errors:<ul class='error-list' style='margin-bottom: 0;'>";

      jQuery.each(errors, function(idx, err) {
         message += "<li>" + err + "</li>";
      });
      message += "</ul></div>";
      return message;
   };
   defaultOptions.ui.errorMessages = {
      wordLength: "Your password is too short",
      wordNotEmail: "Do not use your email as your password",
      wordSimilarToUsername: "Your password cannot contain your username",
      wordTwoCharacterClasses: "Use different character classes",
      wordRepetitions: "Too many repetitions",
      wordSequences: "Your password contains sequences"
   };
   defaultOptions.ui.verdicts = ["Weak", "Normal", "Medium", "Strong", "Very Strong"];
   defaultOptions.ui.showVerdicts = true;
   defaultOptions.ui.showVerdictsInsideProgressBar = false;
   defaultOptions.ui.showErrors = true;
   defaultOptions.ui.container = undefined;
   defaultOptions.ui.viewports = {
      progress: undefined,
      verdict: undefined,
      errors: undefined
   };
   defaultOptions.ui.scores = [14, 26, 38, 50];

   // Source: src/ui.js
   var ui = {};

   (function($, ui) {
      "use strict";

      var barClasses = ["danger", "warning", "success"],
         statusClasses = ["error", "warning", "success"];

      ui.getContainer = function(options, $el) {
         var $container;

         $container = $(options.ui.container);
         if (!($container && $container.length === 1)) {
            $container = $el.parent();
         }
         return $container;
      };

      ui.findElement = function($container, viewport, cssSelector) {
         if (viewport) {
            return $container.find(viewport).find(cssSelector);
         }
         return $container.find(cssSelector);
      };

      ui.getUIElements = function(options, $el) {
         var $container, result;

         if (options.instances.viewports) {
            return options.instances.viewports;
         }

         $container = ui.getContainer(options, $el);

         result = {};
         result.$progressbar = ui.findElement($container, options.ui.viewports.progress, "div.progress");
         if (options.ui.showVerdictsInsideProgressBar) {
            result.$verdict = result.$progressbar.find("span.password-verdict");
         }

         if (!options.ui.showPopover) {
            if (!options.ui.showVerdictsInsideProgressBar) {
               result.$verdict = ui.findElement($container, options.ui.viewports.verdict, "span.password-verdict");
            }
            result.$errors = ui.findElement($container, options.ui.viewports.errors, "ul.error-list");
         }

         options.instances.viewports = result;
         return result;
      };

      ui.initProgressBar = function(options, $el) {
         var $container = ui.getContainer(options, $el),
            progressbar = "<div class='progress'><div class='";

         if (!options.ui.bootstrap2) {
            progressbar += "progress-";
         }
         progressbar += "bar'>";
         if (options.ui.showVerdictsInsideProgressBar) {
            progressbar += "<span class='password-verdict'></span>";
         }
         progressbar += "</div></div>";

         if (options.ui.viewports.progress) {
            $container.find(options.ui.viewports.progress).append(progressbar);
         } else {
            $(progressbar).insertAfter($el);
         }
      };

      ui.initHelper = function(options, $el, html, viewport) {
         var $container = ui.getContainer(options, $el);
         if (viewport) {
            $container.find(viewport).append(html);
         } else {
            $(html).insertAfter($el);
         }
      };

      ui.initVerdict = function(options, $el) {
         ui.initHelper(options, $el, "<span class='password-verdict'></span>",
            options.ui.viewports.verdict);
      };

      ui.initErrorList = function(options, $el) {
         ui.initHelper(options, $el, "<ul class='error-list'></ul>",
            options.ui.viewports.errors);
      };

      ui.initPopover = function(options, $el) {
         $el.popover("destroy");
         $el.popover({
            html: true,
            placement: "bottom",
            trigger: "manual",
            content: " "
         });
      };

      ui.initUI = function(options, $el) {
         if (options.ui.showPopover) {
            ui.initPopover(options, $el);
         } else {
            if (options.ui.showErrors) {
               ui.initErrorList(options, $el);
            }
            if (options.ui.showVerdicts && !options.ui.showVerdictsInsideProgressBar) {
               ui.initVerdict(options, $el);
            }
         }
         if (options.ui.showProgressBar) {
            ui.initProgressBar(options, $el);
         }
      };

      ui.possibleProgressBarClasses = ["danger", "warning", "success"];

      ui.updateProgressBar = function(options, $el, cssClass, percentage) {
         var $progressbar = ui.getUIElements(options, $el).$progressbar,
            $bar = $progressbar.find(".progress-bar"),
            cssPrefix = "progress-";

         if (options.ui.bootstrap2) {
            $bar = $progressbar.find(".bar");
            cssPrefix = "";
         }

         $.each(ui.possibleProgressBarClasses, function(idx, value) {
            $bar.removeClass(cssPrefix + "bar-" + value);
         });
         $bar.addClass(cssPrefix + "bar-" + barClasses[cssClass]);
         $bar.css("width", percentage + '%');
      };

      ui.updateVerdict = function(options, $el, text) {
         var $verdict = ui.getUIElements(options, $el).$verdict;
         $verdict.text(text);
      };

      ui.updateErrors = function(options, $el) {
         var $errors = ui.getUIElements(options, $el).$errors,
            html = "";
         $.each(options.instances.errors, function(idx, err) {
            html += "<li>" + err + "</li>";
         });
         $errors.html(html);
      };

      ui.updatePopover = function(options, $el, verdictText) {
         var popover = $el.data("bs.popover"),
            html = "",
            hide = true;

         if (options.ui.showVerdicts &&
            !options.ui.showVerdictsInsideProgressBar &&
            verdictText.length > 0) {
            html = "<h5><span class='password-verdict'>" + verdictText +
               "</span></h5>";
            hide = false;
         }
         if (options.ui.showErrors) {
            if (options.instances.errors.length > 0) {
               hide = false;
            }
            html += options.ui.popoverError(options.instances.errors);
         }

         if (hide) {
            $el.popover("hide");
            return;
         }

         if (options.ui.bootstrap2) {
            popover = $el.data("popover");
         }

         if (popover.$arrow && popover.$arrow.parents("body").length > 0) {
            $el.find("+ .popover .popover-content").html(html);
         } else {
            // It's hidden
            popover.options.content = html;
            $el.popover("show");
         }
      };

      ui.updateFieldStatus = function(options, $el, cssClass) {
         var targetClass = options.ui.bootstrap2 ? ".control-group" : ".form-group",
            $container = $el.parents(targetClass).first();

         $.each(statusClasses, function(idx, css) {
            if (!options.ui.bootstrap2) {
               css = "has-" + css;
            }
            $container.removeClass(css);
         });

         cssClass = statusClasses[cssClass];
         if (!options.ui.bootstrap2) {
            cssClass = "has-" + cssClass;
         }
         $container.addClass(cssClass);
      };

      ui.percentage = function(score, maximun) {
         var result = Math.floor(100 * score / maximun);
         result = result < 0 ? 0 : result;
         result = result > 100 ? 100 : result;
         return result;
      };

      ui.getVerdictAndCssClass = function(options, score) {
         var cssClass, verdictText, level;

         if (score <= 0) {
            cssClass = 0;
            level = -1;
            verdictText = options.ui.verdicts[0];
         } else if (score < options.ui.scores[0]) {
            cssClass = 0;
            level = 0;
            verdictText = options.ui.verdicts[0];
         } else if (score < options.ui.scores[1]) {
            cssClass = 0;
            level = 1;
            verdictText = options.ui.verdicts[1];
         } else if (score < options.ui.scores[2]) {
            cssClass = 1;
            level = 2;
            verdictText = options.ui.verdicts[2];
         } else if (score < options.ui.scores[3]) {
            cssClass = 1;
            level = 3;
            verdictText = options.ui.verdicts[3];
         } else {
            cssClass = 2;
            level = 4;
            verdictText = options.ui.verdicts[4];
         }

         return [verdictText, cssClass, level];
      };

      ui.updateUI = function(options, $el, score) {
         var cssClass, barPercentage, verdictText;

         cssClass = ui.getVerdictAndCssClass(options, score);
         verdictText = cssClass[0];
         cssClass = cssClass[1];

         if (options.ui.showProgressBar) {
            barPercentage = ui.percentage(score, options.ui.scores[3]);
            ui.updateProgressBar(options, $el, cssClass, barPercentage);
            if (options.ui.showVerdictsInsideProgressBar) {
               ui.updateVerdict(options, $el, verdictText);
            }
         }

         if (options.ui.showStatus) {
            ui.updateFieldStatus(options, $el, cssClass);
         }

         if (options.ui.showPopover) {
            ui.updatePopover(options, $el, verdictText);
         } else {
            if (options.ui.showVerdicts && !options.ui.showVerdictsInsideProgressBar) {
               ui.updateVerdict(options, $el, verdictText);
            }
            if (options.ui.showErrors) {
               ui.updateErrors(options, $el);
            }
         }
      };
   }(jQuery, ui));

   // Source: src/methods.js
   var methods = {};

   (function($, methods) {
      "use strict";
      var onKeyUp, applyToAll;

      onKeyUp = function(event) {
         var $el = $(event.target),
            options = $el.data("pwstrength-bootstrap"),
            word = $el.val(),
            userInputs,
            verdictText,
            verdictLevel,
            score;

         if (options === undefined) {
            return;
         }

         options.instances.errors = [];
         if (options.common.zxcvbn) {
            userInputs = [];
            $.each(options.common.userInputs, function(idx, selector) {
               userInputs.push($(selector).val());
            });
            userInputs.push($(options.common.usernameField).val());
            score = zxcvbn(word, userInputs).entropy;
         } else {
            score = rulesEngine.executeRules(options, word);
         }
         ui.updateUI(options, $el, score);
         verdictText = ui.getVerdictAndCssClass(options, score);
         verdictLevel = verdictText[2];
         verdictText = verdictText[0];

         if (options.common.debug) {
            console.log(score + ' - ' + verdictText);
         }

         if ($.isFunction(options.common.onKeyUp)) {
            options.common.onKeyUp(event, {
               score: score,
               verdictText: verdictText,
               verdictLevel: verdictLevel
            });
         }
      };

      methods.init = function(settings) {
         this.each(function(idx, el) {
            // Make it deep extend (first param) so it extends too the
            // rules and other inside objects
            var clonedDefaults = $.extend(true, {}, defaultOptions),
               localOptions = $.extend(true, clonedDefaults, settings),
               $el = $(el);

            localOptions.instances = {};
            $el.data("pwstrength-bootstrap", localOptions);
            $el.on("keyup", onKeyUp);
            $el.on("change", onKeyUp);
            $el.on("onpaste", onKeyUp);

            ui.initUI(localOptions, $el);
            if ($.trim($el.val())) { // Not empty, calculate the strength
               $el.trigger("keyup");
            }

            if ($.isFunction(localOptions.common.onLoad)) {
               localOptions.common.onLoad();
            }
         });

         return this;
      };

      methods.destroy = function() {
         this.each(function(idx, el) {
            var $el = $(el),
               options = $el.data("pwstrength-bootstrap"),
               elements = ui.getUIElements(options, $el);
            elements.$progressbar.remove();
            elements.$verdict.remove();
            elements.$errors.remove();
            $el.removeData("pwstrength-bootstrap");
         });
      };

      methods.forceUpdate = function() {
         this.each(function(idx, el) {
            var event = {
               target: el
            };
            onKeyUp(event);
         });
      };

      methods.addRule = function(name, method, score, active) {
         this.each(function(idx, el) {
            var options = $(el).data("pwstrength-bootstrap");

            options.rules.activated[name] = active;
            options.rules.scores[name] = score;
            options.rules.extra[name] = method;
         });
      };

      applyToAll = function(rule, prop, value) {
         this.each(function(idx, el) {
            $(el).data("pwstrength-bootstrap").rules[prop][rule] = value;
         });
      };

      methods.changeScore = function(rule, score) {
         applyToAll.call(this, rule, "scores", score);
      };

      methods.ruleActive = function(rule, active) {
         applyToAll.call(this, rule, "activated", active);
      };

      $.fn.pwstrength = function(method) {
         var result;

         if (methods[method]) {
            result = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
         } else if (typeof method === "object" || !method) {
            result = methods.init.apply(this, arguments);
         } else {
            $.error("Method " + method + " does not exist on jQuery.pwstrength-bootstrap");
         }

         return result;
      };
   }(jQuery, methods));
}(jQuery));

// Animated background

$(document).ready(function() {
(() => {
    const canvas = document.getElementById("binary-bg");
    const ctx = canvas.getContext("2d");
    const panel = document.getElementById("form-panel");

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    let width, height, digits = [];
    let lastFrame = 0;

    const FPS = 30;
    const FRAME_TIME = 1000 / FPS;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        createDigits();
    }

    function getProtectedArea() {
        const r = panel.getBoundingClientRect();
        const margin = 5;

        return {
            left: r.left - margin,
            right: r.right + margin,
            top: r.top - margin,
            bottom: r.bottom + margin
        };
    }

    function insidePanel(x, y, area) {
        return x > area.left &&
               x < area.right &&
               y > area.top &&
               y < area.bottom;
    }

    function createDigits() {
        digits = [];

        if (reducedMotion.matches) return;

        const area = getProtectedArea();
        const count = Math.min(300, Math.max(100, width / 10));

        let attempts = 0;

        while (digits.length < count && attempts < count * 15) {
            attempts++;

            const x = Math.random() * width;
            const y = Math.random() * height;

            // Avoid creating digits over the form.
            if (insidePanel(x, y, area)) continue;

            digits.push({
                x,
                y,
                value: Math.random() < 0.5 ? "0" : "1",
                size: 11 + Math.random() * 7,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: -(0.1 + Math.random() * 0.3),
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    function animate(timestamp) {
        requestAnimationFrame(animate);

        if (timestamp - lastFrame < FRAME_TIME) return;

        lastFrame = timestamp;

        ctx.clearRect(0, 0, width, height);

        if (reducedMotion.matches) return;

        const area = getProtectedArea();

        for (const d of digits) {
            d.x += d.speedX;
            d.y += d.speedY;

            // Recycle digits after they leave the screen.
            if (d.y < -25) {
                d.y = height + 20;
                d.x = Math.random() * width;
            }

            if (d.x < -20) d.x = width + 20;
            if (d.x > width + 20) d.x = -20;

            // Never draw inside the form's protected area.
            if (insidePanel(d.x, d.y, area)) continue;

            // Smoothly fade each digit in and out.
            const wave =
                (Math.sin(timestamp * 0.0007 + d.phase) + 1) / 2;

            const opacity = 0.08 + wave * 0.28;

            ctx.font =
                `${d.size}px monospace`;

            ctx.fillStyle =
                `rgba(75, 190, 245, ${opacity})`;

            ctx.fillText(d.value, d.x, d.y);
        }
    }

    window.addEventListener("resize", resize, { passive: true });

    reducedMotion.addEventListener?.("change", createDigits);

    resize();
    requestAnimationFrame(animate);
})();    
});

