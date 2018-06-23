pragma solidity ^0.4.18;

contract FitbitChallenges {

  /*
  * Enums
  */

    enum ChallengeStatus { CREATED, ACCEPTED, FULFILLED, CANCELLED }

    Challenge[] public fitbitChallenges;

    mapping(uint=>Fulfillment[]) fulfillments;

    /* challenges are created by individuals, 
    accepted and validated by company */

   
    struct Challenge {
        address employee;
        address company; /* TARGET ADDRESS */
        uint deadline;
        string charityCause;
        uint data; /* change this to fitbit unit */
        ChallengeStatus status;
        uint amount; //in our token
    }


    struct Fulfillment { 
        /* should interface with company */
        bool accepted;
        address fulfiller;  /*company address */
        string data; /* keep this integer */
    }


    function poseChallenge( 
        /* self-posing */
        address _companyaddress,
        string _cause,
        uint _data,
        uint64 _deadline,
        returns(uint)
    )
    {
        fitbitChallenges.push(Challenge(msg.sender,_companyaddress, _deadline, _cause,  _data, ChallengeStatus.CREATED, msg.value));
        return fitbitChallenges.length - 1;
    }
}
