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
        uint64 _deadline    
    )
    returns(uint)
    {
        fitbitChallenges.push(Challenge(msg.sender,_companyaddress, _deadline, _cause,  _data, ChallengeStatus.CREATED, msg.value));
        return fitbitChallenges.length - 1;
    }

    function acceptChallenge(
        uint _challengeId
    )
    {
        fitbitChallenges[_challengeId].status =  ChallengeStatus.ACCEPTED;

    }

    function rejectChallenge(
        uint _challengeId
    )
    {
        fitbitChallenges[_challengeId].status =  ChallengeStatus.CANCELLED;
    }

    function fulfillChallenge(
        uint _challengeId,
        uint _data /** fitbit data will trigger this function*/
    )
    {
        require( fitbitChallenges[_challengeId].status == ChallengeStatus.ACCEPTED);
        require( _data > fitbitChallenges[_challengeId].data);
        fitbitChallenges[_challengeId].company.transfer(fitbitChallenges[_challengeId].amount);
        
        /** TRANSFER TOKENS HERE */


        fitbitChallenges[_challengeId].status =  ChallengeStatus.FULFILLED;

    }

}
