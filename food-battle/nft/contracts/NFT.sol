// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FoodBattle is ERC721Enumerable, Ownable {
    uint public constant MAX_SUPPLY = 10_000;
    string public baseURI = "ipfs://Qma8yzH8ayv7guT7f9kDeT62dtok7Q6yYKVkMhtJxhXTit/";
    mapping(uint256 => bool) public minted;

    uint private _tokenIdCounter;

    constructor() ERC721("Food Battle", "FBTL") {
        _tokenIdCounter = 0;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(minted[tokenId], "Token not minted yet");
        return bytes(baseURI).length > 0 ? baseURI : "";
    }

    function changeBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function mint(uint numTokens) public onlyOwner {
        require(totalSupply() + numTokens <= MAX_SUPPLY, "Max supply exceeded");

        for (uint i = 0; i < numTokens; i++) {
            _safeMint(msg.sender, _tokenIdCounter);
            _tokenIdCounter++;
            minted[_tokenIdCounter] = true;
        }
    }
}
