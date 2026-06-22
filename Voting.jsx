import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { VotingABI } from "./abi/VotingABI";

function Voting() {

    const [candidates, setCandidates] = useState([]);

    const votingAddress =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const loadCandidates = async () => {

        const provider =
            new ethers.BrowserProvider(
                window.ethereum
            );

        const contract =
            new ethers.Contract(
                votingAddress,
                VotingABI,
                provider
            );

        const count =
            await contract.getCandidateCount();

        const candidateArray = [];

        for (let i = 0; i < Number(count); i++) {

            const candidate =
                await contract.candidates(i);

            candidateArray.push({
                name: candidate.name,
                voteCount:
                    candidate.voteCount.toString()
            });
        }

        setCandidates(candidateArray);
    };

    const vote = async (candidateId) => {

        const provider =
            new ethers.BrowserProvider(
                window.ethereum
            );

        const signer =
            await provider.getSigner();

        const contract =
            new ethers.Contract(
                votingAddress,
                VotingABI,
                signer
            );

        const tx =
            await contract.vote(candidateId);

        await tx.wait();

        await loadCandidates();

        alert("Vote Casted!");
    };

    useEffect(() => {
        loadCandidates();
    }, []);

    return (
        <div>

            <h2>Voting DApp</h2>

            {candidates.map(
                (candidate, index) => (

                    <div key={index}>

                        <h3>
                            {candidate.name}
                        </h3>

                        <p>
                            Votes:
                            {" "}
                            {candidate.voteCount}
                        </p>

                        <button
                            onClick={() =>
                                vote(index)
                            }
                        >
                            Vote
                        </button>

                    </div>
                )
            )}

        </div>
    );
}

export default Voting;