// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./opensea/ERC721Tradable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CryptoTapeRecordings is ERC721Tradable, VRFConsumerBase {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    enum Status { Deployed, GivenProvenanceHash, GivenStartingIndex, MintingCompleted, MetadataFrozen }

    uint16 public constant maxSupply = 10000;

    uint8 public constant reservedLast = 69;

    Status public status;

    string public provenanceHash;

    uint16 public startingIndex;

    function currentStatus() public view returns (Status) {
        if (bytes(tokenIPFSMetadataURI).length != 0) {
            return Status.MetadataFrozen;
        }

        if (totalSupply() >= maxSupply) {
            return Status.MintingCompleted;
        }

        if (startingIndex != 0) {
            return Status.GivenStartingIndex;
        }

        if (bytes(provenanceHash).length != 0) {
            return Status.GivenProvenanceHash;
        }
        
        return Status.Deployed;
    }

    address internal constant ctrSigner = 0x934eAa5AaB2cdEa7Db6E2396525D7E3Cb8A05Ed9;

    uint256 internal constant linkFee = 2 * 10 ** 18;

    bytes32 internal constant keyHash = 0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445;
    
    string internal constant contractMetadataURI = "ipfs://QmPz3qiu31CYL5Lvp64vUAszp98Ubu4RWjBPxtnpRtx1zv";
    
    string internal constant tokenAPIMetadataURI = "https://metadata.cryptotaperecordings.com/";
    
    string internal tokenIPFSMetadataURI;

    constructor()
        ERC721Tradable("Crypto Tape Recordings", "CTR", 0xa5409ec958C83C3f309868babACA7c86DCB077c1) // Proxy Registry Address
        VRFConsumerBase(
            0xf0d54349aDdcf704F77AE15b96510dEA15cb7952, // VRF Coordinator
            0x514910771AF9Ca656af840dff83E8264EcF986CA  // LINK Token
        )
    {}

    function baseTokenURI() override public view returns (string memory) {
        if (status == Status.MetadataFrozen) {
            return tokenIPFSMetadataURI;
        }

        return tokenAPIMetadataURI;
    }

    function contractURI() public pure returns (string memory) {
        return contractMetadataURI;
    }

    function setProvenanceHash(string memory _provenanceHash) public onlyOwner {
        require(status == Status.Deployed);

        provenanceHash = _provenanceHash;
    }

    function requestStartingIndex() public onlyOwner returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= linkFee);

        return requestRandomness(keyHash, linkFee);
    }

    function fulfillRandomness(bytes32, uint256 randomness) internal override {
        require(status == Status.GivenProvenanceHash);
        
        startingIndex = uint16(randomness.mod(maxSupply - reservedLast).add(1));
    }

    function testIncreaseTokenId(uint8 n) public onlyOwner {
        for (uint8 i = 0; i < n; i++)
            _nextTokenId.increment();
    }

    function mint(bytes memory ctrSignature) public {
        require(status == Status.GivenStartingIndex);

        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, balanceOf(msg.sender)));

        address recoveredSigner = ECDSA.recover(
            messageHash,
            ctrSignature
        );

        require(recoveredSigner == ctrSigner);

        uint256 currentTokenId = _nextTokenId.current();

        _nextTokenId.increment();

        _safeMint(msg.sender, currentTokenId);
    }

    function freezeMetadata(string memory _tokenIPFSMetadataURI) public onlyOwner {
        require(status == Status.MintingCompleted);

        tokenIPFSMetadataURI = _tokenIPFSMetadataURI;
    }
}