pragma solidity ^0.4.18;

contract FitbitChallenges {

  /*
  * Enums
  */
  enum ChallengeStatus { CREATED, ACCEPTED, FULFILLED, CANCELLED }

  Challenge[] public fitbitChallenges;

  /* challenges are created by individuals,
  accepted and validated by company */


  struct Challenge {
    address employee;
    address company; /* TARGET ADDRESS */
    uint deadline;
    string charityCause;
    uint data; /* change this to fitbit unit */
    ChallengeStatus status;
    uint amount;
  }


  function poseChallenge(
    address _companyaddress,
    string _cause,
    uint _data,
    uint64 _deadline,
    uint _amount
  ) public
  returns(uint)
  {
    fitbitChallenges.push(Challenge(msg.sender, _companyaddress, _deadline, _cause, _data, ChallengeStatus.CREATED, _amount));
    return fitbitChallenges.length - 1;
  }

  function acceptChallenge(
    uint _challengeId
  )public payable
  {
     require(_challengeId < fitbitChallenges.length);
     require(msg.value == fitbitChallenges[_challengeId].amount);
     require(fitbitChallenges[_challengeId].status == ChallengeStatus.CREATED);
    // Only the company can accept the challenge
     require(msg.sender == fitbitChallenges[_challengeId].company);
    fitbitChallenges[_challengeId].status = ChallengeStatus.ACCEPTED;
  }

  function rejectChallenge(
    uint _challengeId
  )
  public
  {
    fitbitChallenges[_challengeId].status =  ChallengeStatus.CANCELLED;
  }

  function fulfillChallenge(
    uint _challengeId,
    uint _data /** fitbit data will trigger this function*/
  )
  public
  {
    require(_challengeId < fitbitChallenges.length);
    // Make sure that only the company can mark a challenge as having been completed
    require(msg.sender == fitbitChallenges[_challengeId].company);
    // require( fitbitChallenges[_challengeId].status == ChallengeStatus.ACCEPTED);
    require( _data >= fitbitChallenges[_challengeId].data);
    fitbitChallenges[_challengeId].company.transfer(fitbitChallenges[_challengeId].amount);
    fitbitChallenges[_challengeId].status = ChallengeStatus.FULFILLED;
  }

}
