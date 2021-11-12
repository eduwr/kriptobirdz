const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KBMarket", () => {
  it("Should mint and trade NFTs", async () => {
    const Market = await ethers.getContractFactory("KBMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("ADDRESS", marketAddress);

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;
    console.log("NFT ADDRESS", nftContractAddress);

    // test to receive listing price and auction price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    console.log("List price", listingPrice);

    const auctionPrice = ethers.utils.parseUnits("100", "ether");
    console.log("auction price", auctionPrice);
    // test for minting
    await nft.mintToken("https-t1");
    await nft.mintToken("https-t2");

    console.log("TOkens minted");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });

    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });
    console.log("TOkens items created");

    // test for different accounts
    const [_, buyerAddress] = await ethers.getSigners();

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, {
      value: auctionPrice,
    });
    console.log("marketsale created ");
    const items = await market.fetchMarketTokens();

    // test out all items
    console.log("Items ", items);
  });
});
