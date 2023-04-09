// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 20;
    uint256 public constant PRICE_ONE_NFT = 0.001 ether;
    string public baseURI = "ipfs://QmQgvFUpwgz97pPRAf3BrytH5Z1XwyWbagJCVWKpesM42K/";
    mapping(uint256 => bool) public minted;

    constructor() ERC721("Shape NFT", "SHAPE") {
    }

    event Minted(address indexed user, uint256 tokenId);

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(minted[tokenId], "Token not minted yet");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    function changeBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function mint(address to) public payable {
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");
        require(msg.value == PRICE_ONE_NFT, "Invalid payment amount");
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        minted[tokenId] = true;
        emit Minted(to, tokenId);
    }
}