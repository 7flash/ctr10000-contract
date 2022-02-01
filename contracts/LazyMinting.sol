// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

interface ICTR10000 {
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function mint(bytes memory ctrSignature) external;

    function totalSupply() external view returns (uint256);
}

contract LazyMintCTR {
    mapping (uint256 => address) public creatorOf;

    ICTR10000 public ctrToken;

    uint256 public creatorReward;

    constructor(address _ctrToken, uint256 _creatorReward) {
        ctrToken = ICTR10000(_ctrToken);
        creatorReward = _creatorReward;
    }

    function mintAndPurchase(
        address sponsor,
        address creator,
        bytes memory ctrSignature
    ) public payable returns (uint256 tokenId) {
        require(sponsor == msg.sender);

        require(msg.value >= creatorReward);

        tokenId = ctrToken.totalSupply() + 1;

        ctrToken.mint(ctrSignature);

        ctrToken.transferFrom(
            address(this),
            sponsor,
            tokenId
        );

        payable(creator).transfer(msg.value);

        creatorOf[tokenId] = creator;
    }
}