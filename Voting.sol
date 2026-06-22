//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting{
    struct Candidate{
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;

    constructor(){
        candidates.push(
            Candidate("Alice", 0)
        );

        candidates.push(
            Candidate("Bob", 0)
        );

        candidates.push(
            Candidate("Charlie", 0)
        );
    }

    function vote(uint256 candidateId) public{

        require(candidateId < candidates.length, "Invalid Candidate");
        require(!hasVoted[msg.sender], "Already Voted");

        candidates[candidateId].voteCount++;

        hasVoted[msg.sender] = true;
    }

    function getCandidateCount() public view returns(uint256){
        return candidates.length;
    }
}