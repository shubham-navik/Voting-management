const Election = require('../models/election');
const Candidate = require('../models/candidate');
const Party = require('../models/party')
const Contestant = require('../models/contestant');

//get all Elections
exports.getElections = async (req, res) => {
    try {
        const totalElection = await Election.find({});
        const elections = [];

        for (const election of totalElection) {
            const electionId = election.electionId;
            const title = election.title;
            const startDate = election.startDate;
            const endDate = election.endDate;
            const status = election.status;
            const contestants = election.contestants;
            const description = election.description;
            const electionData = [];
            for (const contestant of contestants) {
                const tempContestant = await Contestant.findById(contestant);
                if (tempContestant) {
                    const votes = tempContestant.votes;
                    const candidateId = tempContestant.candidate
                    const candidate = await Candidate.findById(candidateId);
                    if (candidate) {
                        electionData.push({
                            // candidateId: candidate._id,
                            candidateName: candidate.name,
                            votes
                        })
                    }

                }
            }

            elections.push({
                electionId,
                title,
                startDate,
                endDate,
                status,
                description,
                electionData,

            })

        }
        res.status(200).json({
            status: 'successfull fetched All Elections',
            msg:"All elections",
            elections
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'error to fetched All elections',
            message: err.message
        })
    }
}

// get past election

exports.pastElection = async (req, res) => {
    try {
        const totalElection = await Election.find({});
        const elections = [];

        for (const election of totalElection) {
            const electionId = election.electionId;
            const title = election.title;
            const startDate = election.startDate;
            const endDate = election.endDate;
            const status = election.status;
            const contestants = election.contestants;
            const description = election.description;
            const electionData = [];
            for (const contestant of contestants) {
                const tempContestant = await Contestant.findById(contestant);
                if (tempContestant) {
                    const votes = tempContestant.votes;
                    const candidateId = tempContestant.candidate
                    const candidate = await Candidate.findById(candidateId);
                    if (candidate) {
                        electionData.push({
                            // candidateId: candidate._id,
                            candidateName: candidate.name,
                            votes
                        })
                    }

                }
            }
            if(status==='completed')
            elections.push({
                electionId,
                title,
                startDate,
                endDate,
                status,
                description,
                electionData,

            })

        }
        res.status(200).json({
            status: 'successfull fetched All Elections',
            msg:"All elections",
            elections
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in getting past elections",
        })
    }
}

//onging election

exports.ongoingElection = async (req, res) => {
    try {
        const totalElection = await Election.find({});
        const elections = [];

        for (const election of totalElection) {
            const electionId = election.electionId;
            const title = election.title;
            const startDate = election.startDate;
            const endDate = election.endDate;
            const status = election.status;
            const contestants = election.contestants;
            const description = election.description;
            const electionData = [];
            for (const contestant of contestants) {
                const tempContestant = await Contestant.findById(contestant);
                if (tempContestant) {
                    const votes = tempContestant.votes;
                    const candidateId = tempContestant.candidate
                    const candidate = await Candidate.findById(candidateId);
                    if (candidate) {
                        electionData.push({
                            // candidateId: candidate._id,
                            candidateId,
                            electionId,
                            candidateName: candidate.name,
                            votes
                        })
                    }

                }
            }
            if (status === 'ongoing')
                elections.push({
                    electionId,
                    title,
                    startDate,
                    endDate,
                    status,
                    description,
                    electionData,

                })

        }
        res.status(200).json({
            status: 'successfull fetched All Elections',
            msg:"All elections",
            elections
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in fetching onging elections"
        })
    }
}

//to get upcomming election
exports.upcomingElection = async (req, res) => {
    try {
        const totalElection = await Election.find({});
        const elections = [];

        for (const election of totalElection) {
            const electionId = election.electionId;
            const title = election.title;
            const startDate = election.startDate;
            const endDate = election.endDate;
            const status = election.status;
            const contestants = election.contestants;
            const description = election.description;
            const electionData = [];
            for (const contestant of contestants) {
                const tempContestant = await Contestant.findById(contestant);
                if (tempContestant) {
                    const votes = tempContestant.votes;
                    const candidateId = tempContestant.candidate
                    const candidate = await Candidate.findById(candidateId);
                    if (candidate) {
                        electionData.push({
                            // candidateId: candidate._id,
                            candidateName: candidate.name,
                            party: candidate.party,
                        })
                    }

                }
            }
            if (status === 'upcoming')
                elections.push({
                    electionId,
                    title,
                    startDate,
                    endDate,
                    status,
                    description,
                    electionData,

                })

        }
        res.status(200).json({
            status: 'successfull fetched All Elections',
            msg:"All elections",
            elections
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in fetching upcoming elections"
        })
    }
}

// to get candidate
exports.getAllCandidate = async (req, res) => {
    try {
      const candidates = await Candidate.find({}).populate('party');
  
      const allCandidates = candidates.map(candidate => {
        const party = candidate.party;
        const partyName = party ? party.name : "Unknown";
        const partyId = party ? party._id : null;
  
        return {
          _id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          party: {
            name: partyName,
            id: partyId,
          },
          participatedElections: candidate.participatedElections.length
        };
      });
  
      res.status(200).json({
        msg: "All Candidates",
        allCandidates
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Error getting Candidates"
      });
    }
  };
  
// get All Parties
exports.getAllParty = async (req, res) => {
    try {
        const allParties = await Party.find({})
        res.status(200).json({
            msg: "All Paries",
            allParties
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg:"err while fetching all party"
        })
    }
}

//get Election result by id

exports.getElectionResultById = async (req, res) => {
    try {
        const electionId = req.params.id;
        if (!electionId) {
            return res.status(400).json({
                msg: "election id required"
            })
        }
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({
                msg:"election not found"
            })
        }

        const contestants = election.contestants;
        const results = [];
        for (const contestant of contestants) {
            const tempcontest = await Contestant.findById(contestant);
            const candidate = await Candidate.findById(tempcontest.candidate)
            if (!candidate) {
                return res.status(404).json({
                    msg:"contestant not found"
                })
            }
            const partyId = await Party.findById(candidate.party);
            if (!partyId) {
                return res.status(404).json({
                    msg:"party not found"
                })
            }
            const candidateName = candidate.name;
            const partyName = partyId.name;
            const votes = tempcontest.votes;
            const result = {
                candidateName,
                partyName,
                votes
            };
            results.push(result);

        }


        return res.status(200).json({
            msg: "Election results",
            electionName:election.title,
            results
        })

          
    }
    catch (err) {
        console.log(err)
    }
}
exports.getCandidateProfile = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const candidate = await Candidate.findById(candidateId).populate('party');

        if (!candidate) {
            return res.status(404).json({ msg: "Candidate Not Found" });
        }

        const candidateName = candidate.name;
        const candidateEmail = candidate.email;
        const candidateParty = candidate.party ? candidate.party.name : "Independent";

        const participatedElections = [];

        for (const electionId of candidate.participatedElections) {
            const election = await Election.findById(electionId);
            if (!election) continue;

            const contestants = election.contestants;
            const results = [];

            for (const contestantId of contestants) {
                const tempContestant = await Contestant.findById(contestantId);
                if (tempContestant) {
                    results.push({
                        candidateId: tempContestant.candidate.toString(),
                        votes: tempContestant.votes
                    });
                }
            }

            results.sort((a, b) => b.votes - a.votes); // Descending

            let rank = results.length;
            for (let i = 0; i < results.length; i++) {
                if (results[i].candidateId === candidateId) {
                    rank = i + 1;
                    break;
                }
            }

            const participatedYear = new Date(election.startDate).getFullYear();

            participatedElections.push({
                electionId:election.electionId,
                electionTitle: election.title,
                electionId: election._id,
                participatedYear,
                status: election.status,
                totalContestants: results.length,
                rank
            });
        }

        return res.status(200).json({
            msg: "Candidate Profile",
            profile: {
                name: candidateName,
                email: candidateEmail,
                party: candidateParty,
                totalParticipatedElections: participatedElections.length,
                participatedElections
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error in fetching candidate profile" });
    }
};


exports.getElectionDetails = async (req, res) => {
    try {
        const electionId = req.params.id;
        const election = await Election.findById(electionId).populate("contestants");

        if (!election) {
            return res.status(404).json({ msg: "Election Not Found" });
        }

        const contestantsData = [];

        // Fetch all contestants and their associated candidate info
        for (const contestantId of election.contestants) {
            const contestant = await Contestant.findById(contestantId).populate("candidate");
            if (contestant && contestant.candidate) {
                contestantsData.push({
                    contestantId: contestant._id,
                    candidateId: contestant.candidate._id,
                    candidateName: contestant.candidate.name,
                    email: contestant.candidate.email,
                    party: contestant.candidate.party || "Independent",
                    votes: contestant.votes
                });
            }
        }

        // Sort by votes to determine rank
        contestantsData.sort((a, b) => b.votes - a.votes);

        // Assign ranks
        contestantsData.forEach((contestant, index) => {
            contestant.rank = index + 1;
        });

        const participatedYear = new Date(election.startDate).getFullYear();

        return res.status(200).json({
            msg: "Election Details",
            election: {
                electionId: election._id,
                title: election.title,
                startDate: election.startDate,
                endDate: election.endDate,
                status: election.status,
                participatedYear,
                totalContestants: contestantsData.length,
                contestants: contestantsData
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error in fetching election details" });
    }
};
