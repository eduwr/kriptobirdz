// SPDX-Licence-Identifier:MIT
pragma solidity ^0.8.4;

// openzeppelin ERC721 NFT functionality
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';


contract NFT is ERC721URIStorage {
  //Counters allow us to keep track of tokenIds
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // address of NFT marketplace to interact withs
  address contractAddress;


  // OBJ: give the NFT market the ability to transact with tokens or change ownership
  // setAprovalForAll allow us to do that with contract address

  // constructor setup our address
  constructor(address marketplaceAddress) ERC721('KryptoBirdz','BIRDZ') {
      contractAddress = marketplaceAddress;
  }

  function mintToken(string memory tokenURI) public returns(uint) {
    _tokenIds.increment();
    uint newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    // Set the token URI id and Url
    _setTokenURI(newItemId, tokenURI);
    // give the marketplace approval to transact between users;
    setApprovalForAll(contractAddress, true);
    // mint the token and set it for sale = return the id to do so
    return newItemId;
  }
}
