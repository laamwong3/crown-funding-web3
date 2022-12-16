// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract CrownFunding {
    event CreatedCampign(
        uint256 id,
        address indexed creator,
        uint256 targetAmount,
        uint256 deadline,
        string campignDetails
    );
    struct Campign {
        // it will store the uri about the details of compaign
        string campignDetails;
        address creator;
        uint256 targetFund;
        uint256 amountCollected;
        uint256 deadline;
        bool isFundClaimed;
    }

    uint256 public constant MAX_CAMPIGN_TIME = 15 minutes;
    uint256 public campignId;
    mapping(uint256 => Campign) public campigns;
    // each donator can donate mulitple campigns
    mapping(uint256 => mapping(address => uint256)) public donatedAmount;

    modifier onlyCreator(uint256 _campignId) {
        require(campigns[_campignId].creator == msg.sender, "Not creator");
        _;
    }

    function createCampign(
        uint256 _targetFund,
        uint256 _deadline,
        string memory _campignDetails
    ) external {
        require(
            _deadline <= block.timestamp + MAX_CAMPIGN_TIME,
            "Campign time too short"
        );
        uint256 currentCampignId = campignId++;

        campigns[currentCampignId] = Campign({
            campignDetails: _campignDetails,
            creator: msg.sender,
            targetFund: _targetFund,
            amountCollected: 0,
            deadline: _deadline,
            isFundClaimed: false
        });

        emit CreatedCampign(
            currentCampignId,
            msg.sender,
            _targetFund,
            _deadline,
            _campignDetails
        );
    }

    function deleteCampign() external {}

    function donate() external {}

    function revokeDonate() external {}

    function withdrawDonation() external {}
}
