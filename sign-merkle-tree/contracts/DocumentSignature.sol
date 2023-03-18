//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./IERC721.sol";

contract DocumentSignature {
    address public immutable token;
    bytes32 public immutable merkleRoot;

    mapping(address => bool) public claimed;
    mapping(address => bool) public signatures;
    
    event ProposalSigned(address indexed signer);

    event Claim(address indexed claimer);

    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function sign(bytes32[] calldata merkleProof) external {
        require(
            canSign(msg.sender, merkleProof),
            "DocumentSignature: Address is not a candidate for sign&claim"
        );
        require(!signatures[msg.sender], "Signer already signed");

        signatures[msg.sender] = true;

        claimed[msg.sender] = true;

        IERC721(token).safeMint(msg.sender);

        emit ProposalSigned(msg.sender);
        emit Claim(msg.sender);
    }

    function canSign(address claimer, bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        return
            !claimed[claimer] &&
            MerkleProof.verify(
                merkleProof,
                merkleRoot,
                keccak256(abi.encodePacked(claimer))
            );
    }
}